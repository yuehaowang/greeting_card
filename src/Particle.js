function Particle (startX, startY, endX, endY) {
	var s = this;

	s.x = startX;
	s.y = startY;
	s.rotation = 0;
	s.endX = endX;
	s.endY = endY;
	s.displacement = Math.sqrt((startX - endX) * (startX - endX) + (startY - endY) * (startY - endY));
	s.stepLength = 7;
	s.stepNum = s.displacement / s.stepLength;
	s.stepIndex = 0;
	s.stopAddSprite = false;
	s.moveCos = (endX - startX) / s.displacement;
	s.moveSin = (endY - startY) / s.displacement;
	s.childList = new Array();
	s.removeList = new Array();
	s.color = config.colorList[Math.round(Math.random() * (config.colorList.length - 1))];
}

Particle.prototype = {
	loop : function () {
		var s = this;

		s.loopChild();
		s.clearRemoveList();
		s.updateDisplay();
		s.addChildSprite();
	},

	loopChild : function () {
		var s = this;

		for (var i = 0, l = s.childList.length; i < l; i++) {
			var o = s.childList[i];

			if (!o) {
				continue;
			}

			o.loop();

			if (o.mode === Sprite.MODE_DISAPPEAR) {
				s.removeList.push(o);
			}
		}
	},

	clearRemoveList : function () {
		var s = this;

		for (var j = 0, m = s.removeList.length; j < m; j++) {
			var toRemoveObj = s.removeList[j];

			for (var k = 0, n = s.childList.length; k < n; k++) {
				if (s.childList[k].index === toRemoveObj.index) {
					s.childList.splice(k, 1);

					break;
				}
			}
		}

		s.removeList.splice(0, s.removeList.length);
	},

	updateDisplay : function () {
		var s = this;

		s.x += s.stepLength * s.moveCos;
		s.y += s.stepLength * s.moveSin;
		s.rotation += 10;
	},

	addChildSprite : function () {
		var s = this;

		if (s.stopAddSprite) {
			return;
		}

		if (++s.stepIndex >= s.stepNum) {
			s.x = s.endX;
			s.y = s.endY;

			var sprite = new Sprite(s.x, s.y, s.rotation, true);
			sprite.color = s.color;
			s.childList.push(sprite);

			s.stopAddSprite = true;

			return;
		}

		var sprite = new Sprite(s.x, s.y, s.rotation, false);
		sprite.color = s.color;
		s.childList.push(sprite);
	}
};