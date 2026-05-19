# Neptune Gremlin: AlexNet Yearly Citation Counts

**Query:** Get yearly citation counts for "ImageNet Classification with Deep Convolutional Neural Networks" (AlexNet) from 2013-2017.

## Gremlin Pattern

```gremlin
g.V().hasLabel('Paper').has('title', 'ImageNet Classification with Deep Convolutional Neural Networks')
 .as('alexnet')
 .union(
   __.select('alexnet').project('year', 'citations').by(constant(2013)).by(__.select('alexnet').in('cites').has('year', 2013).count()),
   __.select('alexnet').project('year', 'citations').by(constant(2014)).by(__.select('alexnet').in('cites').has('year', 2014).count()),
   __.select('alexnet').project('year', 'citations').by(constant(2015)).by(__.select('alexnet').in('cites').has('year', 2015).count()),
   __.select('alexnet').project('year', 'citations').by(constant(2016)).by(__.select('alexnet').in('cites').has('year', 2016).count()),
   __.select('alexnet').project('year', 'citations').by(constant(2017)).by(__.select('alexnet').in('cites').has('year', 2017).count())
 )
 .order().by('year')
```

## Step-by-Step (Detailed)

| Step | Code | What it does |
|------|------|-------------|
| 1 | `g.V().hasLabel('Paper').has('title', 'ImageNet Classification with Deep Convolutional Neural Networks')` | Find AlexNet paper |
| 2 | `.as('alexnet')` | Store as side-effect label |
| 3 | `.union(...)` | Combine multiple independent traversals |
| 4 | `__.select('alexnet').project('year', 'citations')` | For each year, create projection |
| 5 | `.by(constant(2013))` | Field 1: year constant |
| 6 | `.by(__.select('alexnet').in('cites').has('year', 2013).count())` | Field 2: count citations from that year |
| 7 | Repeat 4-6 for 2014-2017 | |
| 8 | `.order().by('year')` | Sort by year ascending |

## Edge Direction Assumptions

- `cites`: `Paper` → `Paper` (citing paper → cited paper)
  - So `.in('cites')` means "papers that cite this one"

## Important Notes

**`.as('alexnet')` + `.select('alexnet')` pattern:**
The side-effect label allows the original vertex to be referenced multiple times within the `union()`. Without this, each branch of the union would need to re-find the AlexNet paper from scratch.

**`.constant()` for year values:**
Since the year isn't a property of the AlexNet paper itself, we inject it as a constant. This creates a synthetic column for the time-series output.

**Verbose but reliable:**
This is verbose but reliable in Neptune. If you need a more compact version and your Neptune engine supports `inject()` with `math()` or `local()` scopes, let me know and I can optimize further.

**Alternative: `group().by('year').by(count())`**
If the citing papers have a `year` property, a more elegant approach might be:
```gremlin
g.V().hasLabel('Paper').has('title', 'AlexNet')
 .in('cites').hasLabel('Paper')
 .group().by('year').by(count())
```
But this only works if all citing papers have the `year` property indexed and you want all years. The `union()` approach gives explicit control over which years to include.

## Key Pattern

This is a **time-series aggregation query**:
1. Start from a landmark paper
2. Store as side-effect label (for repeated reference)
3. Use `union()` to run multiple independent queries
4. Each query: project a year constant + citation count for that year
5. Combine and sort

Useful for: "yearly citation trends", "time-series metrics from graph", "longitudinal analysis".

## Comparison: Seven Query Patterns

| Pattern | Query Type | Key Steps | Use Case |
|---------|-----------|-----------|----------|
| `where(within('label'))` | Set intersection | Side-effect label + filter | A AND B |
| `groupCount().where(P.gte(N))` | Frequency threshold | Group + count + threshold | N+ occurrences |
| `project().by().by(count())` | Projection with metrics | Extract + compute + rank | Ranked lists |
| `project().by().by(traversal)` | Projection with nested lookups | Multi-hop property extraction | Tabular reports |
| `project().by().by(coalesce())` | Projection with fallback | Try edge A, else edge B | Optional relationships |
| `in().in().dedup().count()` | Multi-hop reach | Traverse N hops + dedup + count | Network reach |
| `union().project().by(constant())` | Time-series | Side-effect + union + constant | Yearly trends |

**Source:** KC (Casey) — shared in #group-work for Ken's CCT AI diploma study
**Date:** 2026-05-19
