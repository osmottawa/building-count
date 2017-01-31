const tileReduce = require('tile-reduce')
const path = require('path')
const turf = require('@turf/turf')

const ottawa = require('./extents/gatineau.json')
const collection = turf.featureCollection([])
const users = {}

tileReduce({
  geojson: ottawa,
  zoom: 12,
  map: path.join(__dirname, 'building.js'),
  sources: [{name: 'qatiles', mbtiles: 'canada.mbtiles'}]
})
.on('reduce', (features) => {
  features.map(feature => {
    collection.features.push(feature)
    const user = feature.properties['@user']
    if (users[user] === undefined) {
      users[user] = 1
    } else {
      users[user] = 1 + users[user]
    }
  })
})
.on('end', () => {
  console.log('Extent: Gatineau')
  console.log('Past days: 60')
  console.log('Buildings total: %d', collection.features.length)
  console.log('Users:')
  const sorted = Object.keys(users).sort((a, b) => users[a] - users[b]).reverse()
  sorted.map(user => console.log(`- [${users[user]}] ${user}`))
})
