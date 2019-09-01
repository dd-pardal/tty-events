# tty-input #

_tty-input_ is a fast library for handling input (keyboard, mouse and bracketed paste mode) from the terminal made for interactive, terminal-based applications.

## Usage Examples
### Keyboard

Here's a simple logger:

```js
if (process.stdin.isTTY)
	process.stdin.setRawMode(true);

const te = new (require("./index.js"));

te.on("keypress", (key)=>{
	if (key == "Ctrl+c") {
		process.exit(0)
	}
	console.log("You pressed %s.", key.toString())
})
```

### Mouse

_tty-input_ supports mouse (VT200 and SGR extended). In order to receive mouse events, the `enableMouse()` function must be called first.

```js
enableMouse();

te.on("mousedown", (ev)=>{
	console.log("You clicked at (%i, %i) with the button no. %i.", ev.x, ev.y, ev.button)
})
```

### Pasting

_tty-input_ supports [bracketed paste mode](https://cirw.in/blog/bracketed-paste). This feature allows to distinguish between real keystrokes and pasted text from the clipboard. This is useful in applications where ceratin keys trigger some command. In order to receive paste events, the `enableBPM()` function must be called first.

```js
enableBPM();

te.on("paste", (text)=>{
	console.log("You pasted %O.", text)
})
```

## Important Notes and Limitations

Because of the way terminals work, there are some aspects that might seem unintuitive.

### Uppercase VS Shift

An uppercase letter emits an event with the uppercase letter and with the `shift` property set to `false`. This is because there is no way to know if <kbd>Shift</kbd> was being pressed (an uppercase letter can be produced with <kbd>Caps Lock</kbd>). For example: <kbd>Meta</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd> emits `Meta+A` instead of `Meta+Shift+a`.

### Meta Modifier

The `Meta` modifier might not be correspond to the <kbd>Meta</kbd> or <kbd>Windows</kbd> keys. It's usually <kbd>Alt</kbd>.

### "Twin" Keys

Some key combinations produce the same output to `stdin`. Here is a list of most (if not all) the key combinations that may not work as expected:

- <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>[letter]</kbd>: Emits `Ctrl+[letter]` (in lowercase). (The <kbd>Shift</kbd> modifier is ignored.)
- <kbd>Ctrl</kbd>+<kbd>M</kbd>: Emits `enter`. (Terminals send `\r` when <kbd>Ctrl</kbd>+<kbd>M</kbd> is pressed.)
- <kbd>Ctrl</kbd>+<kbd>J</kbd>: Emits `enter`. (Terminals send `\n` when <kbd>Ctrl</kbd>+<kbd>J</kbd> is pressed.)
- <kbd>Ctrl</kbd>+<kbd>I</kbd>: Emits `tab`. (Terminals send `\t` when <kbd>Ctrl</kbd>+<kbd>I</kbd> is pressed.)
- <kbd>Ctrl</kbd>+<kbd>H</kbd>: Emits `backspace`. (Terminals send `\b` when <kbd>Ctrl</kbd>+<kbd>H</kbd> is pressed.)
- <kbd>Ctrl</kbd>+<kbd>[</kbd>: Emits `escape`. (Terminals send `\x1b` when <kbd>Ctrl</kbd>+<kbd>[</kbd> is pressed.)
- <kbd>Shift</kbd>+<kbd>F1</kbd>: Emits `f11` in some terminals.
- <kbd>Shift</kbd>+<kbd>F2</kbd>: Emits `f12` in some terminals.

### Escape Key

Use of <kbd>Esc</kbd> (`escape`) is discouraged, since terminals send `\x1b` when <kbd>Esc</kbd> is pressed, which is the first byte of escape sequences.

### Incompatible Terminals

Also, some features and/or key combinations don't work in some terminal emulators:

- Mouse support isn't available in Windows Console.
- Bracketed paste mode isn't available in Windows Console.