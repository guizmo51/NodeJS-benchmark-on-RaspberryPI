var fs = require('fs');
var wd = require('watchdirectory');

 
 var unwatch = wd.watchDirectory('csv_files', {filter:'.csv'}, function (filename, curr, prev, change) {
    if (change == 'initial') {
      // filename found during initial pass
      console.log("initial");
    }
    else if (change == 'created') {
      // filename is a new file
       console.log("created"+filename);
    }
    else if (change == 'deleted') {
      // filename was removed
      console.log("delete"+filename);
    }
    else if (change == 'modified') {
      // filename was changed
      console.log("modified "+filename+" ");
    }
  });