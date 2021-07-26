The ```GamepadHelper``` class in ```gamepadhelper.js``` can be copied into any project, imported as a module into existing code, instantiated, and then used by calling the ```GamepadHelper.update()``` method within the game loop (see ```game.js``` for a simple example). Supports up to 4 gamepads connected simultaneously.

When a button on a connected gamepad is pressed or released, a custom event will be dispatched to the document containing the respective indexes of the gamepad and button that was pressed/released in the ```detail``` property of the event.

There are two custom event types:
- ```gamepadbuttondown``` - dispatched when the ```value``` property of any button changes from 0 to 1
- ```gamepadbuttonup``` - dispatched when the ```value``` property of any button changes from 1 to 0

Here is an example event listener that simply logs the gamepad/button that was pressed down:

```javascript
document.addEventListener('gamepadbuttondown', (event) => {
    console.log('button ' + event.detail.button + ' on gamepad ' + event.detail.gamepad + ' was pressed down');
});
```

Here is a code sample which causes player 1 to jump if button 0 on gamepad 0 is released:

```javascript
document.addEventListener('gamepadbuttonup', (event) => {
    if (event.detail.gamepad == 0 && event.detail.button == 0) {
        player1.jump();
    }
});
```

The current state of any button or axis on a connected gamepad can also be queried via the ```getButtonValue(gamepad, button)``` and ```getAxisValue(gamepad, axis)``` methods.

The ```mode``` property of an instance of the ```GamepadHelper``` class can be set 'default' to 'xbox' or 'playstation' to change the button labels if desired:

```javascript
let gamepadhelper = new GamepadHelper();
gamepadhelper.mode = 'xbox';
gamepadhelper.mode = 'playstation';
```

More info on the Gamepad API:
- https://www.w3.org/TR/gamepad/
- https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
