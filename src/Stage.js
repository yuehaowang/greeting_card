function Stage () {
	var s = this;

	s.width = canvasTag.width;
	s.height = canvasTag.height;
	s.bgColor = "#222222";
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