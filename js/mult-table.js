function multtableMain() {
    w = 600
    h = 400
    s = "";
    s += '<div id="table">';
    s += '<canvas id="canvasId" width="' + w + '" height="' + h + '" style="z-index:1;"></canvas>';
    s += '<div id="mult"> 1 x 1 = 1 </div>';
    s += '</div>';
    document.write(s);
    canvas = document.getElementById('canvasId');
    ratio = 4
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    g = canvas.getContext("2d");
    g.setTransform(ratio, 0, 0, ratio, 0, 0)
    tiles = []
    for (var c = 0; c <= 10; c++) {
        tiles[c] = []
        for (var r = 0; r <= 10; r++) {
            var t = new Tile(g, r, c)
            tiles[c][r] = t
        }
    }
    canvas.addEventListener('touchmove', ontouchmove, false);
    canvas.addEventListener('mousemove', onmousemove, false);
    update();
}

function onmousemove(e) {
    var rect = canvas.getBoundingClientRect();
    var x0 = (e.clientX - rect.left);
    var y0 = (e.clientY - rect.top);
    var c0 = Math.floor(x0 / 53);
    var r0 = Math.floor(y0 / 28);
    if (c0 < 1 || c0 > 10) return
    if (r0 < 1 || r0 > 10) return
    document.getElementById("mult").innerHTML = r0 + " &times; " + c0 + " = " + r0 * c0
    for (var c = 0; c <= 10; c++) {
        for (var r = 0; r <= 10; r++) {
            lvl = 1
            var t = tiles[r][c]
            if (r == r0 && c < c0) lvl = 2
            if (c == c0 && r < r0) lvl = 2
            t.hilite(lvl)
        }
    }
    tiles[r0][c0].hilite(3)
    update();
};

function ontouchmove(evt) {
    var touch = evt.targetTouches[0];
    evt.clientX = touch.clientX;
    evt.clientY = touch.clientY;
    evt.touchQ = true;
    onmousemove(evt);
    evt.preventDefault();
};

function Tile(ig, ir, ic) {
    this.g = ig;
    this.c = ic;
    this.r = ir;
    this.lvl = 0
    this.refresh();
}
Tile.prototype.hilite = function(ilvl) {
    if (this.lvl != ilvl) {
        this.lvl = ilvl
        this.refresh()
    }
}
Tile.prototype.refresh = function() {
    wd = 53
    ht = 28
    lt = this.r * wd + 0.5
    tp = this.c * ht + 0.5
    g.clearRect(lt, tp, wd, ht);
    this.g.strokeStyle = "#aaaaaa";
    this.g.lineWidth = 1;
    this.g.beginPath()
    this.g.moveTo(lt, tp)
    this.g.lineTo(lt + wd, tp)
    this.g.lineTo(lt + wd, tp + ht)
    this.g.lineTo(lt, tp + ht)
    this.g.lineTo(lt, tp)
    if (this.r == 0 || this.c == 0) {
        if (this.r == 0 && this.c == 0) {
            this.g.fillStyle = "#eee"
            this.g.textAlign = "center"
            this.g.font = "bold 33px qarmic"
            this.g.fillText(" ", 30, 20)
        } else {
            lvls = ["#ffffff", "#ffffff", "#F48FB1", "#aaccff"]
            this.g.fillStyle = lvls[this.lvl]
            this.g.fill()
            var s = ""
            if (this.r > 0) s = this.r
            if (this.c > 0) s = this.c
            this.g.fillStyle = "#183D4E"
            this.g.textAlign = "center"
            this.g.font = "bold 15px Verdana"
            this.g.fillText(s, lt + wd / 2, tp + 20)
        }
    } else {
        this.g.stroke();
        lvls = ["#f7f7f7", "#f7f7f7", "#FCE4EC", "#F48FB1"]
        this.g.fillStyle = lvls[this.lvl]
        this.g.fill()
        this.g.fillStyle = "#183D4E"
        this.g.textAlign = "center"
        this.g.font = "14px Verdana"
        this.g.fillText(this.c * this.r, lt + wd / 2, tp + 18)
    }
};

function randomNum() {
  var random = Math.floor((Math.random() * 10) + 1);
  return random;
}

var quizArray = [];
function quizGenerator() {
  var quiz = '';
  for (i = 0; i < 9; i++) {
    var x = randomNum();
    var y = randomNum();
    var answer = x*y;
    quizArray.push([x, y,answer]);
    quiz += '<div class="quizStem"><br>' + x + ' &times; '+ y + ' =  <input class="answerInput" id="inputField' +i +'" placeholder="Your Answer" type="number"><span class="glyphicon glyphicon-ok" id="correct'+i+'"></span></div>'
  }
  document.getElementById('quiz').innerHTML = quiz;
}


function inputCheck() {
  var tried = 0;
	var yesCount = 0;
  for(var i=0; i<9; i++){
    var inputValue = document.getElementById('inputField' + i).value;
    if(inputValue !== ""){
      tried++;
    }
    if(inputValue == quizArray[i][2]){
      yesCount++;
      document.getElementById('correct' + i).style.opacity = 1;
    }
  }
  var result = '';
  if(tried > 0){
    var grades = Math.round(yesCount * 100 / tried);
    result += '<div style="font: bold 20px Arial; color: #E91E63;">You got ' + grades + '% right </div>';
		result += '<div style="font: 18px Arial; color: rgba(0, 0, 0, 0.7); margin: 10px 0 10px 0;">You did ' + tried + ' of the 9 questions, <br> and got ' + yesCount + ' right</div>';
  }else {
    result += 'Please try the quizes above'
  }
  document.getElementById('result').innerHTML = result;
}

function tryAnother() {
  quizArray = [];
  document.getElementById('result').innerHTML = "";
  quizGenerator();
}
