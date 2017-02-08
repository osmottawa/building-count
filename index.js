const tileReduce = require('tile-reduce')
const path = require('path')
const turf = require('@turf/turf')
const write = require('write-json-file')
const load = require('load-json-file')

const city = 'Ottawa'
const days = 90
const users = []
const results = turf.featureCollection([])
const edits = {}
const extent = load.sync(`./extents/${city}.geojson`)

tileReduce({
  geojson: extent,
  zoom: 12,
  map: path.join(__dirname, 'building.js'),
  sources: [{name: 'qatiles', mbtiles: 'canada.mbtiles'}],
  mapOptions: {
    days,
    extent,
    users
  }
})
.on('reduce', (features) => {
  features.map(feature => {
    results.features.push(feature)

    // Store User information
    const user = feature.properties['@user']
    if (edits[user] === undefined) {
      edits[user] = 1
    } else {
      edits[user] = 1 + edits[user]
    }
  })
})
.on('end', () => {
  console.log('Extent: ' + city)
  console.log('Past days: 60')
  console.log('Buildings total: %d', results.features.length)
  console.log('Users:')
  const sorted = Object.keys(edits).sort((a, b) => edits[a] - edits[b]).reverse()
  sorted.map(user => console.log(`- [${edits[user]}] ${user}`))
  write.sync('results.geojson', results)
})
