export const secret = () => {
	scene('secret', () => {
		play('aww');
		add([text('Te amo'), pos(width() / 2, height() / 2 - 50), origin('center')]);
		add([text('mucho'), pos(width() / 2, height() / 2), origin('center')]);
		add([text('Cassandra'), pos(width() / 2, height() / 2 + 50), origin('center')]);
		const heart = add([
			sprite('Heart'),
			pos(width() / 2, height() / 2 + 128),
			origin('center'),
			area(),
			scale(5),
			'heart'
		]);
		shake();

		heart.clicks(() => {
			go('menu');
		});
	});
};