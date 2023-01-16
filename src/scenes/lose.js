export const lose = () => {
	scene('lose', () => {
		const catto = add([
			sprite('CatBack'),
			pos(width() / 2 - 115, height() / 2 + 32),
			area(),
			scale(10),
			'catto'
		]);
		add([text(':('), pos(center()), origin('center')]);

		catto.clicks(() => {
			go('menu');
		});
	});
};