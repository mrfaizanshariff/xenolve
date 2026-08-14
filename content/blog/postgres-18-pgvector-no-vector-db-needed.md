---
title: "Postgres 18 + pgvector: Why Most 2026 AI Products Don't Need a Vector Database"
description: "Postgres 18 landed with quantization, HNSW indexing improvements, and better parallel query. Combined with pgvector 0.9, it's now a real production vector store for most AI workloads. Here's the honest 'when Postgres wins' analysis — and where you still want a dedicated vector DB."
date: "2026-08-08"
coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=2000"
tags: ["Postgres", "pgvector", "Vector Database", "AI Infrastructure", "RAG"]
author:
  name: "Faizan Shariff"
  picture: "/assets/authors/faizan.jpg"
---

# The contrarian pick that quietly became the default

Two years ago, "you need a specialized vector database" was received wisdom. Every AI startup pitch mentioned Pinecone, Weaviate, or Qdrant. Every architecture diagram had a separate box for the vector store.

In 2026, that's not the assumption anymore. Postgres 18 + pgvector 0.9 quietly became good enough for the majority of production AI workloads. Startups that used to reach for a specialized vector DB by default now start with pgvector — and most of them stay there.

We've deployed both. We've migrated in both directions. This is the honest analysis of when pgvector wins, when it doesn't, and why the "specialized vector DB by default" era is over.

## What changed in Postgres 18

Three specific improvements made this year's release land differently from previous ones.

**Better parallel query planning.** Vector similarity search benefits enormously from parallelism. Postgres 18's query planner is meaningfully better at partitioning vector operations across cores.

**Scalar quantization support in HNSW.** pgvector 0.9 with Postgres 18 supports quantized indexes that use 4-8x less memory for the same recall. This changes the ceiling — where pgvector's memory ceiling used to bind at 5-10 million vectors, it now comfortably serves 20-40 million with careful tuning.

**Improved logical replication for large vectors.** For teams running read replicas, vector data now replicates efficiently rather than saturating replication bandwidth.

Combined with the broader ecosystem — better connection pooling, better observability, better ORMs — Postgres 18 is a serious vector store, not a compromise.

## When pgvector wins

The case for pgvector is strongest in these scenarios.

### Scenario 1 — You already have Postgres

Your app already runs on Postgres. Your team knows how to back it up, migrate schemas, monitor query performance, and secure it. Adding pgvector adds an extension — not a new dependency, not a new failure domain, not a new operational learning curve.

The alternative (adding Pinecone or Qdrant) means:
- Managing a second data store with different semantics.
- Handling consistency between the two (your Postgres row and your vector).
- Extending your backup, monitoring, and access-control infrastructure to cover both.
- Explaining to your team why the vector store is a different kind of thing.

For teams already on Postgres, the "just use pgvector" default is usually the right one.

### Scenario 2 — Your vector count is under 20 million

pgvector with proper indexing handles up to roughly 20 million vectors on reasonable hardware (a $200-500/month cloud database). Above that number, dedicated vector databases start to have real performance advantages.

Most enterprise RAG workloads have well under 20M vectors. Most product catalogs, help centers, internal knowledge bases, and chat histories fit comfortably below this line. Only when you have massive corpora — millions of documents, or billions of chunks — does the ceiling become real.

### Scenario 3 — You need transactional consistency between vectors and other data

If a record in your Postgres has an embedding, and updating the record needs to update the embedding, doing that in one transaction against one database is dramatically simpler than distributed-writing to two systems.

For workloads where records are created, updated, and deleted frequently, keeping vectors in Postgres means never having to reason about consistency lag between the two systems. Every AI product with heavy CRUD-style operations benefits.

### Scenario 4 — You have strict data-residency or on-prem requirements

For our clients in KSA and UAE, self-hosted Postgres is table stakes. Every enterprise cloud region has it. Every private cloud can run it. Adding a specialized vector DB means finding one that also supports the same deployment topology, which narrows options significantly.

pgvector runs anywhere Postgres runs. That's a lot of anywhere.

### Scenario 5 — You want minimal operational surface

Every additional piece of infrastructure has real cost. Not just money — attention. When something breaks, more services mean more places to look. Fewer services means faster incident response.

For small teams (under 50 engineers), the operational simplicity of "one database" is worth substantial performance headroom on that database.

## When you still want a dedicated vector DB

Being honest: pgvector is not the right answer for every workload.

### When your vector count exceeds 50 million

At tens of millions of vectors, dedicated vector databases start to have real performance advantages. Query latency on pgvector at that scale requires very careful tuning. Dedicated systems (Qdrant, Milvus, Pinecone) handle it more gracefully.

### When you need hybrid search with a strong keyword component

Postgres's full-text search is capable but not best-in-class for BM25-heavy workloads. If your search really needs to rank keyword hits precisely alongside vector similarity, dedicated systems with tighter hybrid tuning win.

### When query latency requirements are extreme

For sub-50ms p95 vector queries at high volume, a purpose-built system tuned for that specific workload is likely faster. E-commerce search, autocomplete, real-time recommendation.

### When you have a specialized team that will operate it

If you have engineers who will invest in learning a dedicated vector DB's operational model, the ceiling is higher. If you don't, you're stuck at whatever performance you can extract without the specialized knowledge.

### When you need built-in features like reranking, filtering DSLs, or vector-specific ML

Some dedicated vector DBs bundle capabilities (reranking, learned indexes, hybrid ranking) that pgvector doesn't have. If those features are load-bearing for your product, buying them from a specialist is often cheaper than building them yourself.

## The migration paths

Real production teams often start with pgvector and move to a specialized system later. That's fine and usually the right sequence. What matters is not which system you started with; it's whether the migration path is manageable when you outgrow the first choice.

**pgvector → Qdrant.** Common migration. Qdrant supports similar HNSW-based indexing, and the API differences are manageable. Plan a couple of weeks for the migration itself, longer if you need to rework metadata schemas.

**pgvector → Pinecone.** Also common. Pinecone's managed simplicity is worth the switch if you're outgrowing pgvector and don't want to manage another self-hosted system.

**Specialized → pgvector.** Yes, this happens too. Teams that overbought a specialized DB early sometimes migrate back when they realize their scale doesn't justify it and the operational cost of the specialized system exceeded the value.

For a broader comparison, see our [vector database buyer's guide](/blog/vector-database-buyers-guide-2026).

## The pgvector tuning that actually matters

If you're going with pgvector, these are the specific configurations that separate "usable" from "excellent."

**Use HNSW, not IVFFlat, for most workloads.** HNSW has better recall-at-similar-latency for typical query patterns. IVFFlat is faster to build but has recall trade-offs.

**Tune `m` and `ef_construction`.** Default values are conservative. For most enterprise workloads, `m = 24, ef_construction = 100` is a better starting point than the defaults.

**Enable scalar quantization for large indexes.** With pgvector 0.9, you can quantize to `int8` (or lower) for a 4-8x memory reduction with minimal recall loss on 1024-dim embeddings.

**Set `ef_search` per query.** Higher values return better results at higher latency. For interactive queries, `ef_search = 40-80` is often the sweet spot.

**Configure `work_mem` and `maintenance_work_mem` appropriately.** Vector operations use meaningful memory. Undersized settings cause spills to disk.

**Consider `pg_bouncer` or similar pooling.** Vector queries can be expensive; connection pool exhaustion is a real failure mode without proper pooling.

**Monitor vector-specific metrics.** Regular query planner statistics don't catch pgvector-specific issues. Log slow vector queries and analyze them separately.

## The economic argument

For a typical mid-sized RAG workload — say, 2M vectors, 100K queries per day, 20K new documents per week — the rough monthly costs:

- **pgvector on a shared Postgres instance:** near zero marginal cost, or $100-300 additional if you need to size up.
- **pgvector on a dedicated Postgres for AI (still managed on your existing platform):** $300-600.
- **Managed Pinecone:** $600-1,500.
- **Managed Qdrant Cloud:** $250-450.
- **Self-hosted Qdrant on a small VPS:** $60-100 plus ops time.

pgvector is not always the cheapest — self-hosted Qdrant can beat it — but it's the cheapest option that adds zero operational surface for teams already on Postgres.

## Frequently asked questions

**How does pgvector compare to specialized vendors on speed?**
At small to medium scale (under 5M vectors), often within 20-30% of the best specialized systems. At larger scale, the gap widens. Specialized systems can be 3-10x faster at very large scale with high concurrency.

**What about vector search inside a JOIN?**
Postgres wins here decisively. If your query is "find similar documents that also belong to tenant X, are marked public, and were updated in the last 30 days," running that as one SQL query against pgvector is dramatically simpler than fanning out to a vector DB and joining results.

**Can pgvector do hybrid search?**
Yes, using pgvector's vector operators alongside Postgres full-text search. Not as tightly integrated as Weaviate's hybrid ranking, but functional for most workloads.

**What's the biggest downside of pgvector?**
Index build time at large scale. Rebuilding an HNSW index over tens of millions of vectors is a multi-hour operation. Plan around it, or use partial reindexing strategies.

**How does this interact with newer AI patterns like agentic retrieval?**
Directly. See our [RAG is dead post](/blog/rag-is-dead-what-replaced-it-2026) — the modern retrieval stack (hierarchical indexing, hybrid search, rerankers) works fine on pgvector for typical workloads. The techniques don't require a specialized vector DB.

## The strategic read

The "always use a specialized vector database" advice from 2023-2024 was right for the technology at that time. It's not right for the technology in 2026. pgvector matured. Postgres extensions matured. The operational simplicity story that Postgres has always had now extends to vector workloads for most teams.

If you're starting a new AI product in 2026, start with pgvector. Migrate later if your workload demands it. Most workloads never will.

At Xenolve we design AI infrastructure architectures for enterprise clients. If your team is deciding between pgvector and a specialized vector store for a specific workload, or you're paying for a vector DB you're not sure you need, [get in touch](/contact). This is often a place where the right architecture cuts monthly costs meaningfully.

The specialized-vector-DB era is not over. But its scope is smaller than the marketing suggests. Postgres deserves your default consideration.
