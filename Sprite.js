function Sprite (x, y, rotation, cannotDisappear) {
	var s = this;

	s.x = x;
	s.y = y;
	s.index = Sprite.INDEX++;
	s.rotation = rotation;
	s.alpha = 1;
	s.mode = Sprite.MODE_APPEAR;
	s.cannotDisappear = cannotDisappear;
	s.color = "#FFFFFF";
	s.startDrawX = -particleW / 2;
	s.startDrawY = -particleH / 2;
}

Sprite.INDEX = 0;

Sprite.MODE_APPEAR = "appear";
Sprite.MODE_DISAPPEAR = "disappear";

Sprite.prototype = {
	loop : function () {
		var s = this;

		ctx.save();
		ctx.beginPath();
		ctx.translate(s.x, s.y);
		ctx.rotate(s.rotation * angleToRad);
		ctx.globalAlpha = s.alpha;
		ctx.rect(s.startDrawX, s.startDrawY, particleW, particleH);
		ctx.fillStyle = s.color;
		ctx.fill();
		ctx.restore();

		if (s.cannotDisappear) {
			s.rotation += 5;

			return;
		}

		s.alpha -= 0.05;

		if (s.alpha <= 0) {
			s.mode = Sprite.MODE_DISAPPEAR;
		}
	}
};