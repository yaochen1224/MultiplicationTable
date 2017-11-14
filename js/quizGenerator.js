function mathquizMain(op, rMin, rMax, cMin, cMax) {
	this.version = '0.91';
	this.op = typeof op !== 'undefined' ? op : 'x';
	this.rMin = typeof rMin !== 'undefined' ? rMin : 2;
	this.rMax = typeof rMax !== 'undefined' ? rMax : 10;
	this.cMin = typeof cMin !== 'undefined' ? cMin : 2;
	this.cMax = typeof cMax !== 'undefined' ? cMax : 10;
	if ((this.rMax - this.rMin + 1) * (this.cMax - this.cMin + 1) < 8) {
		this.rMin = 2;
		this.rMax = 10;
		this.cMin = 2;
		this.cMax = 10;
	}
	w = 360;
	h = 460;
	var s = "";
	s += '<div style="position:relative; width:' + w + 'px; height:' + h + 'px; border-radius: 10px;  margin:auto; display:block; background-color: #fff; ">';
	s += '<div style="height: 20px;"></div>';
	s += '<div id="quests" style="text-align: center;">';
	s += '</div>';
	s += '<div style="height: 20px;"></div>';
	s += '<div id="result" style="font: bold 30px Arial; text-align: center; color: gold; ">';
	s += '</div>';
	s += '<input onclick="check()" type="button" style="z-index:2; position:absolute; right:20px; top:245px;" value="OK, Done"  class="togglebtn" />';
	s += '<input onclick="restart()" type="button" style="z-index:2; position:absolute; right:3px; bottom:3px;" value="Another"  class="togglebtn" />';
	s += '<div id="copyrt" style="font: bold 10px Arial; color: #6600cc; position:absolute; left:5px; bottom:3px;">&copy; 2015 MathsIsFun.com  v' + this.version + '</div>';
	s += '</div>';
	document.write(s);
	this.qArr = [];
	this.msgArr = [
		["Excellent %1!!", "You are a Master at this %1!", "Very Well Done %1!"],
		["Great!", "That's really good %1", "Well Done %1"],
		["You are getting there %1 ...", "You got some right %1 ...", "Try for more %1"],
		["You need more practice %1", "Keep on trying %1 ...", "Have another go %1"],
		["You didn't try ANY %1"],
		["You could try more %1"]
	];
	NumAns = 8;
	init();
}

function init() {
	this.qArr = [];
	for (var i = this.rMin; i <= this.rMax; i++) {
		for (var j = this.cMin; j <= this.cMax; j++) {
			this.qArr.push([i, j]);
		}
	}
	arrShuffle(this.qArr);
	var s = '';
	var wds = [20, 100, 100, 120];
	var quest = "what?";
	var v = "?";
	for (i = 0; i < NumAns; i++) {
		var ans = this.qArr[i][0] * this.qArr[i][1];
		quest = this.qArr[i][0] + ' &times; ' + this.qArr[i][1] + ' = ';
		var wrongcount = 9;
		var wrong = [];
		wrong[0] = ans + Math.round(Math.random() * (9 - 2) + 2);
		wrong[1] = ans - Math.round(Math.random() * (9 - 2) + 2);
		wrong[2] = ans + 1;
		wrong[3] = ans - 1;
		wrong[4] = ans + 10;
		wrong[5] = ans - 10;
		wrong[6] = ans + 20;
		wrong[7] = ans + 2;
		wrong[8] = ans + 3;
		var answers = [];
		answers[0] = "?";
		for (var j = 1; j < 5; j++) {
			do {
				var wrongno = Math.round(Math.random() * (wrongcount - 1));
			} while (wrong[wrongno] == "(done)" || wrong[wrongno] <= 0);
			answers[j] = wrong[wrongno];
			wrong[wrongno] = "(done)"
		}
		var anspos = 1 + Math.round(Math.random() * 3);
		answers[anspos] = ans;
		s += '<div style="text-align: left; height: 33px;">';
		s += '<div style="width:' + wds[0] + 'px; display: inline-block;"></div>';
		s += '<div style="width:' + wds[1] + 'px; display: inline-block; font: 18px Arial; text-align: right;">' + quest + '</div>';
		s += '<div style="width:' + wds[2] + 'px; display: inline-block; font: 18px Arial; text-align: center;">';
		s += getDropdownHTML(answers, 'ans' + i);
		s += '</div>';
		s += '<img src="../images/style/yes.gif" id="yes' + i + '" height="21" style="height:25px; vertical-align: middle; opacity: 0;" />';
		s += '</div>';
	}
	document.getElementById('quests').innerHTML = s;
	document.getElementById('result').innerHTML = '';
}

function chosen() {}

function check() {
	var tried = 0;
	var yesCount = 0;
	for (var i = 0; i < NumAns; i++) {
		div = document.getElementById('ans' + i);
		var a = div.value;
		var ans = qArr[i][0] * qArr[i][1];
		if (a == '?') {} else {
			tried++;
		}
		div = document.getElementById('yes' + i);
		if (a == ans) {
			div.style.opacity = 1;
			yesCount++;
		} else {
			div.style.opacity = 0;
		}
	}
	var s = '';
	if (tried > 0) {
		var scorepct = Math.round(yesCount * 100 / tried);
		if (tried == 1) {
			var msgNo = 5;
			var exclam = "";
		} else {
			if (scorepct >= 75) {
				msgNo = 0;
				exclam = "!";
			} else if (scorepct >= 55) {
				msgNo = 1;
				exclam = "!";
			} else if (scorepct >= 25) {
				msgNo = 2;
				exclam = "";
			} else {
				msgNo = 3;
				exclam = "";
			}
		}
		s += '<div style="font: bold 20px Arial; color: darkblue;">You got ' + scorepct + '% right ' + exclam + '</div>';
		s += '<div style="font: italic 18px Arial; color: seagreen; margin: 10px 0 10px 0;">You did ' + tried + ' of the ' + NumAns + ' questions, <br> and got ' + yesCount + ' right</div>';
	} else {
		msgNo = 4;
	}
	msg = this.msgArr[msgNo][getRandomInt(0, this.msgArr[msgNo].length - 1)];
	msg = msg.replace('%1', '');
	s += '<div style="font: bold 20px Arial; color: blue;">' + msg + '</div>';
	document.getElementById('result').innerHTML = s;
}

function arrShuffle(arr) {
	var len = arr.length;
	var temp, rand;
	for (var i = 0; i < len; i++) {
		rand = Math.floor(Math.random() * len);
		temp = arr[i];
		arr[i] = arr[rand];
		arr[rand] = temp;
	}
}

function restart() {
	this.aCount = 2;
	this.bCount = 5;
	init();
}

function getDropdownHTML(opts, id) {
	var s = '';
	s += '<select id="' + id +  '" style="font: 16px Arial; color: black; background: rgba(200,220,256,0.7); padding: 1px;line-height:30px; width: 70px; text-align: center; ">';
	for (var i = 0; i < opts.length; i++) {
		var idStr = id + i;
		var chkStr = i == 99 ? 'checked' : '';
		s += '<option id="' + idStr + '" value="' + opts[i] + '" style="height:21px;" ' + chkStr + ' >' + opts[i] + '</option>';
	}
	s += '</select>';
	return s;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
