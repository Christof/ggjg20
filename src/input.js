const Input = {
  gamepad_connected: false,
  gamepad_index: null,
  current: {
    keys: {}
  },
  getGamepadJoystick() {
    if (!this.gamepad_connected) {
      let gamepad = navigator.getGamepads()[this.gamepad_index];
      return [gamepad.axes[0], gamepad.axes[1]];
    }
  },
  isDown(key) {
    if (this.current.keys[key]) {
      return true;
    }
    else {
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
    if (this.hasGamepadMovementAboveThreshold()) {
      if (this.getGamepadJoystick()[0] < 0) {
        return true;
      }
    }
    if (this.isDown("ArrowLeft")) {
      return true;
    }
  },
  moveRight() {
    if (this.hasGamepadMovementAboveThreshold()) {
      if (this.getGamepadJoystick()[0] > 0) {
        gamepad_movement = true;
      }
    }
    if (this.isDown("ArrowRight")) {
      return true;
    }
  },
  moveUp() {
    if (this.hasGamepadMovementAboveThreshold()) {
      if (this.getGamepadJoystick()[1] < 0) {
        return true;
      }
    }
    if (this.isDown("ArrowUp")) {
      return true;
    }
  },
  moveDown() {
    if (this.hasGamepadMovementAboveThreshold()) {
      if (this.getGamepadJoystick()[0] > 0) {
        return true;
      }
    }
    if (this.isDown("ArrowDown")) {
      return true;
    }
  }
};

window.addEventListener("gamepadconnected", ev => {
  Input.gamepad_index = ev.gamepad.index;
  Input.gamepad_connected = true;
});

window.addEventListener("gamepaddisconnected", ev => {
  Input.gamepad_index = null;
  Input.gamepad_connected = false;
});

window.onkeydown = (ev) => {
  Input.current.keys[ev.key] = true;
};

window.onkeyup = (ev) => {
  Input.current.keys[ev.key] = false;
};

module.exports = Input;
