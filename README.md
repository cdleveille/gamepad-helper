```bash
npm install gamepad-helper
	or
yarn add gamepad-helper
```

The `GamepadHelper` class imported as a module into existing code and used by calling the static `GamepadHelper.update()` method within the game loop. Supports up to 4 gamepads connected simultaneously.

```javascript
import GamepadHelper from "gamepad-helper";

// call inside game loop
GamepadHelper.update();
```

When a button on a connected gamepad is pressed or released, a custom event will be dispatched to the document containing a `detail` property identifying the gamepad/button that was pressed/released.

There are two custom event types:

-   `gamepadbuttondown` - dispatched when the `value` property of any button changes from `0` to `1`
-   `gamepadbuttonup` - dispatched when the `value` property of any button changes from `1` to `0`

Here is an example that simply logs the gamepad/button that was pressed down:

```javascript
document.addEventListener("gamepadbuttondown", (event) => {
	console.log(
		"button " +
			event.detail.button +
			" on gamepad " +
			event.detail.gamepad +
			" was pressed down"
	);
});
```

Here is an example which causes player 1 to jump if button 0 on gamepad 0 is released:

```javascript
document.addEventListener("gamepadbuttonup", (event) => {
	if (event.detail.gamepad == 0 && event.detail.button == 0) {
		player1.jump();
	}
});
```

The instantaneous state of any button or axis on a connected gamepad can also be queried via the `getButtonValue()` and `getAxisValue()` methods.

The `mode` property of an instance of the `GamepadHelper` class can be set to `default` (numeric labels), `xbox`, or `playstation` to change the button labels if desired:

```javascript
GamepadHelper.setMode("default");
GamepadHelper.setMode("xbox");
GamepadHelper.setMode("playstation");
```

More info on the Gamepad API:

-   https://www.w3.org/TR/gamepad/
-   https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
