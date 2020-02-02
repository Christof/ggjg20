export const Input = {
  gamepad_connected: false,
  gamepad_index: null as number,
  current: {
    keys: {} as { [key: string]: boolean }
  },
  getGamepadJoystick() {
    if (!this.gamepad_connected) return [undefined, undefined];

    let gamepad = navigator.getGamepads()[this.gamepad_index];
    return [gamepad.axes[0], gamepad.axes[1]];
  },
  isGamepadAButtonDown() {
    if (!this.gamepad_connected) return false;

    let gamepad = navigator.getGamepads()[this.gamepad_index];
    return gamepad.buttons[0].pressed;
  },
  isGamepadBButtonDown() {
    if (!this.gamepad_connected) return false;

    let gamepad = navigator.getGamepads()[this.gamepad_index];
    return gamepad.buttons[1].pressed;
  },
  isDown(key: string) {
    if (this.current.keys[key]) {
      return true;
    } else {
      return false;
    }
  },
  hasGamepadMovementAboveThreshold() {
    if (!this.gamepad_connected) return false;

    const [horizontal, vertical] = this.getGamepadJoystick();
    const movementThreshold = 0.1;
    return (
      Math.abs(horizontal) > movementThreshold &&
      Math.abs(vertical) > movementThreshold
    );
  },
  moveLeft() {
    if (this.isDown('ArrowLeft') || this.isDown('a')) {
      return true;
    }
  },
  moveRight() {
    if (this.isDown('ArrowRight') || this.isDown('d')) {
      return true;
    }
  },
  moveUp() {
    if (this.isDown('ArrowUp') || this.isDown('w')) {
      return true;
    }
  },
  moveDown() {
    if (this.isDown('ArrowDown') || this.isDown('s')) {
      return true;
    }
  },
  hasKeyboardMovementInput() {
    return (
      this.moveUp() || this.moveDown() || this.moveLeft() || this.moveRight()
    );
  },
  hasAnyMovementInput() {
    return (
      this.hasKeyboardMovementInput() || this.hasGamepadMovementAboveThreshold()
    );
  }
};

window.addEventListener('gamepadconnected', (ev: any) => {
  Input.gamepad_index = ev.gamepad.index;
  Input.gamepad_connected = true;
});

window.addEventListener('gamepaddisconnected', ev => {
  Input.gamepad_index = null;
  Input.gamepad_connected = false;
});

window.onkeydown = (ev: any) => {
  Input.current.keys[ev.key] = true;
};

window.onkeyup = (ev: any) => {
  Input.current.keys[ev.key] = false;
};
