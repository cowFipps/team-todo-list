
if(resourcesCollection.find().count() === 0){

  var now = new Date();
  var inFiveDays = new Date();
  inFiveDays.setDate(inFiveDays.getDate() + 5);

  Date.prototype.getWeek = function() {
    var determinedate = new Date();
    determinedate.setFullYear(this.getFullYear(), this.getMonth(), this.getDate());
    var D = determinedate.getDay();
    if(D == 0) D = 7;
    determinedate.setDate(determinedate.getDate() + (4 - D));
    var YN = determinedate.getFullYear();
    var ZBDoCY = Math.floor((determinedate.getTime() - new Date(YN, 0, 1, -6)) / 86400000);
    var WN = 1 + Math.floor(ZBDoCY / 7);
    return WN;
  }

  Date.prototype.getMonday = function() {
    d = new Date();
    var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  var weekNum = now.getWeek();
  var nextMonday = now.getMonday();

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
    name: 'Raphael',
    resourceImage: 'images/yuna.jpg'
  });

  for (x = 0; x < users.length; x++) {
    resourcesCollection.insert({
      name: users[x],
      resourceImage: 'images/yuna.jpg'
    })
  }

  var firstDay = new Date("December 7, 2015");

  var defaultSprintId = sprintsCollection.insert({
    weekNumber: weekNum,
    startDate: firstDay,
    endDate: new Date(firstDay.getTime() + 5 * 24 * 60 * 60 * 1000)
  });

  sprintsCollection.insert({
    weekNumber: weekNum + 1,
    startDate: new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(firstDay.getTime() + 12 * 24 * 60 * 60 * 1000)
  });

  sprintsCollection.insert({
    weekNumber: weekNum + 2,
    startDate: new Date(firstDay.getTime() + 14 * 24 * 60 * 60 * 1000),
    endDate: new Date(firstDay.getTime() + 19 * 24 * 60 * 60 * 1000)
  });

  // for(x=1; x <= 2; x++){
  //
  //   var startDay = now.getMonday();
  //   startDay.setDate(startDay.getDate() + x*7);
  //   var endDay = new Date();
  //   endDay.setDate(startDay.getDate() + 5);
  //
  //   sprintsCollection.insert({
  //     weekNumber: startDay.getWeek(),
  //     startDate: startDay,
  //     endDate: endDay,
  //   });
  //
  // }

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
