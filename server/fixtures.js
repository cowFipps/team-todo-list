
if(resourcesCollection.find().count() === 0){

  var now = moment().format('l');

  var users = [
    'Leonardo',
    'Donatello',
    'Michelangelo',
    'Master Splinter',
    'Beebop',
    'Rocksteady',
    'Shredder'
  ]

  var raphaelId = resourcesCollection.insert({
    name: 'Raphael'
  });

  for (x = 0; x < users.length; x++) {
    resourcesCollection.insert({
      name: users[x]
    })
  }

  var defaultSprintId = sprintsCollection.insert({
    name: 'Week 50',
    startDate: now,
    endDate: now
  });

  var defaultListId = listsCollection.insert({
    parentSprint: defaultSprintId,
    resourceId: raphaelId,
    resourceName: 'Raphael'
  });

  var defaultItemId1 = itemsCollection.insert({
    parentList: defaultListId,
    body: 'gotta do dis',
    complete: false
  });

  var defaultItemId2 = itemsCollection.insert({
    parentList: defaultListId,
    body: 'gotta do dat',
    complete: false
  });

  var defaultItemId3 = itemsCollection.insert({
    parentList: defaultListId,
    body: 'gotta do all of it',
    complete: true
  });

}
