# Neptune Gremlin: Top Citing Researchers

**Query:** Find top 5 researchers (by total paper count) who cited "Attention Is All You Need".

## Gremlin Pattern

```gremlin
g.V().hasLabel('Paper').has('title', 'Attention Is All You Need')
 .in('cites').hasLabel('Paper')
 .out('wrote').hasLabel('Researcher')
 .dedup()
 .project('researcher', 'paperCount')
   .by('name')
   .by(__.out('wrote').hasLabel('Paper').count())
 .order().by('paperCount', desc)
 .limit(5)
```

## Step-by-Step (Detailed)

| Step | Code | What it does |
|------|------|-------------|
| 1 | `g.V().hasLabel('Paper').has('title', 'Attention Is All You Need')` | Find the specific paper |
| 2 | `.in('cites').hasLabel('Paper')` | Papers that cite it |
| 3 | `.out('wrote').hasLabel('Researcher')` | Researchers who wrote those citing papers |
| 4 | `.dedup()` | Remove duplicates |
| 5 | `.project('researcher', 'paperCount')` | For each researcher, create projection |
| 6 | `.by('name')` | Field 1: their name |
| 7 | `.by(__.out('wrote').hasLabel('Paper').count())` | Field 2: total papers they've written |
| 8 | `.order().by('paperCount', desc)` | Sort by productivity |
| 9 | `.limit(5)` | Top 5 most prolific |

## Edge Direction Assumptions

- `cites`: `citing_Paper` → `cited_Paper`
- `wrote`: `Researcher` → `Paper`

## Important Note

The `.by(__.out('wrote').hasLabel('Paper').count())` in `project()` calculates the researcher's **total paper count** (not just papers citing "Attention Is All You Need"). If you only want to count their citing papers, you'd need a more complex traversal.

## Key Pattern

This is a **citation network + author metrics query**:
1. Start from a landmark paper
2. Find papers that cite it (influence network)
3. Extract authors of citing papers
4. Deduplicate
5. Project with computed metric (total papers per author)
6. Rank and limit

Useful for: "who are the most prolific researchers in this citation neighborhood?", "find influential authors in a subfield", "citation-based author ranking".

## Comparison: Three Query Patterns

| Pattern | Query Type | Key Steps |
|---------|-----------|-----------|
| `where(within('label'))` | Set intersection | Side-effect label + filter |
| `groupCount().where(P.gte(N))` | Frequency threshold | Group + count + threshold |
| `project().by().by(count())` | Projection with metrics | Extract + compute + rank |

**Source:** KC (Casey) — shared in #group-work for Ken's CCT AI diploma study
**Date:** 2026-05-19
