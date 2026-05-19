# Neptune Gremlin: 2020 Conference Papers by Acceptance Rate

**Query:** Find papers from 2020 conferences, projected with title, conference name, city, and acceptance rate — sorted by acceptance rate ascending (lowest first), limit 5.

## Gremlin Pattern

```gremlin
g.V().hasLabel('Conference').has('year', 2020)
 .in('presentedAt').hasLabel('Paper')
 .project('title', 'conference', 'city', 'acceptanceRate')
   .by('title')
   .by(__.out('presentedAt').values('name'))
   .by(__.out('presentedAt').out('locatedIn').values('name'))
   .by(__.out('presentedAt').values('acceptanceRate'))
 .order().by('acceptanceRate', asc)
 .limit(5)
```

## Step-by-Step (Detailed)

| Step | Code | What it does |
|------|------|-------------|
| 1 | `g.V().hasLabel('Conference').has('year', 2020)` | Find 2020 conferences |
| 2 | `.in('presentedAt').hasLabel('Paper')` | Papers presented at those conferences |
| 3 | `.project('title', 'conference', 'city', 'acceptanceRate')` | For each paper, create 4-field projection |
| 4 | `.by('title')` | Field 1: paper title |
| 5 | `.by(__.out('presentedAt').values('name'))` | Field 2: conference name |
| 6 | `.by(__.out('presentedAt').out('locatedIn').values('name'))` | Field 3: city where conference was held |
| 7 | `.by(__.out('presentedAt').values('acceptanceRate'))` | Field 4: conference acceptance rate |
| 8 | `.order().by('acceptanceRate', asc)` | Sort by acceptance rate ascending (hardest first) |
| 9 | `.limit(5)` | Top 5 most selective |

## Edge Direction Assumptions

- `presentedAt`: `Paper` → `Conference`
- `locatedIn`: `Conference` → `City`

## Important Notes

**Nested traversals in `project().by()`:**
The `.by(__.out('presentedAt')...)` patterns assume Neptune supports nested traversals in `project()`. If not, you may need to use `.as()` / `.select()` or `.choose()` patterns instead.

**Acceptance rate semantics:**
If acceptance rate is stored on the Conference vertex and "hardest" means lowest acceptance rate (most selective), `asc` is correct. If "hardest" means highest rejection rate, the query is still correct since lower acceptance rate = higher rejection rate.

## Key Pattern

This is a **projection with nested traversal query**:
1. Start from one vertex type (Conference)
2. Traverse to related vertices (Paper)
3. Project multiple fields, some requiring nested traversals back to the origin
4. Sort by a projected field
5. Limit results

Useful for: "tabular reports from graph data", "flattening graph into structured output", "multi-hop property extraction".

## Comparison: Four Query Patterns

| Pattern | Query Type | Key Steps | Use Case |
|---------|-----------|-----------|----------|
| `where(within('label'))` | Set intersection | Side-effect label + filter | A AND B |
| `groupCount().where(P.gte(N))` | Frequency threshold | Group + count + threshold | N+ occurrences |
| `project().by().by(count())` | Projection with metrics | Extract + compute + rank | Ranked lists |
| `project().by().by(traversal)` | Projection with nested lookups | Multi-hop property extraction | Tabular reports |

## Note on `.out('presentedAt')`

In the `.project()` step, `.by(__.out('presentedAt').values('name'))` traverses **from the Paper back to the Conference** to get the conference name. This works because:
- The Paper has an outgoing `presentedAt` edge to its Conference
- We're at the Paper vertex during projection
- We follow that edge back to get conference properties

This is a common pattern: traverse in one direction to find entities, then project by traversing back to get related properties.

**Source:** KC (Casey) — shared in #group-work for Ken's CCT AI diploma study
**Date:** 2026-05-19
