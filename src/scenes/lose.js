export const lose = () => {
	scene('lose', () => {
		const catto = add([
			sprite('CatBack'),
			pos(width() / 2 - 115, height() / 2 + 32),
			area(),
			scale(10),
			'catto'
		]);

		const lastScore = parseFloat(localStorage.getItem('lastScore')) || 0;
		const bestScore = parseFloat(localStorage.getItem('bestScore')) || 0;
		const recordSet = parseInt(localStorage.getItem('recordSet')) || 0;

		if (recordSet) {
			add([
				text(`NUEVO RECORD`, {
					size: 18,
					font: 'sinko',
				}),
				pos(center().x, center().y - 64),
				origin('center')
			]);
		}
		add([
			text(`Tu tiempo: ${lastScore.toFixed(1)}`, {
				size: 18,
				font: 'sinko',
			}),
			pos(center()),
			origin('center')
		]);
		add([
			text(`Tu mejor tiempo: ${bestScore.toFixed(1)}`, {
				size: 18,
				font: 'sinko',
			}),
			pos(center().x, center().y + 32),
			origin('center')
		]);

		catto.clicks(() => {
			go('menu');
		});
	});
};