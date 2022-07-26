
const URLLoadAverage = "https://ceclnx01.cec.miamioh.edu/~johnsok9/cse383/ajax/index.php/vi/api/loadavg";
const URLRoot = "https://ceclnx01.cec.miamioh.edu/~johnsok9/cse383/ajax/index.php/vi/api/ps";
const URLNetwork = "https://ceclnx01.cec.miamioh.edu/~johnsok9/cse383/ajax/index.php/vi/api/network";

// Run functions
getRootP();
getLoadAverage();
getNetwork();

var errorCounter = 0;
var rootPCount = 0;
var loadAvgCount = 0;
var networkCount = 0;

function getRootP() {
	
	//------Stating the disk file system------// 

	a=$.ajax({
		url: URLRoot ,
		method: "GET"
	}).done(function(data) {
		// clear out old data
		$("#rootProcess").html("");
		$("#rootPRun").html(++rootPCount);
		let len = data.ps.length;
		for (i=0;i<len;i++) {
			$("#rootProcess").append("<tr><th>" + data.ps[i].user
						+ "</th><th>" + data.ps[i].pid
						+ "</th><th>" + data.ps[i].ppid
						+ "</th><th>" + data.ps[i].startTime						
						+ "</th><th>" + data.ps[i].ttid
						+ "</th><th>" + data.ps[i].runTime
						+ "</th><th>" + data.ps[i].cmd
						+ "</th></tr>");
		}
		setTimeout(getRootP,1000);
	}).fail(function(error) {
		errorCounter++;
		$("#logRun").html(errorCounter);
		$("#log").html("");
		console.log("error",error.statusText);
		$("#log").prepend("root processes error "+new Date()+"<br>");
		
		setTimeout(getRootP,1000);
	});
}

function getLoadAverage() {
	
	//------Stating the load average------// 

	a=$.ajax({
		url: URLLoadAverage,
		method: "GET"
	}).done(function(data) {
		$("#onemin").html("");
		$("#fivemin").html("");
		$("#fifteenmin").html("");
		$("#numRunning").html("");
		$("#ttlProc").html("");
		$("#loadAverageRun").html(++loadAvgCount);
		$("#onemin").append(data.loadavg.OneMinAvg);
		$("#fivemin").append(data.loadavg.FiveMinAvg);
		$("#fifteenmin").append(data.loadavg.FifteenMinAvg);
		$("#numRunning").append(data.loadavg.NumRunning);
		$("#ttlProc").append(data.loadavg.TtlProcesses);

		setTimeout(getLoadAverage,1000);

	}).fail(function(error) {
		errorCounter++;
		$("#logRun").html(errorCounter);
		$("#log").html("");
		console.log("error",error.statusText);
		$("#log").prepend("loadaverage error "+new Date()+"<br>");
		
		setTimeout(getLoadAverage,1000);
	});
}


function getNetwork() {
	
	//------Stating the load average------// 

	a=$.ajax({
		url: URLNetwork,
		method: "GET"
	}).done(function(data) {
		$("#txbytes").html("");
		$("#rxbytes").html("");
		$("#networkRun").html(++networkCount);
		$("#txbytes").append(data.network.rxbytes);
		$("#rxbytes").append(data.network.txbytes);
		setTimeout(getNetwork,1000);

	}).fail(function(error) {
		errorCounter++;
		$("#logRun").html(errorCounter);
		$("#log").html("");
		console.log("error",error.statusText);
		$("#log").prepend("network error "+new Date()+"<br>");
		
		setTimeout(getNetwork,1000);
	});
}



