# Bean Data Model

The canonical shape of a bean record in Coffee App.

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Unique identifier |
| `species` | string | `"Arabica"` or `"Robusta"` |
| `country` | string | Country of origin |
| `region` | string | Growing region within the country |
| `farm` | string | Farm or estate name |
| `producer` | string | Producer or cooperative |
| `variety` | string | Coffee variety (e.g., Bourbon, Typica, Gesha) |
| `processing_method` | string | How the cherry was processed (Washed, Natural, Honey, etc.) |
| `altitude_meters` | number \| null | Growing altitude in meters above sea level |
| `harvest_year` | string | Year of harvest |
| `color` | string | Green bean color grade |
| `scores` | object | SCA cupping scores (see below) |
| `scores.aroma` | number | Aroma score (0–10) |
| `scores.flavor` | number | Flavor score (0–10) |
| `scores.aftertaste` | number | Aftertaste score (0–10) |
| `scores.acidity` | number | Acidity score (0–10) |
| `scores.body` | number | Body score (0–10) |
| `scores.balance` | number | Balance score (0–10) |
| `scores.uniformity` | number | Uniformity score (0–10) |
| `scores.clean_cup` | number | Clean cup score (0–10) |
| `scores.sweetness` | number | Sweetness score (0–10) |
| `scores.cupper_points` | number | Cupper's points (0–10) |
| `scores.total` | number | Total cup points (0–100) |
| `moisture` | number | Moisture percentage |
| `defects.category_one` | number | Count of category-one defects |
| `defects.category_two` | number | Count of category-two defects |

## Scoring Reference

- **90+** — Outstanding / Specialty Grade (top tier)
- **85–89.99** — Excellent / Specialty Grade
- **80–84.99** — Very Good / Specialty Grade
- **Below 80** — Below specialty grade

## Data Sources

- **beans.json** — Full dataset of 1,338 beans from the Coffee Quality Institute (CQI), sorted by total score descending. Source: [jldbc/coffee-quality-database](https://github.com/jldbc/coffee-quality-database) (MIT License).
- **flavor_taxonomy.json** — Hierarchical flavor vocabulary based on the SCA Flavor Wheel and WCR Sensory Lexicon. 9 top-level categories, 110+ descriptors.
- **beans_curated.json** — Hand-picked selection of 20 standout beans for prototyping and demos.
