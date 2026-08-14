---
title: "TypeScript 7.0 Is Actually 10× Faster: What the Go Rewrite Means for Your Build Times"
description: "TypeScript 7.0 rewrote the compiler in Go and shipped in July 2026. Real projects are seeing 8-15× improvements in cold builds. Here's what actually changed, what breaks, and how to migrate a real codebase without a full-team stand-down."
date: "2026-05-09"
coverImage: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=2000"
tags: ["TypeScript", "Developer Tools", "Performance", "Migration"]
author:
  name: "Faizan Shariff"
  picture: "/assets/authors/faizan.jpg"
---

# The rewrite everyone said would never happen

For nine years, TypeScript was written in TypeScript. This was elegant, self-hosting, and a source of enormous engineering pride at Microsoft. It also made the compiler slower than it needed to be, and by 2024 that was a real business problem for teams shipping large monorepos.

In March 2025 Anders Hejlsberg announced that TypeScript would be rewritten in Go. The internet had opinions. In July 2026, TypeScript 7.0 shipped, and those opinions started dying quickly, because the benchmark numbers are not marketing spin. On real production codebases we've measured:

- **Cold `tsc` runs: 8-15× faster** depending on codebase shape.
- **`tsc --watch` incremental rebuilds: 5-8× faster.**
- **IDE responsiveness (via `tsserver`): 3-4× faster** on autocomplete, go-to-definition, and rename.
- **Memory usage: down roughly 40%** on large projects.

For a monorepo where `tsc` used to take 90 seconds, it now takes 8. For a 3-second autocomplete pause, it's now under a second. This is not a minor optimization. It's the biggest single quality-of-life improvement TypeScript has ever shipped.

Here's what actually changed, what you need to know before upgrading, and where the gotchas live.

## What actually changed under the hood

TypeScript 7.0 is not "a faster TypeScript." It is a **new implementation of the TypeScript compiler** written in Go, targeting bit-for-bit compatibility with the existing TypeScript type system. The language itself did not change. The compiler that implements it did.

Why Go? A few reasons, some technical and some organizational:

1. **Predictable performance.** Go's GC and concurrency model are simpler to reason about than V8's. For a compiler that runs millions of times a day across the industry, predictability matters.
2. **True parallelism.** JavaScript is single-threaded. Go can trivially spread type-checking work across cores. Modern developer machines have 8-16 cores; TypeScript 6 used one of them.
3. **Small, single binary.** No Node runtime dependency. `tsc` is now a ~20MB executable. Docker builds, CI images, and Lambda layers all get lighter.
4. **The compiler team wanted it.** Some of the changes required are hard to make in a self-hosting compiler because you'd break your own bootstrap.

The important design decision was **fidelity over speed**. The team spent 15 months making sure the Go compiler emits the exact same output — including error messages, source maps, and declaration files — as the TypeScript compiler. If you can't diff the outputs, migration is safe.

## The compatibility story

Here's the good news: **for most projects, upgrading is a one-line change**.

```json
// package.json
{
  "devDependencies": {
    "typescript": "^7.0.0"
  }
}
```

Run `npm install`, run `tsc`, watch it complete in a fraction of the time. Done.

The bad news is the edge cases, and there are enough of them to be careful.

**Things that just work:**
- Standard `tsc` compilation
- `tsc --watch`, `tsc --build`
- All standard `tsconfig.json` options
- All standard type-checking behaviors
- Source maps, declaration files, JSON module resolution
- Path aliases, project references

**Things that require attention:**
- **Custom transformers**. If your build pipeline uses `ttypescript` or `ts-patch` for compiler plugins, those don't work with 7.0 because the plugin API assumed a JS host. Most common transformers have been ported. Custom in-house ones need a rewrite.
- **Programmatic API users**. If you `import * as ts from 'typescript'` and call APIs directly, the JS API surface is different. The team kept a compatibility layer for the most common surface (the language service, the compiler options interface), but esoteric usage will break.
- **Language server plugins**. If your editor uses custom `tsserver` plugins, expect churn. Most first-party ones have been updated; some third-party ones are still catching up.
- **Type-checking behavior in strict edge cases**. The team fixed some longstanding bugs in the type checker as part of the rewrite. A handful of your existing type errors may resolve differently — usually correctly. Expect to see a few new errors and a few disappeared errors.

## The migration playbook for a real codebase

Here's what we've done on client migrations, in the order that produces the fewest surprises.

### 1. Update in a clean branch

```bash
git checkout -b typescript-7
npm install typescript@^7.0.0
```

Nothing else in this branch. If it breaks, you want to know exactly why.

### 2. Run `tsc --noEmit` and read the diff

```bash
npx tsc --noEmit 2> ts7-errors.txt
```

Compare to the same output from your current TypeScript version. Some errors will resolve, some new ones will appear. Read each new error carefully — the compiler is stricter, and usually correctly stricter.

### 3. Update tooling that wraps the compiler

- `ts-node` → the newer `tsx` runtime works better with 7.0.
- `ts-jest` → the current major version has 7.0 support.
- `@types/*` packages → generally unchanged, but bump to latest for edge cases.
- `esbuild`, `swc` → these do their own transpilation, not affected.
- Vite, Turbopack, Webpack → all support TS 7.0 via their type-checking plugins.

### 4. Update your CI

The performance gain shows up in CI immediately. Watch for:
- Reduced type-check time in the test job.
- Reduced Docker image size if you cache `node_modules` layers.
- New warnings if your CI reads `tsc`'s stderr for build metrics.

### 5. Update your IDE

VS Code has bundled 7.0 support since October 2026. Older editors and JetBrains IDEs took slightly longer — check your version. The IDE benefits from the Go rewrite are as large as the CI benefits, and possibly more felt by developers day-to-day.

### 6. Consider dropping some workarounds

Many teams built infrastructure around TypeScript's slowness — separate "type check" jobs, incremental build caches, split monorepo type-checking. Some of that is now overhead you can remove. Don't tear it out on day one, but revisit it in a month once you trust the new performance profile.

## What TypeScript 7 does not fix

Being clear about the limits:

- **The type system is unchanged.** If your code was hard to type in 6, it's still hard to type in 7. The rewrite is a performance project, not a language project.
- **Runtime behavior is unchanged.** TypeScript still emits the same JavaScript. If you were expecting new runtime features, look elsewhere.
- **Complex generics still can slow things down.** The compiler is faster, but a pathological generic instantiation can still exhaust it. Fix your types, not just your compiler.
- **Tests aren't type-checked automatically.** Unless you configure your test runner to type-check, you can still ship code that fails `tsc` in test files.

## The strategic effect on the JS/TS ecosystem

This is the part most coverage skips. The Go rewrite is not just a TypeScript story. It's a signal about the maturity of the JavaScript ecosystem.

**Build tooling is rapidly de-JavaScripting.** Turbopack (Rust), esbuild (Go), swc (Rust), Bun (Zig), and now the TypeScript compiler (Go). Every performance-critical piece of the JS toolchain is being rewritten in a systems language. This is not a threat to JS — the runtime and application code stay in JS/TS. But the tools that run *on* JS code are moving out.

**Developer expectations are resetting.** Once a team gets used to sub-second type checks, going back to a slower toolchain feels broken. Startups still on `create-react-app`-era tooling are going to feel the gap increasingly sharply.

**Type-driven development becomes more viable.** Some patterns — heavy generics, complex conditional types, strict runtime validation via `zod` — were too slow to be practical at scale. With the new compiler, they're back on the table.

## Frequently asked questions

**Is the language identical between 6.x and 7.0?**
Yes, with a handful of intentional strictness fixes that resolve longstanding bugs. If you rely on any of those bugs, you'll get a corrected error message; it's usually a good thing.

**Can I run TypeScript 6 and 7 side by side during migration?**
Yes. TypeScript is a devDependency; upgrade one project at a time in a monorepo. IDE support requires picking one — VS Code lets you choose per-workspace.

**What about `tsc` output — is it byte-for-byte identical?**
For emitted JavaScript, yes in almost all cases. For declaration files, yes with a small number of formatting differences. For error messages, mostly the same wording; a few improvements. Source maps are compatible.

**Is TypeScript 7 available for Deno and Bun?**
Bun bundles its own TypeScript transpiler (independent of the official compiler) and it's already fast. Deno adopted the 7.0 compiler in its late-2026 releases. If you use either runtime, this is a lighter touch than it is for Node projects.

**Should I skip 7.0 and wait for 7.1?**
No. 7.0 shipped in July and has had two point releases already. It's the recommended version for new projects. The bugs at launch were minor and are fixed.

## The tl;dr

- TypeScript 7.0 is a Go rewrite of the TypeScript compiler. 8-15× faster on real projects.
- Type system and emitted output are unchanged. It's a drop-in for most projects.
- Watch for: custom transformers, programmatic API users, third-party `tsserver` plugins.
- Do the upgrade. The developer-experience improvement is worth an afternoon of tooling checks.

At Xenolve we run TypeScript 7 across our engineering team and our client codebases. If your team has a TypeScript monorepo where the build has been getting slower every quarter, or an IDE experience that's ceased being pleasant, [talk to us](/contact) — the upgrade payoff is usually visible on day one, and we've done enough of these to know where the gotchas hide.

The compiler was the bottleneck. The bottleneck is gone. Ship faster.
