export const menu = () => {
	scene('menu', () => {
		add([text('Wiz'), pos(width() / 2, height() / 2 - 50), origin('center')]);

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
			pos(width() / 2, height() / 2 + 256),
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