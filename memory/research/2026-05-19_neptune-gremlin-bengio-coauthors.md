# Neptune Gremlin: Bengio Co-Authors (3+ Papers)

**Query:** Find researchers who co-authored at least 3 papers with Yoshua Bengio.

## Gremlin Pattern

```gremlin
g.V().hasLabel('Researcher').has('name', 'Yoshua Bengio')
 .out('wrote').hasLabel('Paper')
 .in('wrote').hasLabel('Researcher')
 .where(neq('Yoshua Bengio'))
 .groupCount()
 .unfold()
 .where(select(values).is(P.gte(3)))
 .select(keys)
 .values('name')
```

## Full Step-by-Step (Detailed)

| Step | Code | What it does |
|------|------|-------------|
| 1 | `g.V().hasLabel('Researcher').has('name', 'Yoshua Bengio')` | Find Yoshua Bengio |
| 2 | `.out('wrote').hasLabel('Paper')` | Papers he wrote |
| 3 | `.in('wrote').hasLabel('Researcher')` | Co-authors of those papers |
| 4 | `.where(neq('Yoshua Bengio'))` | Exclude himself |
| 5 | `.groupCount()` | Count co-authorship frequency |
| 6 | `.unfold()` | Unfold the map entries |
| 7 | `.where(select(values).is(P.gte(3)))` | Filter to ≥3 collaborations |
| 8 | `.select(keys)` | Get researcher vertices |
| 9 | `.values('name')` | Return their names |

## Edge Direction Assumptions

- `wrote`: `Researcher` → `Paper`

## Key Pattern

This is a **frequency-filtered co-occurrence query**:
1. Start from a known vertex
2. Traverse to related entities
3. Traverse back to peer entities
4. Group and count
5. Filter by threshold
6. Return results

Useful for: "find collaborators with strong ties", "frequent co-occurrence analysis", "graph-based recommendation".

## Comparison: Intersection vs Frequency

| Pattern | Use Case |
|---------|----------|
| `where(within('label'))` | Set intersection (A AND B) |
| `groupCount().where(P.gte(N))` | Frequency threshold (N+ occurrences) |

**Source:** KC (Casey) — shared in #group-work for Ken's CCT AI diploma study
**Date:** 2026-05-19
