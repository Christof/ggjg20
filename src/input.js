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
    if (this.isDown("ArrowLeft") || this.isDown("a")) {
      return true;
    }
  },
  moveRight() {
    if (this.isDown("ArrowRight") || this.isDown("d")) {
      return true;
    }
  },
  moveUp() {
    if (this.isDown("ArrowUp") || this.isDown("w")) {
      return true;
    }
  },
  moveDown() {
    if (this.isDown("ArrowDown") || this.isDown("s")) {
      return true;
    }
  },
  hasAnyInput() {
    return this.current.key != null || this.hasGamepadMovementAboveThreshold();
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
