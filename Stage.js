function Stage () {
	var s = this;

	s.width = canvasTag.width;
	s.height = canvasTag.height;
	s.bgColor = ctx.createRadialGradient(s.width / 2, s.height / 2, 10, s.width / 2, s.height / 2, s.width * 0.6);
	s.bgColor.addColorStop(0.3, "#CCCCCC");
	s.bgColor.addColorStop(1.0, "#FFFFFF");
}

Stage.prototype = {
	loop : function() {
		var s = this;

		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = s.bgColor;
		ctx.rect(0, 0, s.width, s.height);
		ctx.fill();
		ctx.restore();
	}
};