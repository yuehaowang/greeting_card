var config_default = {
	documentTitle : "Greeting Card",
	stageW : 800,
	stageH : 480,
	col : 40,
	row : 24,
	emitterNum : 10,

	preface : [
		"Tap to open my greeting card~",
		"Well, continue~",
		"Don't stop tapping until you know my meaning ^_^"
	],

	colorList : [
		"#990000",
		"#FF0000",
		"#CC3300",
		"#CC6600",
		"#CC0033",
		"#FFFF00",
		"#33FF00",
		"#33CC00",
		"#0066FF",
		"#00FF99",
		"#770099"
	],

	matrix: null
};


function normalizeConfig (_config) {
	if (_config === null) {
		_config = {};
	}

	if (typeof _config.documentTitle === "undefined") {
		_config.documentTitle = config_default.documentTitle;
	}

	if (typeof _config.stageW === "undefined") {
		_config.stageW = config_default.stageW;
	}
	if (typeof _config.stageH === "undefined") {
		_config.stageH = config_default.stageH;
	}

	if (typeof _config.col === "undefined") {
		_config.col = config_default.col;
	}
	if (typeof _config.row === "undefined") {
		_config.row = config_default.row;
	}

	if (typeof _config.emitterNum === "undefined") {
		_config.emitterNum = config_default.emitterNum;
	}

	if (typeof _config.preface === "undefined") {
		_config.preface = config_default.preface;
	}

	if (typeof _config.colorList === "undefined") {
		_config.colorList = config_default.colorList;
	}

	if (typeof _config.matrix === "undefined") {
		_config.matrix = config_default.matrix;
	}

	return _config;
}