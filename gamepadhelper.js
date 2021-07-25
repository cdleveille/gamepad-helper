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
				let button = gamepad.buttons[i];
				if (this.gamepadsLastUpdate) {
					let buttonLastUpdate = this.gamepadsLastUpdate[gamepad.index].buttons[i];
					if (button.value == 1 && buttonLastUpdate.value == 0) {
						console.log('gamepad ' + gamepad.index + ': button ' + i + ' is down');
						this.createButtonDownEvent(gamepad.index, i);
						document.dispatchEvent(this.buttonDownEvent);
					} else if (button.value == 0 && buttonLastUpdate.value == 1) {
						console.log('gamepad ' + gamepad.index + ': button ' + i + ' is up');
						this.createButtonUpEvent(gamepad.index, i);
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
}