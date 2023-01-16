let time = 0;
export const topTimer = () => {
	time = 0;
	let timer = add([
		text(time, {
			size: 18,
			font: 'sinko',
		}),
		pos(width() - 32, 16),
		origin('center'),
		'timer'
	]);

	action('timer', () => {
		time += dt();
		timer.text = time.toFixed(1);
	});
};

export const getScore = () => {
	return time;
};