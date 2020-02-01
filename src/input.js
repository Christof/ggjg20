const Input = {
    gamepad_connected: false,
  gamepad_index: null,
  current: {
    key: null,
  },
  getGamepadJoystick() {
      if (this.gamepad_index != null) {
        let gamepad = navigator.getGamepads()[this.gamepad_index];
        return [gamepad.axes[0], gamepad.axes[1]];
      }
  },
  isDown(key) {
    if (key == this.current.key) {
      return true;
    }
  }
};

window.addEventListener("gamepadconnected", (ev) => {
    Input.gamepad_index = ev.gamepad.index;
    Input.gamepad_connected = true;
});

window.addEventListener("gamepaddisconnected", (ev) => {
    Input.gamepad_index = null;
    Input.gamepad_connected = false;
});

window.onkeydown = ev => {
  Input.current.key = ev.key;
};

window.onkeyup = () => {
  Input.current.key = null;
};

module.exports = Input;
