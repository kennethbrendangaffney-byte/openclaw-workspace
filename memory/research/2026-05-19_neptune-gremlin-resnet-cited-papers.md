# Neptune Gremlin: ResNet Cited Papers

**Query:** Find papers cited by "Deep Residual Learning for Image Recognition" (ResNet), projected with title, authors, venue, and year.

## Gremlin Pattern

```gremlin
g.V().hasLabel('Paper').has('title', 'Deep Residual Learning for Image Recognition')
 .out('cites').hasLabel('Paper')
 .project('title', 'authors', 'venue', 'year')
   .by('title')
   .by(__.in('wrote').values('name').fold())
   .by(__.coalesce(__.out('presentedAt').values('name'), __.out('publishedIn').values('name')))
   .by('year')
```

## Step-by-Step (Detailed)

| Step | Code | What it does |
|------|------|-------------|
| 1 | `g.V().hasLabel('Paper').has('title', 'Deep Residual Learning for Image Recognition')` | Find the ResNet paper |
| 2 | `.out('cites').hasLabel('Paper')` | Papers it cites (its references) |
| 3 | `.project('title', 'authors', 'venue', 'year')` | For each cited paper, create 4-field projection |
| 4 | `.by('title')` | Field 1: paper title |
| 5 | `.by(__.in('wrote').values('name').fold())` | Field 2: all researcher names (folded into a list) |
| 6 | `.by(__.coalesce(__.out('presentedAt').values('name'), __.out('publishedIn').values('name')))` | Field 3: conference name if `presentedAt` exists, otherwise journal name |
| 7 | `.by('year')` | Field 4: publication year |

## Edge Direction Assumptions

- `cites`: `citing_Paper` → `cited_Paper`
- `wrote`: `Researcher` → `Paper`
- `presentedAt`: `Paper` → `Conference`
- `publishedIn`: `Paper` → `Journal`

## Important Notes

**`coalesce()` in the `venue` field:**
The `coalesce()` in the `venue` field handles both conference papers (via `presentedAt`) and journal papers (via `publishedIn`). This is a common pattern for optional relationships where a vertex may have one of several edge types.

**`.in('wrote').values('name').fold()`** — Collects all authors into a list:
- `.in('wrote')` goes from Paper to Researcher (reverse of `wrote` direction)
- `.values('name')` gets each author's name
- `.fold()` aggregates into a list (handles multiple authors)

**`.coalesce(A, B)`** — Tries first traversal, falls back to second:
- First tries `__.out('presentedAt').values('name')` (conference name)
- If that fails (no `presentedAt` edge), tries `__.out('publishedIn').values('name')` (journal name)
- Returns whichever succeeds first
- This handles papers that may be published in either conferences or journals

## Key Pattern

This is a **reference extraction + multi-source property query**:
1. Start from a landmark paper
2. Follow citation edges to its references
3. Project with properties that require:
   - Reverse traversal (`.in('wrote')` for authors)
   - List aggregation (`.fold()` for multiple authors)
   - Coalesce for optional edges (conference OR journal)

Useful for: "bibliography extraction", "reference analysis", "paper metadata compilation".

## Comparison: Five Query Patterns

| Pattern | Query Type | Key Steps | Use Case |
|---------|-----------|-----------|----------|
| `where(within('label'))` | Set intersection | Side-effect label + filter | A AND B |
| `groupCount().where(P.gte(N))` | Frequency threshold | Group + count + threshold | N+ occurrences |
| `project().by().by(count())` | Projection with metrics | Extract + compute + rank | Ranked lists |
| `project().by().by(traversal)` | Projection with nested lookups | Multi-hop property extraction | Tabular reports |
| `project().by().by(coalesce())` | Projection with fallback | Try edge A, else edge B | Optional relationships |

**Source:** KC (Casey) — shared in #group-work for Ken's CCT AI diploma study
**Date:** 2026-05-19
