# gamepad-helper

Lightweight wrapper class for the HTML5 Gamepad API.

```bash
$ npm i gamepad-helper

$ yarn add gamepad-helper
```

The `GamepadHelper` class can be imported and used by calling the `GamepadHelper.update()` static method within your game loop.

```javascript
import GamepadHelper from "gamepad-helper";

// ...within game loop
GamepadHelper.update();
```

When a button on a connected gamepad is pressed or released, a `CustomEvent` will be dispatched to the document containing a `detail` property identifying the gamepad/button that was pressed/released.

There are two `CustomEvent` types:

-   `gamepadbuttondown` - dispatched when the `value` property of any button changes from `0` to `1`
-   `gamepadbuttonup` - dispatched when the `value` property of any button changes from `1` to `0`

Here is an example that simply logs the gamepad/button that was pressed down:

```javascript
// JavaScript
document.addEventListener("gamepadbuttondown", (event) => {
	const { button, gamepad } = event.detail;
	console.log(`button ${button} on gamepad ${gamepad} was pressed down`);
});

// TypeScript
import type { IGamepadButtonEventDetail } from "gamepad-helper";
document.addEventListener("gamepadbuttondown", (event: CustomEvent<IGamepadButtonEventDetail>) => {
	const { button, gamepad } = event.detail;
	console.log(`button ${button} on gamepad ${gamepad} was pressed down`);
});
```

Here is an example which causes player 1 to jump if button 0 on gamepad 0 is released:

```javascript
// JavaScript
document.addEventListener("gamepadbuttonup", (event) => {
	const { button, gamepad } = event.detail;
	if (gamepad === 0 && button === 0) {
		player1.jump();
	}
});

// TypeScript
import type { IGamepadButtonEventDetail } from "gamepad-helper";
document.addEventListener("gamepadbuttonup", (event: CustomEvent<IGamepadButtonEventDetail>) => {
	const { button, gamepad } = event.detail;
	if (gamepad === 0 && button === 0) {
		player1.jump();
	}
});
```

The instantaneous state of any button or axis on a connected gamepad can also be queried via the `GamepadHelper.getButtonValue()` and `GamepadHelper.getAxisValue()` static methods.

To log informational output to the console, set `GamepadHelper.logOutput` to `true` (`false` by default):

```javascript
GamepadHelper.logOutput = true;
```

```text
gamepad 0 connected
gamepad 0: button 0 is down
gamepad 0: button 0 is up
```

Check it out on npm:

-   https://www.npmjs.com/package/gamepad-helper

More info on the Gamepad API:

-   https://www.w3.org/TR/gamepad/
-   https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
