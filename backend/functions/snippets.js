async function formatData(string) {
  var iniziale = string[0].toUpperCase()
  var restoFrase = ""
  var data = ""

  for (i = 1; i < string.length; i++) {
    restoFrase += string[i].toLowerCase()
  }

  data = iniziale + "" + restoFrase

  return data
}

module.exports = { formatData }