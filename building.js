const turf = require('@turf/turf')

const days = global.mapOptions.days
const extent = global.mapOptions.extent
const users = global.mapOptions.users

module.exports = (data, tile, writeData, done) => {
  const features = []
  for (const feature of data.qatiles.osm.features) {
    if (feature.geometry.type === 'Polygon') {
      // Filter by Date
      if (!(Number(feature.properties['@timestamp']) > Date.now() / 1000 - days * 24 * 60 * 60)) { continue }

      // Only find buildings
      if (!feature.properties.building) { continue }

      // Filter by Usernames
      if (users.length) { if (users.indexOf(feature.properties['@user']) === -1) { continue } }

      // Must intersect within extent
      if (turf.intersect(feature, extent)) {
        features.push(feature)
      }
    }
  }
  done(null, features)
}
