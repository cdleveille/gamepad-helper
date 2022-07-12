export type GamepadHub = { [key: number]: Gamepad };

export interface IGamepadButtonEventDetail {
	gamepad: number;
	button: number;
}

export default class GamepadHelper {
	public static gamepads: GamepadHub = {};
	public static gamepadsLastUpdate: GamepadHub;
	public static logOutput = false;

	/** Return the state of the specified button */
	public static getButtonValue(gamepad: number, button: number) {
		return GamepadHelper.gamepads[gamepad]?.buttons[button]?.value;
	}

	/** Return the state of the specified axis */
	public static getAxisValue(gamepad: number, axis: number) {
		return GamepadHelper.gamepads[gamepad]?.axes[axis];
	}

	/**	Main method intended to be called from within a game loop.
	 *	Queries the state of each button on each connected gamepad and dispatches an event to the document if there is change in state.
	 */
	public static update() {
		GamepadHelper.checkForNewGamepads();

		// skip if there are no gamepads connected
		if (!GamepadHelper.gamepads || Object.keys(GamepadHelper.gamepads).length < 1) return;

		if (
			GamepadHelper.gamepadsLastUpdate &&
			Object.keys(GamepadHelper.gamepadsLastUpdate).length > 0
		) {
			Object.values(GamepadHelper.gamepads).forEach((gamepad) => {
				// check for changes in button state
				for (let i = 0; i < gamepad.buttons.length; i++) {
					const buttonLastUpdate =
						GamepadHelper.gamepadsLastUpdate[gamepad.index]?.buttons[i];
					const button = gamepad.buttons[i];

					if (button?.value == 1 && buttonLastUpdate?.value == 0) {
						GamepadHelper.dispatchButtonDownEvent(gamepad.index, i);
					} else if (button?.value == 0 && buttonLastUpdate?.value == 1) {
						GamepadHelper.dispatchButtonUpEvent(gamepad.index, i);
					}
				}
			});
		}

		// copy to a separate object in order to compare fields next update
		GamepadHelper.gamepadsLastUpdate = Object.assign({}, GamepadHelper.gamepads);
	}

	private static checkForNewGamepads() {
		// @ts-ignore
		const gamepads = navigator.getGamepads();

		for (const gamepad of gamepads) {
			if (gamepad) {
				if (!GamepadHelper.gamepads[gamepad.index]) {
					GamepadHelper.logOutput &&
						console.log("gamepad " + gamepad.index + " connected");
				}
				GamepadHelper.gamepads[gamepad.index] = gamepad;
			}
		}
	}

	private static dispatchButtonDownEvent(gamepad: number, button: number) {
		GamepadHelper.logOutput && console.log(`gamepad ${gamepad}: button ${button} is down`);
		document.dispatchEvent(
			new CustomEvent<IGamepadButtonEventDetail>("gamepadbuttondown", {
				detail: { gamepad, button }
			})
		);
	}

	private static dispatchButtonUpEvent(gamepad: number, button: number) {
		GamepadHelper.logOutput && console.log(`gamepad ${gamepad}: button ${button} is up`);
		document.dispatchEvent(
			new CustomEvent<IGamepadButtonEventDetail>("gamepadbuttonup", {
				detail: { gamepad, button }
			})
		);
	}
}
