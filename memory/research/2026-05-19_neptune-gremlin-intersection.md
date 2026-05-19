# Neptune Gremlin: Google + DeepMind Conference Intersection

**Query:** Find conferences where both Google and DeepMind researchers presented papers.

## Gremlin Pattern

```groovy
g.V()
  .hasLabel('Researcher').has('institution', 'Google')
  .out('wrote').out('presentedAt')
  .as('googleConferences')
  
  .V().hasLabel('Researcher').has('institution', 'DeepMind')
  .out('wrote').out('presentedAt')
  .where(within('googleConferences'))
  
  .dedup().values('name')
```

## Step-by-Step

| Step | Code | What it does |
|------|------|-------------|
| 1 | `g.V().hasLabel('Researcher').has('institution', 'Google')` | Find all Google researchers |
| 2 | `.out('wrote').out('presentedAt')` | Traverse to conferences via their papers |
| 3 | `.as('googleConferences')` | Store as side-effect label (set of conferences) |
| 4 | `V().hasLabel('Researcher').has('institution', 'DeepMind')` | Find all DeepMind researchers |
| 5 | `.out('wrote').out('presentedAt')` | Traverse to conferences via their papers |
| 6 | `.where(within('googleConferences'))` | Keep only conferences also in Google set |
| 7 | `.dedup().values('name')` | Return unique conference names |

## Edge Direction Assumptions

- `wrote`: `Researcher` → `Paper`
- `presentedAt`: `Paper` → `Conference`

## Notes

- Neptune Gremlin supports `where(within('label'))` for side-effect filtering
- Alternative if unsupported: use `intersect()` or `fold()/unfold()` pattern
- This is a set intersection pattern — useful for any "find X where both A and B" graph queries

**Source:** KC (Casey) — shared in #group-work for Ken's CCT AI diploma study
**Date:** 2026-05-19
