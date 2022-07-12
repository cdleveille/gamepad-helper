export type GamepadHub = { [key: number]: Gamepad };

export type GamepadMode = "xbox" | "playstation" | "default";

export interface IButtonEvent {
	detail: {
		gamepad: number;
		button: number | string;
	};
}

export default class GamepadHelper {
	static gamepads: GamepadHub = {};
	static gamepadsLastUpdate: GamepadHub;
	static mode: GamepadMode = "default";
	static buttonDownEvent: CustomEvent<{ gamepad: number; button: string | number }>;
	static buttonUpEvent: CustomEvent<{ gamepad: number; button: string | number }>;

	static createButtonDownEvent(gamepad: number, button: number | string) {
		GamepadHelper.buttonDownEvent = new CustomEvent("gampadbuttondown", {
			detail: { gamepad, button }
		} as IButtonEvent);
	}

	static createButtonUpEvent(gamepad: number, button: number | string) {
		GamepadHelper.buttonUpEvent = new CustomEvent("gampadbuttonup", {
			detail: { gamepad, button }
		} as IButtonEvent);
	}

	/** Refresh the state of the gamepads connected to the system */
	static updateGamepads() {
		const gamepads = navigator.getGamepads();

		for (let i = 0; i < gamepads.length; i++) {
			const gamepad = gamepads[i];
			if (gamepad) {
				if (!GamepadHelper.gamepads[gamepad.index]) {
					console.log("gamepad " + gamepad.index + " connected");
				}
				GamepadHelper.gamepads[gamepad.index] = gamepad;
			}
		}
	}

	/** Main method intended to be called from within a game loop */
	static update() {
		GamepadHelper.updateGamepads();

		// skip if there are no gamepads connected
		if (Object.keys(GamepadHelper.gamepads).length < 1) return;

		Object.values(GamepadHelper.gamepads).forEach((gamepad) => {
			// check for changes in button state
			for (let i = 0; i < gamepad.buttons.length; i++) {
				const buttonLastUpdate =
					GamepadHelper.gamepadsLastUpdate[gamepad.index]?.buttons[i];
				const button = gamepad.buttons[i];
				let buttonLabel = i as number | string;

				if (GamepadHelper.mode == "xbox") {
					buttonLabel = GamepadHelper.getXboxButton(i);
				} else if (GamepadHelper.mode == "playstation") {
					buttonLabel = GamepadHelper.getPlaystationButton(i);
				}

				if (button?.value == 1 && buttonLastUpdate?.value == 0) {
					console.log(
						"gamepad " + gamepad.index + ": button " + buttonLabel + " is down"
					);
					GamepadHelper.createButtonDownEvent(gamepad.index, buttonLabel);
					document.dispatchEvent(GamepadHelper.buttonDownEvent);
				} else if (button?.value == 0 && buttonLastUpdate?.value == 1) {
					console.log("gamepad " + gamepad.index + ": button " + buttonLabel + " is up");
					GamepadHelper.createButtonUpEvent(gamepad.index, buttonLabel);
					document.dispatchEvent(GamepadHelper.buttonUpEvent);
				}
			}
		});

		// copy to a separate object in order to compare fields next update
		GamepadHelper.gamepadsLastUpdate = Object.assign({}, GamepadHelper.gamepads);
	}

	/** Return the state of the specified button */
	static getButtonValue(gamepad: number, button: number) {
		return GamepadHelper.gamepads[gamepad]?.buttons[button]?.value;
	}

	/** Return the state of the specified axis */
	static getAxisValue(gamepad: number, axis: number) {
		return GamepadHelper.gamepads[gamepad]?.axes[axis];
	}

	/** Convert to corresponding Xbox button label */
	static getXboxButton(button: number) {
		switch (button) {
			case 0:
				return "a";
			case 1:
				return "b";
			case 2:
				return "x";
			case 3:
				return "y";
			case 4:
				return "lb";
			case 5:
				return "rb";
			case 8:
				return "back";
			case 9:
				return "start";
			case 10:
				return "ls";
			case 11:
				return "rs";
			case 12:
				return "dpad-up";
			case 13:
				return "dpad-down";
			case 14:
				return "dpad-left";
			case 15:
				return "dpad-right";
			case 16:
				return "system";
			default:
				return button;
		}
	}

	/** Convert to corresponding Playstation button label */
	static getPlaystationButton(button: number) {
		switch (button) {
			case 0:
				return "cross";
			case 1:
				return "circle";
			case 2:
				return "square";
			case 3:
				return "triangle";
			case 4:
				return "l1";
			case 5:
				return "r1";
			case 8:
				return "select";
			case 9:
				return "start";
			case 10:
				return "l3";
			case 11:
				return "r3";
			case 12:
				return "dpad-up";
			case 13:
				return "dpad-down";
			case 14:
				return "dpad-left";
			case 15:
				return "dpad-right";
			case 16:
				return "system";
			default:
				return button;
		}
	}

	static setMode(mode: GamepadMode) {
		GamepadHelper.mode = mode;
	}
}
