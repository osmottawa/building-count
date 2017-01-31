const days = 60
module.exports = (data, tile, writeData, done) => {
  const features = []
  for (const feature of data.qatiles.osm.features) {
    if (!(Number(feature.properties['@timestamp']) > Date.now() / 1000 - days * 24 * 60 * 60)) { continue }
    // if (feature.properties['@user'] !== 'DenisCarriere') { continue }
    if (!feature.properties.building) { continue }
    features.push(feature)
  }
  done(null, features)
}
