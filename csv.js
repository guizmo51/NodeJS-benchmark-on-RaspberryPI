var controls = new Array();
var runners = new Array();
controls['M16']=[
					['31','46']
				];

function timetoms(time){
		
	
		
		var parse=time.split(":");
	var length = parse.length;
	
	if(length<=1){
		var s=parse[0];
		var m=0;
		var h=0;
		
	}
	else if(length==2){
		var s=parse[1];
		var m=parse[0];
		var h=0;
		
	}
	else if(length==3){
		var s=parse[2];
		var m=parse[1];
		var h=parse[0];
		
	}
	
	return ((((parseInt(h)*60)+(parseInt(m)))*60)+parseInt(s))*1000;
		
	
	
	
	
	
}
	
	//for(var x in controls['M16']){

  	//	console.log(controls['M16'][x]);
  //	}

var fs = require('fs');
var runner={};


var csv = require('csv');
csv()
.from.stream(fs.createReadStream('M16.csv'), {delimiter: ';'})
.to(console.log)
.transform( function(row,index){
  runner.id=row[2];
  runner.name=row[3]+" "+row[4];
  runner.club=row[14];
  runner.classe=row[18];
  runner.startTime=row[9];
  runner.classification=row[12];
  runner.racetime=timetoms(row[11]);
  
  var run_controls=new Array();

  for(var x in controls['M16']){

  		var str=row[controls['M16'][x][1]];
  		
  		run_controls[controls['M16'][x][0]]=timetoms(row[controls['M16'][x][1]]);
  }
  
  console.log(run_controls);
  runner.splitTimes=run_controls;
  run_controls=[];
  runners.push(runner);
  
  
  }).on('end', function(count){
  // when writing to a file, use the 'close' event
  // the 'end' event may fire before the file has been written

  console.log(runners.length);

  fs.writeFile("M16.json", JSON.stringify(runners), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
}); 
});