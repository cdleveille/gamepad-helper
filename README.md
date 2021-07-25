The ```GamepadHelper``` class in ```gamepadhelper.js``` can be copied into any project, imported as a module into existing code, instantiated, and then used by calling the ```GamepadHelper.update()``` method within the game loop (see ```game.js``` for a simple example).

When a button on a connected gamepad is pressed or released, a custom event will be dispatched to the document containing the respective indexes of the gamepad and button that was pressed/released in the ```detail``` property of the event.

There are two event types:
- ```gamepadbuttondown``` - dispatched when the ```value``` property of any button changes from 0 to 1
- ```gamepadbuttonup``` - dispatched when the ```value``` property of any button changes from 1 to 0

Here is an example event listener that simply logs the gamepad/button that was pressed down:

```
document.addEventListener('gamepadbuttondown', (event) => {
    console.log(event.detail.gamepad, event.detail.button);
});
```

The current state of any button or axis on a connected gamepad can also be queried via the ```getButtonValue(gamepad, button)``` and ```getAxisValue(gamepad, axis)``` methods.

The ```mode``` property of an instance of the ```GamepadHelper``` class can be set to 'xbox' or 'playstation' to change the button labels if desired:

```
let gamepadhelper = new GamepadHelper();
gamepadhelper.mode = 'xbox';
```

More info on the Gamepad API:
- https://www.w3.org/TR/gamepad/
- https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
