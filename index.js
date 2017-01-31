const tileReduce = require('tile-reduce')
const path = require('path')
const turf = require('@turf/turf')
const fs = require('fs')

const city = 'Gatineau'
const days = 60
const collection = turf.featureCollection([])
const users = {}

function read (filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'))
}

tileReduce({
  geojson: read(`./extents/${city}.geojson`),
  zoom: 12,
  map: path.join(__dirname, 'building.js'),
  sources: [{name: 'qatiles', mbtiles: 'canada.mbtiles'}],
  mapOptions: {
    days
  }
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
  console.log('Extent: ' + city)
  console.log('Past days: 60')
  console.log('Buildings total: %d', collection.features.length)
  console.log('Users:')
  const sorted = Object.keys(users).sort((a, b) => users[a] - users[b]).reverse()
  sorted.map(user => console.log(`- [${users[user]}] ${user}`))
  fs.writeFileSync('results.geojson', JSON.stringify(collection, null, 2))
})
