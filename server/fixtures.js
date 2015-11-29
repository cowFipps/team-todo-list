
if(resourcesCollection.find().count() === 0){

  var users = [
    'Raphael',
    'Leonardo',
    'Donatello',
    'Michelangelo',
    'Master Splinter',
    'Beebop',
    'Rocksteady',
    'Shredder'
  ]

  for (x = 0; x < users.length; x++) {
    resourcesCollection.insert({
      name: users[x]
    })
  }
}
