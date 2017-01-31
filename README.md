# Building Count

> Tile Reduce script

## Download QA-Tile

```bash
$ aws s3 cp s3://mapbox/osm-qa-tiles/latest.country/canada.mbtiles.gz canada.mbtiles.gz
$ gzip -d canada.mbtiles.gz
```

## Quickstart

```bash
node index.js
```