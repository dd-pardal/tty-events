# tty-events #

`tty-events` is a fast package for handling events from the terminal, made for interactive, terminal-based applications.

## Features

- Full mouse and highlight tracking support (VT200 and SGR extended);
- Bracketed paste mode support;
- Focus support;
- Full UTF-8 support;
- Support for more key combinations (especially in Windows);
- Keys always have objects;
- Easy comparation (`key == "Ctrl+s"`);
- `unknownSequence` event.

## Usage Examples
### Keyboard

This script logs key presses:

```js
if (process.stdin.isTTY)
	process.stdin.setRawMode(true);

const term = new (require("tty-events"));

term.on("keypress", (key)=>{
	if (key == "Ctrl+c") {
		process.exit(0);
	}
	console.log("You pressed %s.", key.toString());
});
```

### Mouse

`tty-events` supports mouse (VT200 and SGR extended). In order to receive mouse events, the [`enableMouse()`](docs.md#module_tty-events--Terminal+enableMouse) function must be called first.

```js
term.enableMouse();

term.on("mousedown", (ev)=>{
	console.log("You clicked at (%i, %i) with the button no. %i.", ev.x, ev.y, ev.button);
});
```

For an highligh tracking example, see [the example highlight tracking script](https://github.com/dd-pardal/tty-events/blob/master/examples/highlight-tacking.js).

### Pasting

`tty-events` supports [bracketed paste mode](https://cirw.in/blog/bracketed-paste). This feature allows to distinguish between real keystrokes and pasted text from the clipboard. This is useful in applications where ceratin keys trigger some command. In order to receive paste events, the [`enableBPM()`](docs.md#module_tty-events--Terminal+enableBPM) function must be called first.

```js
term.enableBPM();

term.on("paste", (text)=>{
	console.log("You pasted %O.", text);
});
```

### Focus

Focus events allow an applicatioin to stop updating the screen when it's not necessary. In order to receive focus events, the [`enableFocus()`](docs.md#module_tty-events--Terminal+enableFocus) function must be called first.

```js
term.enableFocus();

term.on("focusin", ()=>{
	console.log("The terminal received focus.");
});
term.on("focusout", ()=>{
	console.log("The terminal lost focus.");
});
```

## Important Notes and Limitations

Because of the way terminals work, there are some aspects that might seem unintuitive.

### Uppercase VS Shift

An uppercase letter emits an event with the uppercase letter and with the `shift` property set to `false`. This is because there is no way to know if <kbd>Shift</kbd> was being pressed (an uppercase letter can be produced with <kbd>Caps Lock</kbd>). For example: <kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>A</kbd> emits `Alt+A` instead of `Alt+Shift+a`.

### “Twin” Keys

Some key combinations produce the same output to `stdin`. Here is a list of the key combinations that may not work as expected:

- <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>[letter]</kbd>: Emits `Ctrl+[letter]` (in lowercase). (The <kbd>Shift</kbd> modifier is ignored.)
- <kbd>Ctrl</kbd>+<kbd>H</kbd>: Emits `backspace`. (Terminals send `\b` when <kbd>Ctrl</kbd>+<kbd>H</kbd> is pressed.)
- <kbd>Ctrl</kbd>+<kbd>I</kbd>: Emits `tab`. (Terminals send `\t` when <kbd>Ctrl</kbd>+<kbd>I</kbd> is pressed.)
- <kbd>Ctrl</kbd>+<kbd>J</kbd>: Emits `enter`. (Terminals send `\n` when <kbd>Ctrl</kbd>+<kbd>J</kbd> is pressed.)
- <kbd>Ctrl</kbd>+<kbd>M</kbd>: Emits `enter`. (Terminals send `\r` when <kbd>Ctrl</kbd>+<kbd>M</kbd> is pressed.)
- <kbd>Ctrl</kbd>+<kbd>[</kbd>: Emits `escape`. (Terminals send `\x1b` when <kbd>Ctrl</kbd>+<kbd>[</kbd> is pressed.)
- <kbd>Shift</kbd>+<kbd>F1</kbd>: Emits `f11` in some terminals.
- <kbd>Shift</kbd>+<kbd>F2</kbd>: Emits `f12` in some terminals.

### Escape Key

Use of <kbd>Esc</kbd> (`escape`) is discouraged, since terminals send `\x1b` when <kbd>Esc</kbd> is pressed, which is the first byte of escape sequences.

### Incompatible Terminals

Also, some features and/or key combinations don't work in some terminal emulators:

- Mouse support isn't available in Windows Console.
- Bracketed paste mode isn't available in Windows Console.
- <kbd>Ctrl</kbd>+<kbd>@</kbd> doesn't work in Windows Console and in some keyboard layouts <kbd>Ctrl</kbd>+<kbd>\\</kbd>, <kbd>Ctrl</kbd>+<kbd>]</kbd>, <kbd>Ctrl</kbd>+<kbd>^</kbd> and <kbd>Ctrl</kbd>+<kbd>-</kbd> don't work too.
- Mouse highlight tracking works in few terminals, however _xterm_ supports it.

## API Documentation

The full documentation is available [here](https://github.com/dd-pardal/tty-events/blob/master/docs.md).
