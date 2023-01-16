export const menu = () => {
	scene('menu', () => {
		add([
			sprite('bg_0', {
				width: width(),
				height: height(),
			}),
			pos(0, 0),
		]);

		add([
			text('Wiz', {
				size: 128,
				font: 'sinko'
			}),
			pos(width() / 2, height() / 2 - 50),
			origin('center'),
			color(255, 153, 51)
		]);

		const playBtn = add([
			sprite('Play_Idle'),
			pos(width() / 2, height() / 2 + 128),
			origin('center'),
			area(),
			scale(2),
			'play_button'
		]);
		const heart = add([
			sprite('Heart'),
			pos(width() / 2, height() / 1.032),
			origin('center'),
			area(),
			scale(2),
			'heart'
		]);

		playBtn.clicks(() => {
			go('game');
		});
		heart.clicks(() => {
			go('secret');
		});

		shake();
		wait(0.02, () => {
			play('powerup');
		});
	});
};