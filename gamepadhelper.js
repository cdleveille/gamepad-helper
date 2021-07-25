export default class GamepadHelper {
	constructor() {
		this.gamepads = {};
	}

	createButtonDownEvent(gamepad, button) {
		this.buttonDownEvent = new CustomEvent('gampadbuttondown', {
			detail: { gamepad: gamepad, button: button }
		});
	}

	createButtonUpEvent(gamepad, button) {
		this.buttonUpEvent = new CustomEvent('gampadbuttonup', {
			detail: { gamepad: gamepad, button: button }
		});
	}

	// refresh the state of the gamepads connected to the system
	updateGamepads() {
		let gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);

		for (let i = 0; i < gamepads.length; i++) {
			let gamepad = gamepads[i];
			if (gamepad) {
				if (!this.gamepads[gamepad.index]) {
					console.log('gamepad ' + gamepad.index + ' connected');
				}
				this.gamepads[gamepad.index] = gamepad;
			}
		}
	}

	// main method intended to be called from within a game loop
	update() {
		this.updateGamepads();

		// skip if there are no gamepads connected
		if (Object.keys(this.gamepads).length < 1) return;

		Object.values(this.gamepads).forEach(gamepad => {
			// check for changes in button state
			for (let i = 0; i < gamepad.buttons.length; i++) {
				if (this.gamepadsLastUpdate) {
					let buttonLastUpdate = this.gamepadsLastUpdate[gamepad.index].buttons[i];
					let button = gamepad.buttons[i], buttonLabel = i;

					if (this.mode == 'xbox') {
						buttonLabel = this.getXboxButton(i);
					} else if (this.mode == 'playstation') {
						buttonLabel = this.getPlaystationButton(i);
					}

					if (button.value == 1 && buttonLastUpdate.value == 0) {
						console.log('gamepad ' + gamepad.index + ': button ' + buttonLabel + ' is down');
						this.createButtonDownEvent(gamepad.index, buttonLabel);
						document.dispatchEvent(this.buttonDownEvent);
					} else if (button.value == 0 && buttonLastUpdate.value == 1) {
						console.log('gamepad ' + gamepad.index + ': button ' + buttonLabel + ' is up');
						this.createButtonUpEvent(gamepad.index, buttonLabel);
						document.dispatchEvent(this.buttonUpEvent);
					}
				}
			}
		});
		
		// copy to a separate object in order to compare fields next update
		this.gamepadsLastUpdate = Object.assign({}, this.gamepads);
	}

	// returns the state of the specified button
	getButtonValue(gamepad, button) {
		return this.gamepads[gamepad].buttons[button].value;
	}

	// returns the state of the specified axis
	getAxisValue(gamepad, axis) {
		return this.gamepads[gamepad].axes[axis];
	}

	// convert to corresponding xbox button label
	getXboxButton(button) {
		switch(button) {
			case 0: return 'a';
			case 1: return 'b';
			case 2: return 'x';
			case 3: return 'y';
			case 4: return 'lb';
			case 5: return 'rb';
			case 8: return 'back';
			case 9: return 'start';
			case 10: return 'ls';
			case 11: return 'rs';
			case 12: return 'dpad-up';
			case 13: return 'dpad-down';
			case 14: return 'dpad-left';
			case 15: return 'dpad-right';
			case 16: return 'system';
		}
	}

	// convert to corresponding playstation button label
	getPlaystationButton(button) {
		switch(button) {
			case 0: return 'cross';
			case 1: return 'circle';
			case 2: return 'square';
			case 3: return 'triangle';
			case 4: return 'l1';
			case 5: return 'r1';
			case 8: return 'select';
			case 9: return 'start';
			case 10: return 'l3';
			case 11: return 'r3';
			case 12: return 'dpad-up';
			case 13: return 'dpad-down';
			case 14: return 'dpad-left';
			case 15: return 'dpad-right';
			case 16: return 'system';
		}
	}
}