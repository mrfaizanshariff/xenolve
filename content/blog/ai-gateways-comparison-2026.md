---
title: "AI Gateways Compared: Vercel AI Gateway, OpenRouter, LiteLLM, and Cloudflare — Which One Belongs in Your Stack"
description: "AI gateways are the boring, high-leverage layer between your app and every LLM. In 2026 the market split into four serious contenders. Here's the engineering-side comparison: caching, spend caps, routing, observability, and where each one earns its place."
date: "2026-04-23"
coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
tags: ["AI Gateway", "LLM Infrastructure", "Vercel", "Cloudflare", "OpenRouter", "LiteLLM"]
author:
  name: "Faizan Shariff"
  picture: "/assets/authors/faizan.jpg"
---

# The layer no vendor wants you to notice

If your product calls an LLM, there's a layer between your code and the model provider that quietly decides your costs, your latency, and your ability to sleep through the night. It's called an **AI gateway**, and in 2024 hardly anyone talked about it. By 2026, four serious contenders — Vercel AI Gateway, OpenRouter, LiteLLM, and Cloudflare's built-in gateway — are competing for the layer.

We've deployed all four in enterprise engagements. Each one solves a different problem well and a different problem poorly. This is what we wish someone had told us before we picked wrong the first two times.

## What an AI gateway actually does

At minimum, an AI gateway sits between your application and one or more LLM providers, doing the operational work you'd otherwise do yourself:

- **Routing** — pick which model handles a request (by rule, by fallback, by A/B test).
- **Caching** — return identical responses for identical requests without re-calling the model.
- **Rate limiting** — enforce per-user or per-tenant quotas.
- **Spend caps** — hard-stop spending at a budget threshold.
- **Retries and fallbacks** — automatically retry failed requests, fall back to a different model.
- **Observability** — log every request, response, cost, latency, error.
- **Provider abstraction** — switch models by config, not code change.
- **Prompt management** — sometimes; some gateways manage prompts, some don't.

If your app has more than one LLM call, you want a gateway. If you don't have one today, you probably rebuilt half of one accidentally.

## The four contenders

### Vercel AI Gateway

**The pitch:** Deeply integrated with Vercel deployments and the AI SDK. Best-in-class developer experience if you're already on Vercel.

**Strengths.**

- Deployment is trivial. Configure a model, ship. No separate infrastructure.
- Observability integrates cleanly with Vercel's log and metrics UI.
- Fluid Compute pricing (up to 85% cheaper than traditional serverless for AI workloads) makes the total cost story competitive.
- Good caching semantics with clear TTL controls.
- Multi-provider routing built in.

**Weaknesses.**

- Vercel-first. If your compute lives elsewhere, adopting this gateway pulls you into Vercel more than you might want.
- Feature coverage is growing but behind LiteLLM on some enterprise-specific needs (custom budget policies, complex routing rules).
- Observability data lives in Vercel. Exports work but non-Vercel dashboards are more work.

**Best for:** Teams already on Vercel who want the least infrastructure friction.

### OpenRouter

**The pitch:** A unified API to a huge catalog of models — hundreds of them, from every major provider plus many open-source hosts. Priced pay-as-you-go.

**Strengths.**

- Model catalog is the deepest. Every major frontier model. Every serious open-source model, hosted. Weird niche models you'd never find elsewhere.
- Provider abstraction is real. Switch from GPT-4 to Claude to Llama with a model-name change.
- Pricing is transparent, per-token, straightforward.
- Increasingly popular for teams that want optionality rather than lock-in.

**Weaknesses.**

- Less operational tooling. Rate limiting is basic. Spend caps are per-key, not per-tenant. Observability is thinner than the enterprise-focused alternatives.
- No self-hosted option. Data flows through OpenRouter's infrastructure, which is a hard filter for regulated workloads.
- Multi-tenant SaaS features (per-customer quotas, spending attribution) require you to build a layer on top.

**Best for:** Teams that value model catalog breadth over operational sophistication. Great for research, early-stage products, and applications where model optionality is the primary need.

### LiteLLM

**The pitch:** Open-source, self-hostable, provider-agnostic. The "boring but essential" choice.

**Strengths.**

- Self-hosted. Data stays in your infrastructure. Big deal for regulated workloads.
- Feature-rich. Multi-tenant support, virtual keys, spend tracking per team, per user, per project. This is the enterprise-tier feature set.
- Supports every major provider plus custom endpoints (your own hosted models, on-prem inference).
- Active development. New provider integrations land quickly.
- Reasonable pricing model — free for self-hosted, managed offering (LiteLLM Cloud) for teams that want it.

**Weaknesses.**

- You run it. Someone on your team owns the ops. For small teams this is real overhead.
- The managed offering is younger and less battle-tested than the open-source project.
- Documentation, while improving, still requires reading source code for less common configurations.

**Best for:** Enterprise teams that need multi-tenant sophistication, self-hosted deployment, or on-prem model integration. Our current default for regulated deployments.

### Cloudflare AI Gateway (part of Agentic Cloud)

**The pitch:** A first-party feature of Cloudflare's Agentic Cloud (see our [walkthrough](/blog/cloudflare-agentic-cloud-edge-agents)). Deeply integrated with Workers, Durable Objects, and Workers AI.

**Strengths.**

- Zero infrastructure. If you're already on Cloudflare, the gateway is just a binding.
- Regional data affinity is trivial — you can pin traffic to any Cloudflare region.
- Spend caps at the platform level. Genuinely helpful for budget-sensitive projects.
- Caching semantics are solid, especially for repeated queries at scale.
- Integrates with Workers AI (Cloudflare-hosted open models) if you want to skip external providers.

**Weaknesses.**

- Best when your compute is already Cloudflare. If you're on AWS/GCP, adopting the gateway is a bigger architectural pull.
- Model catalog is narrower than OpenRouter. You get major providers plus Workers AI's open catalog.
- Enterprise features specific to multi-team billing and attribution are less mature than LiteLLM's.

**Best for:** Teams already on Cloudflare's Agentic Cloud, or teams that want edge-latency AI with strong spend controls out of the box.

## Head-to-head, on the dimensions that decide

| Dimension | Vercel AI Gateway | OpenRouter | LiteLLM | Cloudflare Gateway |
|-----------|-------------------|-----------|---------|-------------------|
| **Setup time** | Excellent | Excellent | Moderate | Excellent (if on Cloudflare) |
| **Model catalog breadth** | Broad | Best-in-class | Broad + custom | Broad |
| **Self-hosted option** | No | No | Yes | No |
| **Multi-tenant billing** | Basic | Basic | Excellent | Moderate |
| **Spend caps** | Good | Basic | Excellent | Excellent |
| **Caching** | Good | Basic | Good | Excellent |
| **Regional data residency** | Limited | Limited | Full (self-hosted) | Full (Cloudflare regions) |
| **Enterprise support** | Vercel Enterprise | Growing | Community + paid | Cloudflare Enterprise |
| **Best for** | Vercel-native teams | Model optionality | Regulated / enterprise | Cloudflare-native teams |

## The decision framework we use

**1. Is data residency or self-hosted a hard requirement?**
→ LiteLLM. It's the only one you can run on-prem or in your VPC.

**2. Do you have complex multi-tenant billing or attribution needs?**
→ LiteLLM. The others require you to build a layer.

**3. Are you already deep on Vercel or Cloudflare?**
→ Use that platform's gateway. The integration wins outweigh feature gaps.

**4. Do you need the widest possible model catalog for experimentation?**
→ OpenRouter. Nothing else comes close.

**5. Are you a small team that wants the fewest moving pieces?**
→ Vercel AI Gateway or Cloudflare Gateway, depending on where your compute lives.

Two clean choices, not four. Once your context is set, the decision usually falls out.

## Common gateway anti-patterns

**"We'll build our own gateway."**
Almost always the wrong call. The features listed above are non-trivial to build well. Buying a mature gateway is cheaper than building a bad one. Only build if your requirements are genuinely unusual (specific compliance frameworks, custom protocols).

**"One gateway to rule them all."**
Sometimes teams put every service behind one gateway. Fine if the gateway is your central AI infra. Bad if it becomes a single point of failure for unrelated products. Consider per-product or per-team gateways if the blast radius matters.

**"We don't need a gateway yet."**
Every team says this until an unexpected bill or an incident forces the retrofit. Introduce a gateway from day one, even if it's just proxying to one provider. The operational cost is low; the retrofit cost is high.

**"Caching everything is safe."**
It isn't. Personalized responses shouldn't be cached across users. Some prompts contain PII you don't want re-served. Design cache keys carefully.

**"Fallback models are free."**
Fallback often means switching from a fast provider to a slow one. Or from a smart model to a dumber one. Or degrading quality without users noticing. Make fallback strategies explicit and observable.

## What to actually configure

Whichever gateway you pick, the same checklist applies.

- **Spend caps per tenant, per team, per environment.** Not just a global cap.
- **Rate limits at multiple granularities.** Per-user, per-tenant, per-IP.
- **Cache TTLs by prompt shape.** FAQ responses can cache for hours. User-specific answers should not cache at all.
- **Fallback chains.** Primary, secondary, tertiary. What happens when all three fail?
- **Observability dashboards.** Latency, error rate, cost per tenant, cache hit rate, model share. All of these should be visible.
- **Alerts.** Cost spikes, error rate spikes, latency regressions. Someone should be paged, not surprised.

## For regulated markets

For clients we serve in KSA and UAE where data must stay in-region, the practical answer is almost always **self-hosted LiteLLM in a regional cloud**. LiteLLM's flexibility around custom provider endpoints — including on-prem hosted models — makes this the only pragmatic default. The other options either don't support the region or don't support self-hosted at all.

For clients that can accept managed cloud but need spend controls and observability, **Cloudflare's Agentic Cloud** with its Middle East regions is a strong second choice.

## Frequently asked questions

**Do gateways add meaningful latency?**
Well-designed ones add 10-50ms. Poorly-designed ones can add 200ms+. Measure. It's usually a rounding error compared to model inference latency.

**How do gateways interact with prompt versioning?**
Some (LiteLLM, Vercel) offer prompt management. Some don't. If prompt versioning matters to you, factor that into the choice.

**Can we mix gateways?**
Yes, and larger orgs sometimes do. A common pattern: LiteLLM for internal traffic (self-hosted, enterprise features), OpenRouter for research/experimentation, provider-native for high-volume production.

**What about direct SDK calls, no gateway?**
Fine for prototypes. Painful in production. The moment you have real users, real bills, or real compliance requirements, you'll wish you had a gateway from the start.

**How does this interact with prompt caching (like Anthropic's)?**
Gateway caching and prompt caching are different. Prompt caching (provider-side) caches within a single conversation. Gateway caching caches identical requests across users. Both are useful; they don't replace each other.

## The strategic read

The AI gateway layer is where a lot of quiet leverage lives — cost control, observability, provider optionality, compliance. Teams that treat it as an afterthought pay for it in operational overhead. Teams that pick a serious gateway and configure it deliberately spend meaningfully less and sleep better.

The right choice depends on where your compute lives, how regulated your workload is, and how much operational tooling you need. Four viable defaults now exist. Pick one.

At Xenolve we design AI infrastructure for enterprise deployments, including gateway architecture, provider selection, and multi-tenant billing setup. If you're wiring up an AI stack for a serious workload and want a fresh perspective, [get in touch](/contact). This layer is worth thinking about carefully; we've watched enough teams get it wrong to know where the pitfalls hide.

Boring infrastructure choices, made well, are what separate teams that scale from teams that scramble.
