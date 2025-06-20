let buttonsDiv = null;
let outputDiv = null;
let tickStarted = false;
const gamepads = [];

function main() {
    outputDiv = document.getElementById('output');
    buttonsDiv = document.getElementById('buttons');
    outputDiv.innerHTML += '<p>Hello from JavaScript</p>';
    window.addEventListener('gamepadconnected', gamepadConnected);
}

function gamepadConnected(event) {
    outputDiv.innerHTML += `<p>Gamepad ${event.gamepad.id} connected in slot ${event.gamepad.index}</p>`;
    if (!tickStarted) {
        requestAnimationFrame(tick);
        tickStarted = true;
    }
}

function tick() {
    buttonsDiv.innerHTML = '';
    for (const gamepad of navigator.getGamepads()) {
        if (!gamepad) continue;
        const buttonValues = gamepad.buttons.map(b => b.pressed ? 1 : 0);
        const leftStick = axesToDir(gamepad.axes[0], gamepad.axes[1]);
        const rightStick = axesToDir(gamepad.axes[2], gamepad.axes[3]);
        buttonsDiv.innerHTML += `<p>${gamepad.index}:${[...buttonValues, leftStick, rightStick].join(',')}</p>`;
    }
    requestAnimationFrame(tick);
}

function axesToDir(a1, a2) {
    const e = 0.5;
    const dir = (0
        - 1 * (a1 < -e)
        + 1 * (a1 > e)
        - 3 * (a2 < -e)
        + 3 * (a2 > e)
    )
    switch (dir) {
        case -4: return 'NW';
        case -3: return 'N';
        case -2: return 'NE';
        case -1: return 'W';
        case 0: return 'C';
        case 1: return 'E';
        case 2: return 'SW';
        case 3: return 'S';
        default: return 'SE';
    }
}

window.onload = main;