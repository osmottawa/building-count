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

## Results

```bash
Extent: Gatineau
Past days: 60
Buildings total: 28230
Users:
- [13728] Undearius
- [3626] gfysgerm
- [3151] carpbunker
- [1710] angersmapper
- [1061] DenisCarriere
- [674] ChateauLafayette
- [586] ottawa-address-import-I|lI|IIlI|lIlI
- [568] ottawa-address-import-IlI|lIlII|lI|I
- [568] bourchaerforest
- [567] LogicalViolinist
- [405] mapaylmer
- [301] buckinghammaper
- [264] Rps333
- [203] ssimpkin
- [191] norwaybaymapper
- [179] Timbitmon
- [155] ottawa-address-import-|lIlII|lI|IIlI
- [79] Johnwhelan
- [50] Canada cib
- [45] Hatherous
- [40] markong
- [26] ottawa-address-import-lII|lI|IIlI|lI
- [13] PaulMorel
- [12] eastcoaster
- [8] PenskeMidway
- [4] Bootprint
- [3] amicic
- [3] TekkyOwl
- [2] Lechithen
- [2] tubthumping
- [2] bheesham
- [1] Jay Dalvadi
- [1] KnightK90
- [1] V matthvm
- [1] ptimusk
```