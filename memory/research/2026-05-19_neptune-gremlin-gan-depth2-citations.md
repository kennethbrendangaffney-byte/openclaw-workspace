# Neptune Gremlin: GAN Depth-2 Citation Count

**Query:** Count papers that cite papers that cite "Generative Adversarial Nets" (depth-2 citations).

## Gremlin Pattern

```gremlin
g.V().hasLabel('Paper').has('title', 'Generative Adversarial Nets')
 .in('cites').hasLabel('Paper')
 .in('cites').hasLabel('Paper')
 .dedup()
 .count()
```

## Step-by-Step (Detailed)

| Step | Code | What it does |
|------|------|-------------|
| 1 | `g.V().hasLabel('Paper').has('title', 'Generative Adversarial Nets')` | Find the GAN paper |
| 2 | `.in('cites').hasLabel('Paper')` | Papers that directly cite GANs (depth 1) |
| 3 | `.in('cites').hasLabel('Paper')` | Papers that cite those papers (depth 2) |
| 4 | `.dedup()` | Remove duplicates |
| 5 | `.count()` | Total count |

## Edge Direction Assumptions

- `cites`: `Paper` → `Paper` (citing paper → cited paper)
  - So `.in('cites')` means "papers that cite this one"

## Important Notes

**`.dedup()` is critical here:**
Without deduplication, the count would be inflated. A single depth-2 paper might cite multiple depth-1 papers, causing it to appear multiple times in the traversal. `.dedup()` ensures each unique paper is counted only once.

**Depth vs breadth:**
- Depth 1: direct citations (papers citing GANs)
- Depth 2: indirect citations (papers citing papers that cite GANs)
- This measures the "ripple effect" of a paper's influence through the citation network

**Edge direction assumptions:**
- `cites`: `citing_Paper` → `cited_Paper`

This counts all papers at depth 2 (papers citing papers that cite the GAN paper). Note: This may include the GAN paper itself if there's a citation cycle, and may double-count papers that cite multiple depth-1 papers. The `.dedup()` handles the double-counting.

**Excluding the original paper:**
If you need to exclude the original GAN paper from the result, add a `.where(neq(original_paper_vertex))` step after the second `.in('cites')`.

## Key Pattern

This is a **multi-hop citation count query**:
1. Start from a landmark paper
2. Follow citation edges backward (find citing papers)
3. Follow again (find papers citing the citing papers)
4. Deduplicate (a paper might cite multiple depth-1 papers)
5. Count total unique papers at depth 2

Useful for: "citation network reach", "influence diffusion measurement", "indirect impact analysis".

## Comparison: Six Query Patterns

| Pattern | Query Type | Key Steps | Use Case |
|---------|-----------|-----------|----------|
| `where(within('label'))` | Set intersection | Side-effect label + filter | A AND B |
| `groupCount().where(P.gte(N))` | Frequency threshold | Group + count + threshold | N+ occurrences |
| `project().by().by(count())` | Projection with metrics | Extract + compute + rank | Ranked lists |
| `project().by().by(traversal)` | Projection with nested lookups | Multi-hop property extraction | Tabular reports |
| `project().by().by(coalesce())` | Projection with fallback | Try edge A, else edge B | Optional relationships |
| `in().in().dedup().count()` | Multi-hop reach | Traverse N hops + dedup + count | Network reach |

**Source:** KC (Casey) — shared in #group-work for Ken's CCT AI diploma study
**Date:** 2026-05-19
