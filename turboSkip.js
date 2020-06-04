"system test"


"0 2897288 2858869 2858817 2858192 2857918 2858869 2857917 2857884 2857877 2857517 2857515 2857508 2857506 2857473 2857472 2857463 2857370 2857342 2857329 2857326 2857278 2857275 2857255 2857243 2857181 2857175 2857163 2857151 2857145 2857135 2857130 2857118 2857114 2857085 2857049 2856915 2856862 2856859 2856788 2856677 2856655 2856646 2856583 2856573 2856572 2856534 2856507 2856499 2856498 2856479 2856475 2856457 2856413 2856396 2856359 2856323 2856308 2856128 2855097 2850019 2849983 2848278 2848264 2848222 2848079 2848022 2847946 2847944 2847873 2847872 2847870 2847865 2847852 2847851 2847839 2847835 2847831 2847829 2847808 2847794 2847782 0 2858869 2847758 2847747 2842267 2897583 2897422 2897339 2890476 2898283 2896373 2896371"


var ele = document.getElementById("judgementArea");
				
var addr = document.createElement("div")
addr.innerHTML="<span class='rititle'>Skip Reports:</span><span class=''><input type='text' id='toSkipList' placeholder='Paste IDs here'></input></span><button style='text-algin:center' onclick='massSkip();'>Skip Reports</Button></div><div><span class='rititle'>Auto Skipped Reports:</span><span class=''><span id='reportIds'></span></span>";
ele.appendChild(addr)

var ele2 = document.getElementById("reportInfo");
var ele3 = document.getElementById("reportArea");	
var addr2 = document.createElement("div")
addr2.innerHTML="<span class='rititle'>100 TurdPoSkip:</span><span class=''>&nbsp;<button onclick='togSki();'>Toggle</Button>&nbsp;<span id='skipping'>Not Skipping</span></span></span>";
ele2.appendChild(addr2);
addr2 = document.createElement("div")
addr2.innerHTML="<span class='rititle'>TurdPoLeave:</span><span class=''>&nbsp;<button onclick='loadLeave();'>List all Leavers</Button><br>Please use this feature at your own risk.  It shouldn't display dead leavers but always check just in case.  100 TurdPoSkip is not liable for TR loss as a result of this feature.";
ele2.appendChild(addr2);

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function massSkip() {
var reportIdsToS = document.getElementById("toSkipList").value;


//Ignore everything from bottom down
var reportIdsToS2 = reportIdsToS.replace(/ /g, "&");
var toskip = reportIdsToS2.split("&");


document.getElementById("reportIds").innerHTML = document.getElementById("reportIds").innerHTML


for (i=0;i<toskip.length;i++){
	repid = toskip[i]
	//setCookie("skipped",getCookie("skipped")+ repid + "&",31);
	console.log(repid);
	document.getElementById("reportIds").innerHTML = document.getElementById("reportIds").innerHTML + "&" + +toskip[i]
	$.ajax({
				type: "POST",
				url: "./excludeReport.php",
				data: { rid: toskip[i] },
				dataType: "JSON",
				timeout: 5000,
				success: function(data){
					console.log("Excluded "+toskip[i]);
					
				},
				error: function(x, t, m){
					console.log("Failed excluding "+toskip[i]);
				}
			});
			
document.getElementById("toSkipList").value = 0;
}}
function togSki() {
	if (document.getElementById("skipping").innerHTML=="Skipping"){
		document.getElementById("skipping").innerHTML="Not Skipping"
	} else {
		document.getElementById("skipping").innerHTML="Skipping"
	}
		
}

function skipReport(){
	if (document.getElementById("skipping").innerHTML=="Skipping") {
repid = document.getElementsByClassName("reportId")[0].innerHTML;
document.getElementById("reportIds").innerHTML = document.getElementById("reportIds").innerHTML + "&" + repid
//setCookie("skipped",getCookie("skipped")+ repid + "&",31);
Trial.excludeReport(repid,true,function(){
			$('#skipperlink').blur();
			// reset html values including filter
			$('.filterBody > .filterOption').remove();
			$('#highlighter').css('opacity','').hide();
			$('.reportId').html("--");
			$('.reportedPlayer').html("--");
			$('.numReports').html("--");
			$('.reportDate').html("--");
			$('.reportReason').html("--");
			$('.reportDescription').html("--");
			$('#reportContent').html("--");
			$('#dupLocation').val("");
			$('#dupReason').val("");
			$('#orlist').find("li:first-child").html("--");
			$('#orlist').find("li:not(:first-child)").remove();
			startLoadingSequence(true);
				window.setTimeout(skipReport,2000);
		});
	} else{
	window.setTimeout(skipReport,2000);	}
}
	//document.getElementById("toSkipList").value = getCookie("skipped");
	//massSkip();

function containsIn(ele,arr){
	for (i=0;i<arr.length;i++){
		if (ele==arr[i]){
			return true;
		}
	}return false;
}
	
function autoDupe(drid,dp,dr,dd) {
	//var drid = $('#dupReportID').val();
	//var dp = $('#dupPlayer').val();
	//var dr = $('#dupReason').val();
	//var dd = $('#dupLocation').val();
	Trial.duplicateReport(drid,dp,dr,dd);
}	

function processIGNstuff(data,ign) {
	var players = data.players
	for ( i=0;i<players.length;i++){
		console.log(players[i].username);
		if (players[i].ign==ign) {
			var ele2 = document.getElementById("reportInfo");
			var addr2 = document.createElement("div")
			addr2.className="turdLeav"
			addr2.innerHTML="<span class='rititle'><button onclick=\"autoDupe('"+ document.getElementsByClassName("reportId")[0].innerHTML+"','"+players[i].username+"',7,'Busted with 100 TurdPoSkip')\">Dupe for Leaving</button></span><span class=''>"+players[i].username+"</span>";
		ele2.appendChild(addr2);
			return players[i].username;
		}
	}return false;
}

function getPlayerByIGN(ign) {
	  $.ajax({
				type: "POST",
				url: "./loadingStages.php",
				data: { step: 3, input: document.getElementsByClassName("reportId")[0].innerHTML },
				dataType: "JSON",
				timeout: 10000,
				success: function(data){
					if(data !== false){
						return processIGNstuff(data,ign)
					}else{
						Modal.open("There was an error loading the report. Please refresh or try again later.");
					}
				},
				error: function(x, t, m){
					Modal.open("There was an error loading the report. Please refresh or try again later.");
				}
			});
}

function loadLeave(){
	var content = document.getElementById("reportContent").children;
	console.log("Displaying Leavers")
	var existing = document.getElementsByClassName('turdLeav');
	
	for (i=0;i<existing.length;i++){
		existing[i].remove();
	}
	var dead = [];
	var leavers = [];
	for (i=0;i<content.length;i++) {
		if (content[i].className.indexOf('notice')>=0) {
			var str = content[i].innerHTML
			var pos = str.indexOf(" has left the game.");
			if (pos >= 0) {
				str = str.replace(" has left the game.","");
				if (!dead.includes(str)){
					console.log(getPlayerByIGN(str));
				}
				continue;
			}
			pos = str.indexOf(" has been killed.");
			if (pos >= 0) {
				str = str.replace(" has been killed.","");
				console.log("kils")
				dead.push(str);
				continue;
			}
			pos = str.indexOf(" has been lynched.");
			if (pos >= 0) {
				str = str.replace(" has been lynched.","");
				dead.push(str);
				continue;
			}
		}
	}
	  
  


	
			
}
	

window.setTimeout(skipReport,2000);