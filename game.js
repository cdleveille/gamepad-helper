import GamepadHelper from './gamepadhelper.js';

let gamepadHelper = new GamepadHelper();
let dt, now, last = timestamp(), step = 1 / 500;

// test gameloop
function frame() {
	now = timestamp();
	dt = Math.min(1, (now - last) / 1000);
	while (dt > step) {
		dt = dt - step;
		gamepadHelper.update();
	}
	last = now - (dt % step);
	requestAnimationFrame(frame);
}

// get the current time (high precision)
function timestamp() {
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

requestAnimationFrame(frame);