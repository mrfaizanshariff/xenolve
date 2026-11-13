---
title: "The Ghost in the Machine: LLM Hallucinations Masked by Non-Deterministic Function Calls"
description: "A production-grade AI Engineering deep-dive exploring: The Ghost in the Machine: LLM Hallucinations Masked by Non-Deterministic Function Calls"
author:
  name: "Mohammed Maaz"
  picture: "/maazDp.png"
tags:
  - "AI Engineering"
  - "LLMOps"
  - "System Design"
  - "Production AI"
date: "2026-11-13"
coverImage: "/blog/ai-engineering-the-ghost-in-the-machine-llm-halluc.png"
---

🚨 Production Alert: Our LLM-powered feature started silently failing. Users reported bizarre behavior, but logs showed no explicit errors. The system was working, just… wrong.

💥 We thought we had it nailed. LLM generates JSON for a function call, we parse and execute. Simple, right? This works fine in a notebook. But in production, with real traffic and slightly different contexts, the LLM's output for function arguments became non-deterministic. Syntactically valid JSON, but semantically nonsensical. The function would execute with garbage data, no exceptions thrown. The "ghost in the machine."

🔬 The culprit? LLM's probabilistic nature. Even with identical prompts, the decoding process (temperature, sampling) can yield subtly different, yet valid, JSON. This variability meant arguments could be technically parsable but violate our domain logic – a silent, insidious bug.

🛠️ The fix wasn't just better prompting. We built a multi-stage validation layer:
1. Strict JSON schema validation.
2. Semantic validation: Range checks, valid enum values, referential integrity against our domain.
3. A fallback: If validation failed, we'd re-prompt the LLM, explicitly asking it to correct its previous output or provide a more constrained response.

💡 Engineer Takeaway: Never trust LLM output directly for critical function calls. Always validate, then validate again, and have a plan for when it gets it wrong.

💬 How are you ensuring the reliability of LLM-generated function calls in your production systems?

#AIEngineering #LLMOps #ProductionAI #SystemDesign #SoftwareEngineering #MachineLearning