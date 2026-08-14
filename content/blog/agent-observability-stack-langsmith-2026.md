---
title: "The 2026 Agent Observability Stack: LangSmith, Langfuse, ReviewBench and the Layers You Actually Need"
description: "You can't debug what you can't see. The agent observability stack matured fast in 2026 — LangSmith, Langfuse, ReviewBench, Braintrust, Helicone, and self-hosted OpenTelemetry all serve different needs. Here's the honest engineering-side comparison and the layers a real production agent needs."
date: "2026-07-01"
coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
tags: ["Observability", "AI Agents", "LangSmith", "Langfuse", "Evals", "Monitoring"]
author:
  name: "Faizan Shariff"
  picture: "/assets/authors/faizan.jpg"
---

# The layer that separates working agents from breaking ones

Every production incident with an AI agent looks the same in the immediate aftermath. Someone reports that the agent did something weird. Engineering asks, "when did it happen?" Someone else asks, "what was the prompt?" A third person asks, "which model version was it running?" And if you haven't invested in observability, the answer to all three is a shrug.

In 2026, agent observability finally matured into a real category with real tools. LangSmith, Langfuse, ReviewBench, Braintrust, Helicone, and self-hosted OpenTelemetry stacks all exist. Each solves a different piece. And every serious production agent needs some combination.

This is the engineering-side comparison, plus the specific layers you actually need — not the vendor-pitch version.

## What "agent observability" actually covers

Traditional application observability is metrics, logs, and traces. AI agents need those plus:

- **Prompt and response logging** — the actual text sent and received.
- **Tool invocation tracing** — every tool the agent called, with inputs and outputs.
- **Multi-step run visualization** — the sequence of LLM calls, retrieval steps, and tool uses that make up one "user request."
- **Evaluation frameworks** — the ability to test the agent against known inputs and score outputs.
- **Cost tracking** — tokens per model per user per feature per anything you want to slice by.
- **Regression detection** — knowing when model or prompt changes silently degraded quality.
- **Human feedback loops** — capturing thumbs-up/thumbs-down or human review outcomes.

Missing any of these is missing a class of bugs you'll eventually hit.

## The vendors and what each does well

### LangSmith (LangChain)

**What it is.** The default observability layer for LangGraph and LangChain applications.

**Strengths.**

- Best-in-class trace visualization. Multi-step agent runs render as clear tree diagrams that stakeholders can read.
- Deep integration with LangGraph. If you're on LangGraph, it's the path of least resistance.
- Eval framework is mature. Datasets, evaluators, and scored runs are first-class citizens.
- Human feedback and annotation tooling for building eval sets from real traffic.

**Weaknesses.**

- LangChain-ecosystem gravity. Best when your app is LangGraph. Less compelling for teams on other frameworks.
- Pricing at high volume is real. Enterprise tier costs meaningful money.
- Not self-hostable in the free tier. Enterprise self-hosted exists but is a separate SKU.

**Best for.** Teams on LangGraph or LangChain. The default choice.

### Langfuse

**What it is.** Open-source, self-hostable observability platform for LLM applications.

**Strengths.**

- Self-hostable. Full-featured open-source version. Big deal for regulated workloads and data-residency-sensitive deployments.
- Framework-agnostic. Works with LangGraph, CrewAI, Deep Agents, or raw LLM SDK calls.
- Prompt management is first-class — versioning, A/B testing, deploy prompts as artifacts.
- Growing eval framework, catching up to LangSmith.

**Weaknesses.**

- Younger ecosystem. Fewer integrations than LangSmith.
- Self-hosted means you run it. Real operational effort, especially at scale.
- Trace visualization is good, not quite at LangSmith's polish level.

**Best for.** Teams that want self-hosted, framework-agnostic, or need data residency compliance. Our current default for KSA and UAE deployments.

### Braintrust

**What it is.** Evaluation-focused platform. Positioned less as "observability" and more as "the CI for AI."

**Strengths.**

- The eval workflow is unusually strong. Dataset management, scored runs, and human review flows are deeply thought through.
- Prompt playground for iterating fast.
- Good for teams that treat eval as a first-class engineering discipline.

**Weaknesses.**

- Runtime observability is thinner than LangSmith or Langfuse — Braintrust is more about the CI pipeline than the live traces.
- Best combined with another tool for production monitoring, not replacement.

**Best for.** Teams that want a strong eval workflow. Often used alongside a production observability tool.

### Helicone

**What it is.** LLM logging and analytics proxy. Sits between your app and the model provider.

**Strengths.**

- Zero-code integration. Point your OpenAI/Anthropic SDK at Helicone's URL. Done.
- Great cost tracking, latency dashboards, user-level analytics.
- Open-source self-hosted option available.

**Weaknesses.**

- Focused on LLM calls specifically, not full agent traces. If your observability need is "which model calls happened and what did they cost," excellent. If it's "trace this multi-step agent run," Helicone is thinner.
- Less mature eval framework than the alternatives.

**Best for.** Teams that want cost and usage analytics fast, especially in the early stages of a deployment.

### ReviewBench (newer entrant)

**What it is.** Specialized in agent evaluation — dataset curation, human reviewer workflows, and multi-model comparison.

**Strengths.**

- Human reviewer workflow is unusually strong. If your evals depend on human judgment (not just automated scoring), ReviewBench is worth evaluating.
- Multi-model comparison shipping — compare the same eval across GPT-4, Claude, Gemini, Llama.
- Growing quickly. Some enterprise features leapfrog older tools.

**Weaknesses.**

- Newer, less battle-tested.
- Best combined with production observability, not as a replacement.

**Best for.** Teams where evals require significant human review, or teams doing serious multi-model comparisons.

### Self-hosted OpenTelemetry + custom dashboards

**What it is.** The DIY option. Instrument agent code with OTel, ship traces to your existing observability stack (Grafana, Datadog, Honeycomb), build custom dashboards.

**Strengths.**

- Full control. Data lives in your infrastructure. Fits with your existing observability practice.
- No new vendor to procure.
- Custom dashboards can be tuned to your specific business metrics.

**Weaknesses.**

- Everything is DIY. Eval framework, prompt management, trace visualization, human feedback loops — you build or integrate all of it.
- Meaningful engineering investment.

**Best for.** Larger enterprises with mature observability practice, or teams with unusual requirements not served by the vendors.

## The layered observability model

Rather than picking one tool, most serious production agents use multiple layers.

### Layer 1 — Runtime tracing and logging

Every agent invocation produces a trace. Every LLM call, every tool invocation, every state transition. This is the "what happened" data.

**Tools:** LangSmith, Langfuse, Helicone, or self-hosted OpenTelemetry.

Non-negotiable. Skip this and you have no debugging power.

### Layer 2 — Cost and usage analytics

Aggregate view of what's costing what. Per model, per user, per feature, per tenant.

**Tools:** Helicone is strong. Also LangSmith, Langfuse, and gateway-level metrics from Vercel AI Gateway, LiteLLM, or Cloudflare (see our [AI gateways comparison](/blog/ai-gateways-comparison-2026)).

Skip this and you'll be surprised by every quarterly bill.

### Layer 3 — Prompt management and versioning

Prompts are code. Version them, deploy them like artifacts, track which version was live when.

**Tools:** Langfuse, LangSmith, Braintrust all offer this. Some teams keep prompts in Git and deploy them via CI.

Skip this and you'll have no idea which prompt was live during last week's incident.

### Layer 4 — Evaluation framework

Automated tests for agent behavior. Eval sets that grow over time. Regression detection on every model or prompt change.

**Tools:** Braintrust, LangSmith, Langfuse, ReviewBench.

Skip this and you'll ship regressions. Guaranteed.

### Layer 5 — Human feedback loop

Capture thumbs-up/thumbs-down from users, review of specific outputs, annotator disagreements. Feed this back into eval sets and prompt improvements.

**Tools:** Most of the vendors support this. Some (ReviewBench) specialize in it.

Skip this and your evals only cover the things you thought to test, not what users actually experience.

### Layer 6 — Alerts and anomaly detection

Automated notifications for cost spikes, error rate changes, latency regressions, unusual tool-call patterns.

**Tools:** Any general APM (Datadog, PagerDuty, Grafana OnCall) integrated with the LLM-specific data from Layer 1.

Skip this and problems fester. Incidents multiply in the dark.

## The specific stack we deploy

For most enterprise clients, we deploy this shape:

- **Layer 1 + 3:** Langfuse (self-hosted for regulated deployments, cloud for others).
- **Layer 2:** Langfuse or Helicone, plus gateway-level cost tracking.
- **Layer 4:** Braintrust for eval sophistication, or Langfuse eval if we want everything in one tool.
- **Layer 5:** Langfuse annotation workflows.
- **Layer 6:** Standard APM (Datadog for most clients) with Langfuse's alerting.

For LangGraph-heavy deployments, we substitute LangSmith for Layers 1-4.

For strict data-residency requirements (KSA, UAE government workloads), we use self-hosted Langfuse and Braintrust with regional infrastructure.

## The specific dashboards we build

Whichever tools you pick, build these dashboards.

**Health dashboard:**
- Requests per minute.
- Success rate.
- p50, p95, p99 latency.
- Tool call error rate.
- Cache hit rate.

**Cost dashboard:**
- Spend per hour, per day, per week.
- Spend by model.
- Spend by user or tenant.
- Cost per successful outcome.

**Quality dashboard:**
- Eval scores over time.
- User feedback ratio (positive vs negative).
- Escalation rate (agent handed off to human).
- Regression alerts.

**Incident dashboard:**
- Trace search by user or session.
- Filter by error code, tool called, model used.
- Full-context replay of specific runs.

If a stakeholder asks "how's the agent doing?" and you can't answer in under 30 seconds from your dashboards, you don't have observability. You have logs.

## Common observability mistakes

**Logging outputs but not prompts.** Half the debugging value gone.

**Logging one model call but not the sequence.** You can see steps but not the full agent trace. Multi-step failures are opaque.

**No sampling strategy at scale.** Logging every trace at scale is expensive. Sampling intelligently (all errors, 10% of successes, more for specific tenants) balances cost and observability.

**Building eval sets from imagination.** Eval sets built without real user data drift from reality. Build them from actual traffic, annotate real interactions, iterate.

**Instrumenting after the fact.** You can retrofit observability, but it's painful and you lose the data before instrumentation existed. Instrument first, ship second.

**Ignoring PII in traces.** Traces will contain user data. Some of it is sensitive. Design your logging with PII handling from the start. GDPR, DPDP, and similar rules apply to LLM traces same as any other user data.

## Frequently asked questions

**How much does agent observability cost?**
For a mid-sized deployment (20K invocations/day), realistic cost is $500-3,000/month depending on vendor and volume. Self-hosted Langfuse plus your existing APM can drop this closer to zero on the vendor side, at the cost of ops time.

**Can we start with self-hosted OpenTelemetry?**
You can. You'll re-invent parts of the ecosystem. For most teams, using a specialized vendor is cheaper than building the eval and prompt-management layers yourself.

**How do we build eval sets efficiently?**
Start with 30-50 hand-curated cases covering the most important user journeys. Add real user traces (with permission) that revealed interesting bugs. Grow the set every quarter. Never let it drop below "represents what real users do."

**What about privacy in eval sets?**
Anonymize or synthesize sensitive fields. For regulated deployments (finance, health, KSA/UAE government), eval data may need to stay in-region and be reviewed by only cleared personnel. Design accordingly.

**How does observability interact with security incidents?**
Directly. When a [prompt injection incident](/blog/prompt-injection-2026-threat-playbook) occurs, your traces are the artifact incident responders need. Design retention for this — 90+ days minimum for enterprise deployments.

## The strategic read

Observability is not a nice-to-have for agents. It's the difference between a system that improves over time and one that mysteriously degrades. Every serious agent team invests here. Every under-performing agent deployment has under-invested here.

The tools got good enough in 2026 that "we didn't have observability" is no longer a defensible answer. Pick your stack, deploy it, and use it.

At Xenolve we design and deploy agent observability stacks as part of production engagements. If your agent is opaque to your engineering team — or your CFO asks a cost question you can't answer — [get in touch](/contact). Observability is one of the highest-ROI investments in the AI stack, and it's straightforward to get right if you approach it deliberately.

You can't debug what you can't see. In 2026, there's no excuse to not see.
