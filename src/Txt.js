function Txt (text) {
	var s = this;

	s.x = stageW / 2;
	s.y = stageH / 2;
	s.text = text || "";
	s.visible = true;
}

Txt.prototype = {
	loop : function() {
		var s = this;

		if (!s.visible) {
			return;
		}

		ctx.save();
		ctx.fillStyle = "#ECECEC";
		ctx.font = "bold 20pt sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(s.text, s.x, s.y);
		ctx.restore();
	}
};