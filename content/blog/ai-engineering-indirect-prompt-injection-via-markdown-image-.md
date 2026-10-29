---
title: "Indirect Prompt Injection via Markdown Image Tags: The Agent's Blind Spot"
description: "A production-grade AI Engineering deep-dive exploring: Indirect Prompt Injection via Markdown Image Tags: The Agent's Blind Spot"
author:
  name: "Mohammed Maaz"
  picture: "/maazDp.png"
tags:
  - "AI Engineering"
  - "LLMOps"
  - "System Design"
  - "Production AI"
date: "2026-10-29"
coverImage: "/blog/ai-engineering-indirect-prompt-injection-via-markd.png"
---

🚨 Production Alert: Our agent went rogue, silently executing commands from scraped web content. Not a fun Monday.

💥 We built an agent to process scraped markdown, expecting it to just extract text. Standard stuff, right? Notebooks worked perfectly. But in production, processing real-world, unvetted markdown? That's a different beast. The agent was designed to "understand" the content, and that included image tags.

🔬 The trap was in the `<img>` tag's src attribute. Markdown parsers often treat URLs in src as just another piece of data. An attacker can craft a markdown like `![alt text](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxzY3JpcHQ+YWxlcnQoJ21hbGljaW91cyBjb2RlJyk7PC9zY3JpcHQ+PC9zdmc+ )` or a URL pointing to a malicious endpoint. When our agent tried to "process" or "fetch" this image, it inadvertently executed the embedded SVG or triggered a request to a compromised server.

🛠️ The fix: A strict markdown sanitization layer. We now explicitly disallow `data:` URIs and any protocols other than `http`/`https` for image sources. For `http`/`https`, we enforce an allowlist of trusted domains. Alternatively, if your agent doesn't need to interpret image sources, just extract the `alt` text or filename. Don't fetch what you don't need to.

💡 Engineer Takeaway: Never trust external markdown. Treat every URL within it as a potential attack vector, especially when your agent's logic might interpret it.

💬 How are you securing your LLM agents against malicious input from external data sources?

#AIEngineering #LLMOps #ProductionAI #SystemDesign #SoftwareEngineering #MachineLearning