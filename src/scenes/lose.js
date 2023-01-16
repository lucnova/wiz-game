export const lose = () => {
	scene('lose', () => {
		add([
			sprite('bg_0', {
				width: width(),
				height: height(),
			}),
			pos(0, 0),
		]);
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
					size: 32,
					font: 'sinko',
				}),
				pos(center().x, center().y - 64),
				origin('center'),
				color(255, 51, 51)
			]);
		}
		add([
			text(`Tu tiempo: ${lastScore.toFixed(1)}`, {
				size: 19,
				font: 'sinko',
			}),
			pos(center()),
			origin('center')
		]);
		add([
			text(`Tu mejor tiempo: ${bestScore.toFixed(1)}`, {
				size: 20,
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