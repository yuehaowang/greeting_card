function Sprite (x, y, rotation, cannotDisappear) {
	var s = this;

	s.x = x;
	s.y = y;
	s.index = Sprite.INDEX++;
	s.rotation = rotation;
	s.scale = 0.5;
	s.alpha = 1;
	s.blendMode = "lighter"
	s.mode = Sprite.MODE_APPEAR;
	s.cannotDisappear = cannotDisappear;
	s.color = "#FFFFFF";
	s.startDrawX = -particleW / 2;
	s.startDrawY = -particleH / 2;
}

Sprite.INDEX = 0;

Sprite.MODE_APPEAR = "appear";
Sprite.MODE_DISAPPEAR = "disappear";

Sprite.CONST_ANGLE_TO_RAD = Math.PI / 180;


Sprite.prototype = {
	loop : function () {
		var s = this;

		ctx.save();
		ctx.beginPath();
		ctx.translate(s.x, s.y);
		ctx.scale(s.scale, s.scale)
		ctx.rotate(s.rotation * Sprite.CONST_ANGLE_TO_RAD);
		ctx.globalCompositeOperation = s.blendMode;
		ctx.globalAlpha = s.alpha;
		ctx.rect(s.startDrawX, s.startDrawY, particleW, particleH);
		ctx.fillStyle = s.color;
		ctx.fill();
		ctx.restore();

		s.scale += 0.1;

		if (s.scale > 1) {
			s.scale = 1;
		}

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