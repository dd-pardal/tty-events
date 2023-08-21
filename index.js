/**
 * @module tty-events
 */

const EventEmitter = require("events"),
{ StringDecoder } = require('string_decoder');

/**
 */
class KeyboardEvent {
	/**
	 * @classdesc Represents a keyboard event (key or key combination).
	 * @hideconstructor
	 * @alias module:tty-events.KeyboardEvent
	 */
	constructor(
		{
			name,
			sequence,
			isSpecial = false,
			ctrl = false,
			alt = false,
			shift = false
		}
	) {		
		if (typeof name !== "string")
			throw new TypeError();

		/**
		 * The key name (for special keys) or character produced by the key.
		 * @type {string}
		 */
		this.name = name;

		/**
		 * The sequence produced by the key / key combination.
		 * @type {string}
		 */
		this.sequence = sequence;

		/**
		 * Determines if the key is a special key. Special keys have names like `f2` or `backspace` or are a combination of Ctrl+symbol / Ctrl+letter.
		 * @type {boolean}
		 */
		this.isSpecial = isSpecial;

		/**
		 * Determines if the Ctrl modifier was being pressed with the key. If the key is not a special key, this is always `false`.
		 * @type {boolean}
		 */
		this.ctrl = ctrl;

		/**
		 * Determines if the Alt modifier was being pressed with the key.
		 * @type {boolean}
		 */
		this.alt = alt;

		/**
		 * Determines if the Shift modifier was being pressed with the key. If the key is not a special key, this is always `false`.
		 * @type {boolean}
		 */
		this.shift = shift;
	}

	/**
	 * Determines if the Alt modifier was being pressed with the key. Present for compatibility with the `readline` module.
	 * @type {boolean}
	 */
	get meta() {
		return this.alt;
	}
	set meta(value) {
		this.alt = value;
	}

	/**
	 * Represents the key combination with a string in the format `["Ctrl+"]["Alt+"]["Shift+"]key.name`. For example: `"b"`, `"B"`, `"Ctrl+e"`, `"Ctrl+Shift+home"`, `"+"`.
	 */
	toString() {
		return (this.ctrl? "Ctrl+":"") +
			(this.alt? "Alt+":"") +
			(this.shift? "Shift+":"") +
			this.name
	}
}

class MouseEvent {
	/**
	 * @classdesc Represents a mouse event (click, wheel, etc.).
	 * @hideconstructor
	 * @alias module:tty-events.MouseEvent
	 */
	constructor(opts) {
		Object.assign(this, opts)
	}
}
/**
 * The x coordinate of where the mouse event happened (1 = leftmost column).
 * 
 * @name module:tty-events.MouseEvent#x
 * @type {number}
 */
/** 
 * The y coordinate of where the mouse event happened (1 = topmost row).
 * 
 * @name module:tty-events.MouseEvent#y
 * @type {number}
 */
/**
 * The button number, in the range 1-11. This property might be `undefined` for `mouseup` and `mousemove` events. If `undefined` in a `mousemove` event, no button was pressed when the cursor moved.
 * 
 * List of mouse buttons (from {@link http://xahlee.info/linux/linux_x11_mouse_button_number.html}):
 * 
 * - `1`: Left button
 * - `2`: Middle (wheel) button
 * - `3`: Right button
 * - `4`: Rotate wheel up
 * - `5`: Rotate wheel down
 * - `6`: Push wheel left
 * - `7`: Push wheel right
 * - `8`: 4th button or XButton1 (browser back)
 * - `9`: 5th button or XButton2 (browser forward)
 * 
 * @name module:tty-events.MouseEvent#button
 * @type {number?}
 */
/**
 * Determines if the Ctrl modifier was being pressed when the mouse event occurred.
 * 
 * @name module:tty-events.MouseEvent#ctrl
 * @type {boolean}
 */
/**
 * Determines if the Alt modifier was being pressed when the mouse event occurred.
 * 
 * @name module:tty-events.MouseEvent#alt
 * @type {boolean}
 */
/**
 * Determines if the Shift modifier was being pressed when the mouse event occurred.
 * 
 * @name module:tty-events.MouseEvent#shift
 * @type {boolean}
 */
/**
 * Type of mouse event (`mousedown`, `mouseup`, `mousemove` or `wheel`).
 * 
 * @name module:tty-events.MouseEvent#type
 * @type {string}
 */
/**
* Only for `wheel` events. Direction of the wheel turn (1 = down; -1 = up).
* 
* @name module:tty-events.MouseEvent#direction
* @type {number?}
*/

/**
 */
class HighlightEvent {
	/**
	 * @classdesc Represents a highlight selection.
	 * @hideconstructor
	 * @alias module:tty-events.HighlightEvent
	 */
	constructor(startX, startY ,endX, endY, mouseX, mouseY) {		
		/**
		 * The x coordinate of the first character of the selection.
		 * @type {number}
		 */
		this.startX = startX;

		/**
		 * The y coordinate of the first character of the selection.
		 * @type {number}
		 */
		this.startY = startY;

		/**
		 * The x coordinate of the first character after the selection.
		 * @type {number}
		 */
		this.endX = endX;

		/**
		 * The y coordinate of the first character after the selection.
		 * @type {number}
		 */
		this.endY = endY;

		/**
		 * The x coordinate of the mouse position.
		 * @type {number}
		 */
		this.mouseX = mouseX;

		/**
		 * The y coordinate of the mouse position.
		 * @type {number}
		 */
		this.mouseY = mouseY;
	}
}


/*******************************************************************************\
|  Below is modified code from the node repository.                             |
|  <https://github.com/nodejs/node/blob/master/lib/internal/readline/utils.js>  |
|                                                                               |
\*******************************************************************************/

/*
	Some patterns seen in terminal key escape codes, derived from combos seen
	at http://www.midnight-commander.org/browser/lib/tty/key.c
	ESC letter
	ESC [ letter
	ESC [ modifier letter
	ESC [ 1 ; modifier letter
	ESC [ num char
	ESC [ num ; modifier char
	ESC O letter
	ESC O modifier letter
	ESC O 1 ; modifier letter
	ESC N letter
	ESC [ [ num ; modifier char
	ESC [ [ 1 ; modifier letter
	ESC ESC [ num char
	ESC ESC O letter
	- char is usually ~ but $ and ^ also happen with rxvt
	- modifier is 1 +
	                (shift     * 1) +
	                (left_alt  * 2) +
	                (ctrl      * 4) +
	                (right_alt * 8)
	- two leading ESCs (~~apparently mean the same as one leading ESC~~) mean that the Alt key was being pressed.
*/

/**
 * A generator function that accepts characters from the input stream as inputs to `iterator.next()` and emits the events.
 * 
 * @param {module:tty-input} term
 * @private
 */
function* emitKeys(term) {
	/**
	 * @param {number} b The encoded button value
	 * @param {number} x The x coordinate of the event
	 * @param {number} y The y coordinate of the event
	 * @param {boolean} mouseUp If it is a mouseup event (used by SGR).
	 */
	function parseAndEmitMouse(b, x, y, mouseUp = false) {
		if (b<0 || x<1 || y<1 || isNaN(b) || isNaN(x) || isNaN(y)) // Sometimes, rxvt sends mouse sequences with negative coordinates.
			return;

		/* Quotes (indicated by "//>") are from <https://invisible-island.net/xterm/ctlseqs/ctlseqs.pdf> */

		let button, evType, evOpts = {x, y};

		//> The low two bits of Cb encode button information: 0=MB1 pressed, 1=MB2 pressed, 2=MB3 pressed, 3=release.
		button = b & 3;

		//> Additional buttons are encoded like the wheel mice,
		//>   • by adding 64 (for buttons 4 through 7), or
		//>   • by adding 128 (for buttons 8 through 11).
		if (b & 64 || b & 128) {
			if (b & 64)
				button |= 4;
			if (b & 128)
				button |= 8;

		} else if (button === 3)
			button = undefined;
		else
			button += 1; // Only increment button if in the range 0-2.

		evOpts.button = button;

		//> On button-motion events, xterm adds 32 to the event code (the third character, Cb).
		if (b & 32) {
			evType = "mousemove";

		} else if (button === undefined || mouseUp) {
			evType = "mouseup";

		} else if (button === 4) {
			evType = "wheel";
			evOpts.direction = -1;

		} else if (button === 5) {
			evType = "wheel";
			evOpts.direction = 1;

		} else {
			evType = "mousedown";
		}


		//> The next three bits encode the modifiers which were down when the button was pressed
		//> and are added together: 4=Shift, 8=Alt, 16=Control.
		//> Note however that the shift and control bits are normally unavailable because xterm uses the control modifier
		//> with mouse for popup menus, and the shift modifier is used in the default translations for button events.
		evOpts.shift = Boolean(b & 4);
		evOpts.alt = Boolean(b & 8);
		evOpts.ctrl = Boolean(b & 16);

		evOpts.type = evType;

		term.emit(evType, new MouseEvent(evOpts));
		term.emit("mouse", new MouseEvent(evOpts));
	}
	function parseAndEmitHighlight(args) {
		var startX, startY ,endX, endY, mouseX, mouseY;

		if (args.length === 6) //  ESC [ T ... *or* ESC [ < ... T
			// Apparently this happens if either the start position changed (backwards selection) or
			// if the mouse position is not the same as the end position (new line).
			[startX, startY ,endX, endY, mouseX, mouseY] = args;

		else { // ESC [ t ... *or* ESC [ < ... t
			endX = mouseX = args[0];
			endY = mouseY = args[1];
		}

		term.emit("highlight", new HighlightEvent(startX, startY ,endX, endY, mouseX, mouseY))
	}
	function emitEsc() {
		term.emit("keypress", new KeyboardEvent({name: "escape", sequence: "\x1b", isSpecial: true}))
	}

	/**
	 * Was the last char a carriage return?
	 */
	var lastCharWasCR = false,

	/**
	 * The last character to be read.
	 */
	ch = yield,

	/**
	 * The sequence.
	 */
	s;

	main: while (true) {
		if (ch === "") {
			ch = yield;
			continue;
		}

		s = ch;


		const key = {
			name: undefined,
			sequence: undefined,
			isSpecial: true,
			ctrl: false,
			alt: false,
			shift: false
		};
		let escaped = 0;

		if (ch === "\x1b") { // ESC
			escaped = 1;
			s += (ch = yield);

			if (ch === "\x1b") { // ESC ESC
				escaped = 2;
				s += (ch = yield);
			}

			if (ch === "" || (s.length > 1 && ch === "\x1b")) { // ESC [ESC] timeout *or* ESC ESC ESC
				term.emit("keypress", new KeyboardEvent({
					name: "escape",
					sequence: s,
					isSpecial: true
				}))

				ch = yield;
				if (ch === "") { // ESC ESC ESC timeout
					ch = yield;
				}

				continue;
			}
		}

		if (escaped && (ch === 'O' || ch === '[')) {
			// Escape sequence
			/**
			 * The processed code (without modifier).
			 */
			let code = ch;
			let modifier = 0;


			if (ch === 'O') {
				// SS3 sequences:
				//
				// ESC O letter
				// ESC O modifier letter
				s += (ch = yield);

				if (ch >= '0' && ch <= '9') {
					modifier = (ch >> 0) - 1;
					s += (ch = yield);
				} else if (ch === "") { // Alt+O
					term.emit("keypress", new KeyboardEvent({
						name: "O",
						sequence: s,
						alt: true
					}));
					ch = yield;
					continue main;
				}

				code += ch;
			} else if (ch === '[') {
				// CSI sequences:
				//
				// ESC [ letter
				// ESC [ modifier letter
				// ESC [ [ modifier letter
				// ESC [ [ num char
				const seqStart = s.length;
				s += (ch = yield);

				if (ch === "") { // Alt+[
					term.emit("keypress", new KeyboardEvent({
						name: "[",
						sequence: s,
						alt: true
					}));
					ch = yield;
					continue main;
				}

				if (ch === "M") { // MOUSE
					const args = [];

					for (let i=0; i<3; i++) {
						let byte = yield true;
						if (byte === "") {
							term.emit("unknownSequence", s);
							ch = yield;
							continue main;
						}
						args.push(byte - 0x20)
					}

					parseAndEmitMouse(...args);

					ch = yield;
					continue;
				} else if (ch === "T" || ch === "t") { // MOUSE HIGHLIGHT TRACKING
					const mode = ch, argsLength = mode==="T"? 6:2;

					const args = [];

					for (let i=0; i<argsLength; i++) {
						let byte = yield true;
						if (byte === "") {
							term.emit("unknownSequence", s);
							ch = yield;
							continue main;
						}
						args.push(byte - 0x20)
					}

					parseAndEmitHighlight(args);

					ch = yield;
					continue;
				}

				if (ch === '[') {
					// \x1b[[A
					//      ^--- escape codes might have a second bracket
					code += ch;
					s += (ch = yield);
				}

				/*
				 * Here and later we try to buffer just enough data to get
				 * a complete ascii sequence.
				 *
				 * We have basically two classes of ascii characters to process:
				 *
				 *
				 * 1. `\x1b[24;5~` should be parsed as { code: '[24~', modifier: 5 }
				 *
				 * This particular example is featuring Ctrl+F12 in xterm.
				 *
				 *	- `;5` part is optional, e.g. it could be `\x1b[24~`
				 *	- first part can contain one or two digits
				 *
				 * So the generic regexp is like /^\d\d?(;\d)?[~^$]$/
				 *
				 *
				 * 2. `\x1b[1;5H` should be parsed as { code: '[H', modifier: 5 }
				 *
				 * This particular example is featuring Ctrl+Home in xterm.
				 *
				 *	- `1;5` part is optional, e.g. it could be `\x1b[H`
				 *	- `1;` part is optional, e.g. it could be `\x1b[5H`
				 *
				 * So the generic regexp is like /^((\d;)?\d)?[A-Za-z]$/
				 *
				 */
				const cmdStart = s.length - 1;

				/*
				 * Here we buffer the sequence into `s`.
				 *
				 * CSI sequences can only contain bytes in the range 0x20-0x3f,
				 * and end with a byte in the range 0x40-0x7e.
				 */
				while (true) {
					const charCode = ch.charCodeAt(0);
					if ((charCode >= 0x40 && charCode <= 0x7e) || charCode === 0x24) { // Not in the spec, but $ can end a sequence.
						// End of sequence
						break;

					} else if (charCode >= 0x20 && charCode <= 0x3f) {
						s += (ch = yield);

					} else {
						// The sequence is broken.
						term.emit("unknownSequence", s);
						continue main;

					}
				}

				// We buffered enough data.
				const seq = s.slice(seqStart);

				// CSI sequences might not represent a key.
				if (
					(seq[0] === "<" && (ch==="M" || ch==="m")) ||
					(seq[0] === "<" && (ch==="T" || ch==="t")) ||
					ch === "I" ||
					ch === "O" ||
					seq === "200~"
				) {
					/* These sequences should not be preceded with an extra ESC.
					 * If that happens, it's probably because the Esc key was pressed.
					 */
					if (escaped >= 2)
						emitEsc();

					if (ch==="M" || ch==="m" || ch==="T" || ch==="t") {
						/**
						 * - `true`: SGR extended mouse;
						 * - `false`: Highlight tracking.
						 */
						const mouse = ch==="M" || ch==="m",

						args = seq.slice(1, seq.length-1).split(";");

						let err = args.length !== (mouse? 3:(ch === "t"? 2:6));

						if (!err) {
							for (let i=0; i<args.length; i++) {
								const n = parseInt(args[i]);
								if (isNaN(n)) {
									err = true;
									break;
								}
								args[i] = n;
							};
						}

						if (err) {
							term.emit("unknownSequence", s);

						} else {
							if (mouse) { // SGR MOUSE
								parseAndEmitMouse(
									...args,
									ch === "m"
								);
							} else /* if (ch==="T" || ch==="t") */ { // HIGHLIGHT TRACKING
								parseAndEmitHighlight(args);
							}
						}
					} else if (ch === "I") { // FOCUS IN
						term.emit("focusin");

					} else if (ch === "O") { // FOCUS OUT
						term.emit("focusout");

					} else if (seq === "200~") { // BRACKETED PASTE MODE

						// Loop until an ESC [ 2 0 1 ~ is received.
						const endSeq = "\x1b[201~";
						let str = "", endSeqIndex = 0;
						while (true) {
							str += (ch = yield);

							if (ch === endSeq[endSeqIndex])
								endSeqIndex++;
							else
								endSeqIndex = 0;

							if (endSeqIndex >= endSeq.length) {
								// An ESC [ 2 0 1 ~ was received.

								term.emit("paste", str.slice(0, str.length - endSeq.length));
								break;
							}
						}
					}

					ch = yield;
					continue;
				}

				// Now trying to extract code and modifier from it.
				const cmd = s.slice(cmdStart);
				let match;

				if ((match = cmd.match(/^(\d\d?)(;(\d))?([~^$])$/))) {
					code += match[1] + match[4];
					modifier = (match[3] || 1) - 1;
				} else if ((match = cmd.match(/^((\d;)?(\d))?([A-Za-z])$/))) {
					code += match[4];
					modifier = (match[3] || 1) - 1;
				} else {
					code += cmd;
				}

				/* The ending char of the code indicates modifiers in some terminals.
				 * Here, the ending char is parsed and replaced by `~`.
				 */
				switch (code[code.length - 1]) {
					case "$":
						key.shift = true;
						code = code.slice(0, code.length-1)+"~";
						break;

					case "^":
						key.ctrl = true;
						code = code.slice(0, code.length-1)+"~";
						break;

					case "@":
						key.shift = key.ctrl = true;
						code = code.slice(0, code.length-1)+"~";
						break;
				}
			}

			// Parse the key modifier
			key.ctrl = key.ctrl || Boolean(modifier & 4);
			key.alt = Boolean(modifier & 10);
			key.shift = key.shift || Boolean(modifier & 1);

			if (escaped >= 2) {
				// Double-escaped sequences usually mean that the Alt key was being pressed.
				key.alt = true;
			}

			// Parse the key code
			if (code.match(/^(O|\[)[A-Z]$/)) {
				// ESC O letter and ESC [ letter are equivalent.

				switch (code[1]) {
					/* xterm/gnome */
					case 'A': key.name = 'up'; break;
					case 'B': key.name = 'down'; break;
					case 'C': key.name = 'right'; break;
					case 'D': key.name = 'left'; break;
					case 'E': key.name = 'clear'; break;
					case 'F': key.name = 'end'; break;
					case 'H': key.name = 'home'; break;

					case 'P': key.name = 'f1'; break;
					case 'Q': key.name = 'f2'; break;
					case 'R': key.name = 'f3'; break;
					case 'S': key.name = 'f4'; break;
				}
			} else {
				switch (code) {
					/* xterm/rxvt ESC [ number ~ */
					case '[11~': key.name = 'f1'; break;
					case '[12~': key.name = 'f2'; break;
					case '[13~': key.name = 'f3'; break;
					case '[14~': key.name = 'f4'; break;

					/* from Cygwin and used in libuv */
					case '[[A': key.name = 'f1'; break;
					case '[[B': key.name = 'f2'; break;
					case '[[C': key.name = 'f3'; break;
					case '[[D': key.name = 'f4'; break;
					case '[[E': key.name = 'f5'; break;

					/* common */
					case '[15~': key.name = 'f5'; break;
					case '[17~': key.name = 'f6'; break;
					case '[18~': key.name = 'f7'; break;
					case '[19~': key.name = 'f8'; break;
					case '[20~': key.name = 'f9'; break;
					case '[21~': key.name = 'f10'; break;
					case '[23~': key.name = 'f11'; break;
					case '[24~': key.name = 'f12'; break;

					/* Extended function keys */
					case '[25~': key.name = 'f3'; key.shift = true; break;
					case '[26~': key.name = 'f4'; key.shift = true; break;
					case '[28~': key.name = 'f5'; key.shift = true; break;
					case '[29~': key.name = 'f6'; key.shift = true; break;
					case '[31~': key.name = 'f7'; key.shift = true; break;
					case '[32~': key.name = 'f8'; key.shift = true; break;
					case '[33~': key.name = 'f9'; key.shift = true; break;
					case '[34~': key.name = 'f10'; key.shift = true; break;

					/* xterm/rxvt ESC [ number ~ */
					case '[1~': key.name = 'home'; break;
					case '[2~': key.name = 'insert'; break;
					case '[3~': key.name = 'delete'; break;
					case '[4~': key.name = 'end'; break;
					case '[5~': key.name = 'pageup'; break;
					case '[6~': key.name = 'pagedown'; break;

					/* putty */
					case '[[5~': key.name = 'pageup'; break;
					case '[[6~': key.name = 'pagedown'; break;

					/* rxvt */
					case '[7~': key.name = 'home'; break;
					case '[8~': key.name = 'end'; break;

					/* rxvt keys with modifiers */
					case '[a': key.name = 'up'; key.shift = true; break;
					case '[b': key.name = 'down'; key.shift = true; break;
					case '[c': key.name = 'right'; key.shift = true; break;
					case '[d': key.name = 'left'; key.shift = true; break;
					case '[e': key.name = 'clear'; key.shift = true; break;

					case 'Oa': key.name = 'up'; key.ctrl = true; break;
					case 'Ob': key.name = 'down'; key.ctrl = true; break;
					case 'Oc': key.name = 'right'; key.ctrl = true; break;
					case 'Od': key.name = 'left'; key.ctrl = true; break;
					case 'Oe': key.name = 'clear'; key.ctrl = true; break;

					/* misc. */
					case '[Z': key.name = 'tab'; key.shift = true; break;

					// default: key.name = undefined; break;
				}
			}

			key.sequence = s;

			if (key.name !== undefined) {
				term.emit("keypress", new KeyboardEvent(key))
			} else {
				/* Unrecognized escape sequence */
				term.emit("unknownSequence", s)
			}

			ch = yield;
			continue;
		} else {
			// Key is not an escape sequence, but might be escaped.

			if (escaped >= 2)
				emitEsc();

			key.alt = Boolean(escaped); // In most terminals, typing a character while holding Alt precedes the char with an ESC.
			key.sequence = s;

			if (ch === '\r') {
				// Enter
				key.name = 'enter';

			} else if (ch === '\n') {
				if (lastCharWasCR) { // Ignore \n in \r\n.
					ch = yield;
					continue;
				}

				// \n without \r
				key.name = 'enter';

			} else if (ch === '\t') {
				// Tab
				key.name = 'tab';

			} else if (ch === '\b' || ch === '\x7f') {
				// Backspace or Ctrl+h
				key.name = 'backspace';

			} else if (ch === ' ') {
				key.name = 'space';

			} else if (ch <= '\x1e') {
				// ^@, ^A-Z, ^\, ^], ^^
				// Note: ^@ can also be obtained using Ctrl+␣ in most terminals.
				key.name = String.fromCharCode(ch.charCodeAt(0) + 0x40).toLowerCase();
				key.ctrl = true;

			} else if (ch === '\x1f') {
				// In most terminals ^_ is obtained by Ctrl+-.
				key.name = "-";
				key.ctrl = true;

			} else {
				// Character (letter, number, symbol, etc...).

				key.isSpecial = false;
				key.name = ch;
				key.sequence = (escaped? "\x1b":"") + key.name;
			}
		}

		term.emit("keypress", new KeyboardEvent(key))

		lastCharWasCR = ch === "\r";

		ch = yield;
	}
}
/**************************************************\
|  End of modified code from the node repository.  |
|                                                  |
\**************************************************/


/**
 * @typedef TermOptions
 * @property {number} timeout=500 The escape sequence timeout, in milliseconds. `tty-events` will stop waiting for the rest of an escape sequence when the timeout fires. `Infinity` = no timeout.
 * @property {string} encoding=utf-8 The encoding of the input stream.
 */

/**
 * Emits terminal-related events.
 * 
 * @alias module:tty-events
 */
class Terminal extends EventEmitter {
	/**
	 * @param {ReadableStream} input The input stream. (Normally stdin.)
	 * @param {WritableStream} output The output stream for activating mouse support and bracketed paste mode. (Normally stdout.) Optional.
	 * @param {TermOptions} options
	 */
	constructor(input = process.stdin, output, {
		escKeyTimeout = 500,
		timeout = escKeyTimeout,
		encoding
	} = {}) {
		super()

		const stringDecoder = new StringDecoder(encoding),
		iterator = emitKeys(this);

		/**
		 * The value returned by `iterator.next()`. (`false`: iterator expects a char; `true`: iterator expects a byte.)
		 */
		var sendByte = iterator.next().value

		this._dataListener = (buf) => {
			for (let i=0; i<buf.length; i++) {
				if (sendByte)
					sendByte = iterator.next(buf[i]).value;
				else {
					// Decode a character
					let str = stringDecoder.write(Buffer.from([buf[i]]));

					// Send the character(s) to the generator function.
					if (str) for (let char of str) {
						if (iterator.next(char).value) { // Break when a byte is expected, discarding the rest of the string (this should never happen).
							sendByte = true;
							break;
						}
					}
				}
			}

			// Escape Timeout
			//
			// Because the escape key sends ESC, there's no way to distinguish it form
			// the start of an escape sequence.
			if (this._timeoutID) {
				clearTimeout(this._timeoutID)
			}

			if (this.timeout !== Infinity) {
				this._timeoutID = setTimeout(()=>{
					this._timeoutID = undefined;
					sendByte = iterator.next("").value; // When the timeout fires, `undefined` is sent to the generator function.
				}, this.timeout);
			}
		}

		// When the stream closes, clear the string decoder's internal buffer and process any incomplete code points.
		this._endListener = ()=>{
			if (!sendByte) {
				let str = stringDecoder.end();

				// Send the character(s) to the generator function.
				if (str) for (let char of str) {
					if (iterator.next(char).value) {
						sendByte = true;
						break;
					}
				}
			}
		}


		this._input = input;
		this.output = output || (input === process.stdin? process.stdout:null);
		this._encoding = encoding;
		this.timeout = timeout;
		this._timeoutID = undefined;

		this._isPaused = true;
		this.resume();
	}

	/**
	 * Removes the `data` listener from the input stream.
	 * @param {boolean} pauseStream Whether to pause the input stream. This will allow Node.js to exit.
	 */
	pause(pauseStream = true) {
		if (!this._isPaused) {
			this._input.removeListener("data", this._dataListener);
			this._input.removeListener("end", this._endListener);
			if (pauseStream && this._input.pause)
				this._input.pause();

			this._isPaused = true;
			return true;
		} else
			return false;
	}
	/**
	 * Attaches the `data` listener to the input stream.
	 * @param {boolean} resumeStream Determines if the underlying input stream is also resumed.
	 */
	resume(resumeStream = true) {
		if (this._isPaused) {
			this._input.on("data", this._dataListener);
			this._input.on("end", this._endListener);
			if (resumeStream && this._input.resume)
				this._input.resume();

			this._isPaused = false;
			return true;
		} else
			return false;
	}

	/**
	 * Enables mouse events.
	 * @param {number} mode The mouse mode (one of the constants)
	 * @param {boolean} sgr Whether to try to activate SGR extended mode
	 */
	enableMouse(mode = 0, sgr = true) {
		// If a terminal doesn't support a certain mode, try to enable the most complete one.
		this.output.write(`\x1b[?1000h`);

		if (mode === 1)
			this.output.write(`\x1b[?1001h`);
		else {
			if (mode >= 2)
				this.output.write(`\x1b[?1002h`);

			if (mode === 3)
				this.output.write(`\x1b[?1003h`);
		}

		if (sgr)
			this.output.write(`\x1b[?1006h`);
	}
	/**
	 * Disables mouse events.
	 */
	disableMouse() {
		this.output.write(`\x1b[?1000l\x1b[?1006l`);
	}

	/**
	 * Enables bracketed paste mode.
	 */
	enableBPM() {
		this.output.write("\x1b[?2004h")
	}
	/**
	 * Disables bracketed paste mode.
	 */
	disableBPM() {
		this.output.write("\x1b[?2004l")
	}

	/**
	 * Enables focus events.
	 */
	enableFocus() {
		this.output.write("\x1b[?1004h")
	}
	/**
	 * Disables focus events.
	 */
	disableFocus() {
		this.output.write("\x1b[?1004l")
	}
}
/**
 * Event fired when a key (or key combination) is pressed.
 * 
 * @event module:tty-events#keypress
 * @type {KeyboardEvent}
 */
/**
 * Event fired when a mouse button is pressed down.
 * 
 * @event module:tty-events#mousedown
 * @type {MouseEvent}
 */
/**
 * Event fired when a mouse button is released.
 * 
 * @event module:tty-events#mouseup
 * @type {MouseEvent}
 */
/**
 * Event fired when the cursor moves.
 * 
 * @event module:tty-events#mousemove
 * @type {MouseEvent}
 */
/**
 * Event fired when the mouse wheel is moved or when the scroll action is triggered (for example, using two fingers on a trackpad).
 * 
 * @event module:tty-events#wheel
 * @type {MouseEvent}
 */
/**
 * Event fired with any mouse event.
 * 
 * @see module:tty-events.MouseEvent#type
 * @event module:tty-events#mouse
 * @type {MouseEvent}
 */
/**
 * Event fired when text is pasted while bracketed paste mode is activated.
 * 
 * @event module:tty-events#paste
 * @type {string}
 */
/**
 * Event fired when the terminal window receives focus.
 * 
 * @event module:tty-events#focusin
 */
/**
 * Event fired when the terminal window loses focus.
 * 
 * @event module:tty-events#focusout
 */
/**
 * Event fired when text is selected using highlight tracking. This event may not fire if the selection was empty.
 * 
 * @event module:tty-events#highlight
 * @type {string}
 */
/**
 * Event fired when the terminal receives an unrecognized or broken escape sequence.
 * 
 * @event module:tty-events#unknownSequence
 * @type {string}
 */

Object.assign(Terminal, {
	/**
	 * Constant used for `enableMouse()`: Only mousedown, mouseup and wheel events.
	 * @const
	 * @alias module:tty-events.VT200_MOUSE
	 */
	VT200_MOUSE: 0,
	/**
	 * Constant used for `enableMouse()`: Mouse highlight tracking. **If you use this constant, make sure to respond to `mousedown` events with a proper escape sequence, otherwise the terminal may hang.**
	 * @const
	 * @alias module:tty-events.VT200_HIGHLIGHT_MOUSE
	 */
	VT200_HIGHLIGHT_MOUSE: 1,
	/**
	 * Constant used for `enableMouse()`: Motion events only when buttons are down.
	 * @const
	 * @alias module:tty-events.BTN_EVENT_MOUSE
	 */
	BTN_EVENT_MOUSE: 2,
	/**
	 * Constant used for `enableMouse()`: All events.
	 * @const
	 * @alias module:tty-events.ANY_EVENT_MOUSE
	 */
	ANY_EVENT_MOUSE: 3,

	KeyboardEvent,
	MouseEvent,
	HighlightEvent
});

// Export stuff
module.exports = Terminal;