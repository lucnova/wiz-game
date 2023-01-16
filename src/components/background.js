export const loadBackground = () => {
	const bgBackSpeed = -64;
	const bgMidSpeed = -128;
	const bgLightsSpeed = -140;
	const bgFrontSpeed = -256;

	const deviceWidth = width();
	const deviceHeight = height();
	const spriteWidth = 272;
	const spriteHeight = 160;

	const scalePercent = (deviceHeight * 100) / spriteHeight;

	const bgXThreshold = (spriteWidth * scalePercent) / 100;
	const bgWidth = bgXThreshold + 8;
	const bgHeight = deviceHeight;

	const bg_back_left = add([
		sprite('bg_0', {
			width: bgWidth,
			height: bgHeight,
		}),
		pos(0, 0),
		move((20, 0), bgBackSpeed)
	]);
	const bg_back_right = add([
		sprite('bg_0', {
			width: bgWidth,
			height: bgHeight,
		}),
		pos(bgXThreshold, 0),
		move((20, 0), bgBackSpeed)
	]);

	const bg_lights_left = add([
		sprite('bg_3', {
			width: bgWidth,
			height: bgHeight,
		}),
		pos(0, 0),
		move((20, 0), bgLightsSpeed)
	]);
	const bg_lights_right = add([
		sprite('bg_3', {
			width: bgWidth,
			height: bgHeight,
		}),
		pos(bgXThreshold, 0),
		move((20, 0), bgLightsSpeed)
	]);

	const bg_mid_left = add([
		sprite('bg_1', {
			width: bgWidth,
			height: bgHeight,
		}),
		pos(0, 0),
		move((20, 0), bgMidSpeed)
	]);
	const bg_mid_right = add([
		sprite('bg_1', {
			width: bgWidth,
			height: bgHeight,
		}),
		pos(bgXThreshold, 0),
		move((20, 0), bgMidSpeed)
	]);

	const bg_front_left = add([
		sprite('bg_2', {
			width: bgWidth,
			height: bgHeight,
		}),
		pos(0, 0),
		move((20, 0), bgFrontSpeed)
	]);
	const bg_front_right = add([
		sprite('bg_2', {
			width: bgWidth,
			height: bgHeight,
			flipX: true
		}),
		pos(bgXThreshold, 0),
		move((20, 0), bgFrontSpeed),
	]);

	action(() => {
		if (bg_back_left.pos.x <= -bgXThreshold) bg_back_left.pos.x = bgXThreshold;
		if (bg_back_right.pos.x <= -bgXThreshold) bg_back_right.pos.x = bgXThreshold;

		if (bg_mid_left.pos.x <= -bgXThreshold) bg_mid_left.pos.x = bgXThreshold;
		if (bg_mid_right.pos.x <= -bgXThreshold) bg_mid_right.pos.x = bgXThreshold;

		if (bg_front_left.pos.x <= -bgXThreshold) bg_front_left.pos.x = bgXThreshold;
		if (bg_front_right.pos.x <= -bgXThreshold) bg_front_right.pos.x = bgXThreshold;

		if (bg_lights_left.pos.x <= -bgXThreshold) bg_lights_left.pos.x = bgXThreshold;
		if (bg_lights_right.pos.x <= -bgXThreshold) bg_lights_right.pos.x = bgXThreshold;
	});
};