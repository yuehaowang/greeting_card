window.addEventListener("load", main, false);

var canvasTag, ctx;
var canvasStyleWidth, canvasStyleHeight, marginLeft = 0, marginTop = 0;
var isFirefox = true, mobile = false;
var instructionsTxt;
var instructionsIndex = 0, instructionsContents = [
	"Tap to open my greeting card~",
	"Well, continue~",
	"Don't stop tapping until you know my meaning ^_^"
];
var showList = new Array();
var positionList = new Array();

(function (n) {
	isFirefox = (n.toLowerCase().indexOf('firefox') >= 0);

	if (
		n.indexOf("iPhone") > 0
		|| n.indexOf("iPad") > 0
		|| n.indexOf("iPod") > 0
		|| n.indexOf("Android") > 0
		|| n.indexOf("Windows Phone") > 0
		|| n.indexOf("BlackBerry") > 0
	) {
		mobile = true;
	}
})(navigator.userAgent);

function main () {
	canvasTag = document.getElementById("mycanvas");
	canvasTag.width = stageW;
	canvasTag.height = stageH;
	ctx = canvasTag.getContext("2d");

	fullScreen();
	addStage();
	addInstructions();
	getParticlesPosition();
	canvasTag.addEventListener(
		"mouseup",
		function (e) {
			if (instructionsIndex++ >= instructionsContents.length - 1) {
				instructionsTxt.visible = false;
			} else {
				instructionsTxt.text = instructionsContents[instructionsIndex];
			}

			if (e.offsetX == null && e.layerX != null) {
				e.offsetX = e.layerX;
				e.offsetY = e.layerY;
			}

			var startX = scaleOffsetX(e.offsetX),
			startY = scaleOffsetY(e.offsetY);

			for (var i = 0; i < emitterNum; i++) {
				addParticle(startX, startY);
			}
		},
		false
	);

	window.onresize = function () {
		fullScreen();
	};

	setInterval(function () {
		loop();
	}, 1000/60);
}

function fullScreen () {
	var w = stageW, h = stageH, ww = window.innerWidth, wh = window.innerHeight;

	if (mobile) {
		if (ww / wh > stageW / stageH) {
			h = wh;
			w = stageW * wh / stageH;
		} else {
			w = ww;
			h = stageH * ww / stageW;
		}
	}

	canvasTag.style.width = w + "px";
	canvasTag.style.height = h + "px";
	canvasTag.style.marginLeft = (ww - w) / 2 + "px";
	canvasTag.style.marginTop = (wh - h) / 2 + "px";

	canvasStyleWidth = w;
	canvasStyleHeight = h;

	if (isFirefox) {
		marginLeft = parseInt(canvasTag.style.marginLeft);
		marginTop = parseInt(canvasTag.style.marginTop);
	}
}

function addStage () {
	var stage = new Stage();
	showList.push(stage);
}

function addInstructions () {
	instructionsTxt = new Txt(instructionsContents[instructionsIndex]);
	showList.push(instructionsTxt);
}

function getParticlesPosition () {
	for (var i = 0, l = list.length; i < l; i++) {
		var item = list[i];

		for (var j = 0, n = item.length; j < n; j++) {
			if (item[j]) {
				positionList.push({x : j * particleW, y : i * particleH});
			}
		}
	}
}

function addParticle (startX, startY) {
	var index = Math.floor(Math.random() * (positionList.length - 1)),
	pos = positionList[index];

	if (!pos) {
		return;
	}

	var particle = new Particle(startX, startY, pos.x, pos.y);
	showList.push(particle);

	positionList.splice(index, 1);
}

function scaleOffsetX (v) {
	return (v - marginLeft) * stageW / canvasStyleWidth;
}

function scaleOffsetY (v) {
	return (v - marginTop) * stageH / canvasStyleHeight;
}

function loop () {
	ctx.clearRect(0, 0, canvasTag.width, canvasTag.height);

	for (var i = 0, l = showList.length; i < l; i++) {
		showList[i].loop();
	}
}