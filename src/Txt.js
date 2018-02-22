function Txt (text) {
	var s = this;

	s.x = config.stageW / 2;
	s.text = text || "";
	s.visible = true;
}

Txt.prototype = {
	loop : function () {
		var s = this;

		if (!s.visible) {
			return;
		}

		ctx.save();
		ctx.fillStyle = "#ECECEC";
		ctx.font = "bold " + config.prefaceFontSize + "pt sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";

		var lines = s.getTextLines();
		var lineH = ctx.measureText("O").width * 2.4, top = (config.stageH - (lines.length * lineH)) * 0.5;

		for (var i = 0, l = lines.length; i < l; i++) {
			var ln = lines[i];

			ctx.fillText(ln, s.x, top + lineH * i);
		}

		ctx.restore();
	},

	getTextLines () {
		var tokens = this.text.match(/(\S+)(\s*)/gi);
		var maxWidth = Math.floor(config.stageW * 0.9);
		var temp = "", lines = new Array();

		for (var j = 0, l = tokens.length; j < l; j++) {
			var t = tokens[j];

			if (ctx.measureText(temp + t).width > maxWidth) {
				if (ctx.measureText(t).width > maxWidth) {
					for (var i = 0, m = t.length; i < m; i++) {
						if (ctx.measureText(temp + t[i]).width > maxWidth) {
							lines.push(temp);

							temp = "";
						} else {
							temp += t[i];
						}
					}
				} else {
					lines.push(temp);

					temp = t;
				}
			} else {
				temp += t;
			}
		}

		if (temp.length > 0) {
			lines.push(temp);
		}

		return lines;
	}
};