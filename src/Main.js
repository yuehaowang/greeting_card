window.addEventListener("load", main, false);

var config = null;

var canvasTag, ctx;

var canvasX, canvasY, canvasStyleWidth, canvasStyleHeight, marginLeft = 0, marginTop = 0;

var particleW, particleH;

var isFirefox = true, mobile = false;

var prefaceTxt;
var prefaceIndex = 0;

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

window.rAF = (function(){
  return (
  		window.requestAnimationFrame || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame || 
		window.oRequestAnimationFrame || 
		window.msRequestAnimationFrame || 
		function(callback){
			window.setTimeout(callback, 1000 / 60);
		}
	);
})();

function main () {
	var loadList = [
		"./src/Sprite.js",
		"./src/Particle.js",
		"./src/Stage.js",
		"./src/Txt.js"
	];

	var startLoad = function (configPath) {
		if (configPath != null) {
			loadList.splice(0, 0, configPath);
		}

		for (var i = 0, l = loadList.length; i < l; i++) {
			var path = loadList[i];

			var script = document.createElement("script");
			script.async = false;
			script.type = "text/javascript";
			script.src = path;
			script.__index = i;
			script.onload = function () {
				if (this.__index === l - 1) {
					config = normalizeConfig(config);

					particleW = config.stageW / config.col;
					particleH = config.stageH / config.row;

					init();
				}
			}
			document.querySelector("head").appendChild(script);
		}
	};

	var getQueryStringByName = function (name) {
		var result = window.location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));

		if(result === null || result.length < 1){
			return null;
		}

		return result[1];
	};

	var configFileQueryStr = getQueryStringByName("config_file");

	if (configFileQueryStr === null) {
		startLoad("./config.js");
	} else {
		startLoad(configFileQueryStr);
	}
}

function init () {
	document.title = config.documentTitle;

	canvasTag = document.getElementById("mycanvas");
	canvasTag.width = config.stageW;
	canvasTag.height = config.stageH;
	ctx = canvasTag.getContext("2d");

	var eventType = mobile ? "touchstart" : "mouseup";

	fullScreen();
	addStage();
	addInstructions();
	getParticlesPosition();
	canvasTag.addEventListener(
		eventType,
		function (e) {
			e.preventDefault();
			e.stopPropagation();

			if (prefaceIndex++ >= config.preface.length - 1) {
				prefaceTxt.visible = false;
			} else {
				prefaceTxt.text = config.preface[prefaceIndex];
			}

			if (e.offsetX == null && e.layerX != null) {
				e.offsetX = e.layerX;
				e.offsetY = e.layerY;
			}

			if (mobile) {
				e.offsetX = e.touches[0].pageX - canvasX;
				e.offsetY = e.touches[0].pageY - canvasY;
			}

			var startX = scaleOffsetX(e.offsetX),
			startY = scaleOffsetY(e.offsetY);

			for (var i = 0; i < config.emitterNum; i++) {
				addParticle(startX, startY);
			}
		},
		false
	);

	window.onresize = function () {
		fullScreen();
	};

	loop();
}

function fullScreen () {
	var w = config.stageW, h = config.stageH, ww = window.innerWidth, wh = window.innerHeight;

	if (mobile) {
		if (ww / wh > config.stageW / config.stageH) {
			h = wh;
			w = config.stageW * wh / config.stageH;
		} else {
			w = ww;
			h = config.stageH * ww / config.stageW;
		}
	}

	canvasX = (ww - w) / 2;
	canvasY = (wh - h) / 2;

	canvasTag.style.width = w + "px";
	canvasTag.style.height = h + "px";
	canvasTag.style.marginLeft = canvasX + "px";
	canvasTag.style.marginTop = canvasY + "px";

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
	var text;

	if (config.preface.length <= 0) {
		text = "";
	} else {
		text = config.preface[prefaceIndex];
	}

	prefaceTxt = new Txt(text);
	showList.push(prefaceTxt);
}

function getParticlesPosition () {
	if (!config.matrix) {
		return;
	}

	for (var i = 0, l = config.matrix.length; i < l; i++) {
		var item = config.matrix[i];

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
	return (v - marginLeft) * config.stageW / canvasStyleWidth;
}

function scaleOffsetY (v) {
	return (v - marginTop) * config.stageH / canvasStyleHeight;
}

function loop () {
	ctx.clearRect(0, 0, canvasTag.width, canvasTag.height);

	for (var i = 0, l = showList.length; i < l; i++) {
		showList[i].loop();
	}

	window.rAF(loop);
}