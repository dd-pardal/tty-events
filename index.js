const EventEmitter = require("events");

/**
 * Represents a keyboard event (key or key combination).
 */
class KeyboardEvent {
	constructor(
		{
			name,
			sequence,
			isSpecial = false,
			meta = false,
			ctrl = false,
			shift = false
		}
	) {
		if (typeof name !== "string")
			throw new TypeError();

		/**
		 * The name (for special keys) or character produced by the key.
		 * @type {string}
		 */
		this.name = name;

		/**
		 * The sequencd produced by the key / key combination.
		 * @type {string}
		 */
		this.sequence = sequence;

		/**
		 * Determines if the key is a special key. Special keys have names like `f2` or `backspace` or are a combination of Ctrl+symbol / Ctrl+letter.
		 * @type {boolean}
		 */
		this.isSpecial = isSpecial;

		/**
		 * Determines if the meta modifier (Windows symbol or ⌘) was being pressed with the key. If the key is not a special key, this is always `false`.
		 * Note that most terminal emulators will not interpret key combinations with the meta key.
		 * @type {boolean}
		 */
		this.meta = meta;

		/**
		 * Determines if the Ctrl modifier was being pressed with the key. If the key is not a special key, this is always `false`.
		 * @type {boolean}
		 */
		this.ctrl = ctrl;

		/**
		 * Determines if the Shift modifier was being pressed with the key. If the key is not a special key, this is always `false`.
		 * @type {boolean}
		 */
		this.shift = shift;
	}

	/**
	 * Represents the key combination with a string in the format `["Meta+"]["Ctrl+"]["Shift+"]key.name`.
	 * 
	 * For example:
	 * 
	 * - `"b"`
	 * - `"B"`
	 * - `"Ctrl+e"`
	 * - `"Ctrl+Shift+home"`
	 * - `"+"`
	 */
	toString() {
		return (this.meta? "Meta+":"") +
			(this.ctrl? "Ctrl+":"") +
			(this.shift? "Shift+":"") +
			this.name
	}
}

/**
 * Represents a mouse event (click, wheel, etc.).
 */
class MouseEvent {
	constructor(evOpts) {
		Object.assign(this, evOpts);
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
	- two leading ESCs (~~apparently mean the same as one leading ESC~~) mean that the Meta key was being pressed.
*/

/**
 * A generator function that accepts characters from the input stream as inputs to `iterator.next()` and emmits the events.
 * 
 * The return value of `iterator.next()` indicates if indicates if the next call to `iterator.next()` should send a Unicode character or a byte.
 * 
 * @param {Terminal} terminal 
 */
function* emitKeys(terminal) {
	/**
	 * @param {number} b The encoded button value
	 * @param {number} x The x coordinate of the event
	 * @param {number} y The y coordinate of the event
	 * @param {boolean} mouseUp If it is a mouseup event (used by SGR).
	 */
	function parseAndEmitMouse(b, x, y, mouseUp = false) {
		/* Quotes (indicated by "//>") are from <https://invisible-island.net/xterm/ctlseqs/ctlseqs.pdf> */

		let button, evType, evOpts = {x, y};

		//> The low two bits of Cb encode button information: 0=MB1 pressed, 1=MB2 pressed, 2=MB3 pressed, 3=release.
		button = b & 3;

		//> Additional buttons are encoded like the wheel mice,
		//>   • by adding 64 (for buttons 4 through 7), or
		//>   • by adding 128 (for buttons 8 through 11).
		if (b & 64)
			button |= 4;
		if (b & 128)
			button |= 8;

		button += 1;

		switch (button) {
			case 4:
				evType = "mouseup";
				break;

			case 5:
				evType = "wheel";
				evOpts.direction = -1;
				break;

			case 6:
				evType = "wheel";
				evOpts.direction = 1;
				break;
			
			default:
				//> On button-motion events, xterm adds 32 to the event code (the third character, Cb).
				if (b & 32)
					evType = "mousemove";
				else if (mouseUp)
					evType = "mouseup";
				else
					evType = "mousedown";

				evOpts.button = button;
				break;

		}


		//> The next three bits encode the modifiers which were down when the button was pressed
		//> and are added together: 4=Shift, 8=Meta, 16=Control.
		//> Note however that the shift and control bits are normally unavailable because xterm uses the control modifier
		//> with mouse for popup menus, and the shift modifier is used in the default translations for button events.
		evOpts.shift = Boolean(b & 4);
		evOpts.meta = Boolean(b & 8);
		evOpts.ctrl = Boolean(b & 16);

		evOpts.type = evType;

		terminal.emit(evType, new MouseEvent(evOpts));
		terminal.emit("mouse", new MouseEvent(evOpts));
	}

	/**
	 * Was the last char a carriage return?
	 */
	let lastCharWasCR = false,

	/**
	 * The last character to be read.
	 */
	ch = yield,
	
	/**
	 * The sequence.
	 */
	s;

	main: while (true) {
		// if (ch === "")
		// 	continue;

		s = ch;

		let escaped = 0;

		const key = {
			name: undefined,
			sequence: undefined,
			isSpecial: true,
			ctrl: false,
			meta: false,
			shift: false
		};

		if (ch === "\x1b") { // ESC
			escaped = 1;
			s += (ch = yield);

			if (ch === "\x1b") { // ESC ESC
				escaped = 2;
				s += (ch = yield);
			}

			if (ch === "" || (s.length > 1 && ch === "\x1b")) { // ESC [ESC] timeout *or* ESC ESC ESC
				terminal.emit("keypress", new KeyboardEvent({
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
			// ANSI escape sequence
			let code = ch;
			let modifier = 0;


			if (ch === 'O') {
				// ESC O letter
				// ESC O modifier letter
				s += (ch = yield);

				if (ch >= '0' && ch <= '9') {
					modifier = (ch >> 0) - 1;
					s += (ch = yield);
				}

				code += ch;
			} else if (ch === '[') {
				// ESC [ letter
				// ESC [ modifier letter
				// ESC [ [ modifier letter
				// ESC [ [ num char
				s += (ch = yield);

				if (ch === "M") {
					// MOUSE
					parseAndEmitMouse(
						(yield).charCodeAt(0) - 0x20,
						(yield).charCodeAt(0) - 0x20,
						(yield).charCodeAt(0) - 0x20
					);

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
						continue main;
						
					}
				}

				const lastChar = s[s.length-1];

				if (s[2] === "<" && (lastChar==="M" || lastChar==="m")) {
					// MOUSE

					const args = s.slice(3, s.length-1).split(";");

					if (args.length === 3) {
						parseAndEmitMouse(
							parseInt(args[0]),
							parseInt(args[1]),
							parseInt(args[2]),
							lastChar === "m"
						);

						ch = yield;
						continue;
					}
				}

				/*
				 * We buffered enough data, now trying to extract code
				 * and modifier from it
				 */
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
			}

			// Parse the key modifier
			key.ctrl = Boolean(modifier & 4);
			key.meta = Boolean(modifier & 10);
			key.shift = Boolean(modifier & 1);

			if (escaped >= 2) {
				// Double-escaped sequences usually mean that the Meta key was being pressed.
				key.meta = true;
			}
		
			if (code[0] === "[") {
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

			// Parse the key itself
			if (code.match(/(O|\[)[A-Z]/)) {
				// ESC O letter and ESC [ letter are equivalent for uppercase.

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
					case '[25~': key.name = 'f3'; key.shift = true; break; // f13?
					case '[26~': key.name = 'f4'; key.shift = true; break; // f14?
					case '[28~': key.name = 'f5'; key.shift = true; break; // f15?
					case '[29~': key.name = 'f6'; key.shift = true; break; // f16?
					case '[31~': key.name = 'f7'; key.shift = true; break; // f17?
					case '[32~': key.name = 'f8'; key.shift = true; break; // f18?
					case '[33~': key.name = 'f9'; key.shift = true; break; // f19?
					case '[34~': key.name = 'f10'; key.shift = true; break; // f20?

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

					/* bracketed paste mode */
					case '[200~':

						// Loop until a ESC [ 2 0 1 ~ is recieved.
						const endSeq = "\x1b[201~";
						let byteStr = "", endSeqIndex = 0;
						while (true) {
							byteStr += (ch = yield);

							if (ch === endSeq[endSeqIndex])
								endSeqIndex++;
							else
								endSeqIndex = 0;

							if (endSeqIndex >= endSeq.length) {
								// A ESC [ 2 0 1 ~ was received.
								
								// Here we use the built-in UTF-8 decoder.
								terminal.emit("paste", Buffer.from(byteStr.slice(0, byteStr.length - endSeq.length), "binary").toString("utf-8"))

								ch = yield;
								continue main;
							}
						}
						break;

					// default: key.name = undefined; break;
				}
			}

			key.sequence = s;

			if (key.name !== undefined) {
				terminal.emit("keypress", new KeyboardEvent(key))
			} else {
				/* Unrecognized escape sequence */
				terminal.emit("unknownSequence", s)
			}

			ch = yield;
			continue;
		} else {
			// Key is not an escape sequence, but might be escaped.

			key.meta = Boolean(escaped); // In most terminals, typing a character while holding Alt precedes the char with an ESC.
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
				// Character (letter, number, symbol, etc...). Note that Alt+O and Alt+[ will not work.

				key.isSpecial = false;

				/* **** Here one UTF-8 char is decoded. **** */

				const byte = ch.charCodeAt(0);

				if (!(byte & 0x80)) { // ASCII range (0xxx xxxx)
					key.name = ch;
	
				} else if (byte & 0x40) { // 11xx xxxx
					let length;
	
					// Get the length of the sequence
					if (byte & 0x20) { // 111x xxxx
						if (byte & 0x10) { // 1111 xxxx
							if (byte & 0x8) { // Unknown (1111 1xxx)
								continue;
							} else { // 1111 0xxx
								length = 4;
							}
						} else { // 1110 xxxx
							length = 3;
						}
					} else { // 110x xxxx
						length = 2;
					}
	
					let byte2, byte3, byte4, codePoint;
					switch (length) {
						case 2:
							byte2 = (ch = yield).charCodeAt(0);
							if (
								(!(byte2 & 0x80) || (byte2 & 0x40))
							) { // Not a continuation byte
								continue;
							}
	
							key.name = String.fromCharCode(
								(byte & 0x1f) << 6 |
								(byte2 & 0x3f)
							);
							break;
	
						case 3:
							byte2 = (ch = yield).charCodeAt(0);
							if (
								(!(byte2 & 0x80) || (byte2 & 0x40))
							) { // Not a continuation byte
								continue;
							}

							byte3 = (ch = yield).charCodeAt(0);
							if (
								(!(byte3 & 0x80) || (byte3 & 0x40))
							) {
								continue;
							}
	
							codePoint = (byte & 0x0f) << 12 |
								(byte2 & 0x3f) << 6 |
								(byte3 & 0x3f);
	
							if (codePoint >= 0xd800 && codePoint <= 0xdfff) {
								/*
								> The definition of UTF-8 prohibits encoding character numbers between
								> U+D800 and U+DFFF, which are reserved for use with the UTF-16
								> encoding form (as surrogate pairs) and do not directly represent
								> characters.
								https://tools.ietf.org/html/rfc3629#page-5
								*/

								continue;
							}
	
							key.name = String.fromCharCode(codePoint); // Safe to use `fromCharCode` because `codePoint` is smaller than 0xffff.
							break;
	
						case 4:
							byte2 = (ch = yield).charCodeAt(0);
							if (
								(!(byte2 & 0x80) || (byte2 & 0x40))
							) { // Not a continuation byte
								byte = byte2;
								continue;
							}

							byte3 = (ch = yield).charCodeAt(0);
							if (
								(!(byte3 & 0x80) || (byte3 & 0x40))
							) {
								byte = byte3;
								continue;
							}

							byte4 = (ch = yield).charCodeAt(0);
							if (
								(!(byte4 & 0x80) || (byte4 & 0x40))
							) {
								byte = byte4;
								continue;
							}
	
							codePoint = (byte & 0x07) << 18 |
								(byte2 & 0x3f) << 12 |
								(byte3 & 0x3f) << 6 |
								(byte4 & 0x3f);
	
							if (codePoint >= 0xd800 && codePoint <= 0xdfff) {
								continue;
							}
	
							key.name = String.fromCodePoint(codePoint);
							break;
					}
	
				}/* else // Continuation at start of sequence (10xx xxxx) */

				key.sequence = key.name;
			}
		}

		if (key.name !== undefined) {
			terminal.emit("keypress", new KeyboardEvent(key))
		} else {
			// This should never happen
		}

		lastCharWasCR = ch === "\r";

		ch = yield;
	}
}
/**************************************************\
|  End of modified code from the node repository.  |
|                                                  |
\**************************************************/


/**
 * Represents a terminal that emits events.
 */
class Terminal extends EventEmitter {
	/**
	 * @param {ReadableStream} input The input stream. (Normally stdin.)
	 * @param {WritableStream} output The output stream for activating mouse support and bracketed paste mode. (Normally stdout.) Optional.
	 */
	constructor(input = process.stdin, output, {escKeyTimeout = 500} = {}) {
		super()

		const iterator = emitKeys(this);
		iterator.next();

		this._dataListener = (buf) => {
			if (this._escKeyTimeoutID) {
				clearTimeout(this._escKeyTimeoutID)
			}

			buf = buf.toString("binary"); // 1 byte = 1 character
		
			for (let i=0; i<buf.length; i++) {
				iterator.next(buf[i]);
			}
		
			if (buf[buf.length-1] === "\x1b") {
				// Escape Timeout
				//
				// Because the escape key sends ESC, there's no way to distinguish it form
				// the start of an escape sequence.
		
				this._escKeyTimeoutID = setTimeout(()=>{
					this._escKeyTimeoutID = undefined;
					iterator.next(""); // When the timeout fires, an empty string is sent to the generator function.
				}, this.escKeyTimeout);
			}
		}


		this._input = input;
		this.output = output || (input === process.stdin? process.stdout:null);
		this.escKeyTimeout = escKeyTimeout;
		this._escKeyTimeoutID = undefined;

		this.resume();
	}

	/**
	 * Removes the listener from the input stream, allowing Node to exit.
	 */
	pause() {
		this._input.removeListener("data", this._dataListener);
	}
	/**
	 * Removes the listener from the input stream, allowing Node to exit.
	 */
	resume() {
		this._input.on("data", this._dataListener);
	}

	enableMouse(mode = 0, sgr = true) {
		// If a terminal dosen't support a certain mode, try to enable the most complete one.
		this.output.write(`\x1b[?1000h`);
		if (mode >= 2)
			this.output.write(`\x1b[?1002h`);

		if (mode == 3)
			this.output.write(`\x1b[?1003h`);
		
		if (sgr)
			this.output.write(`\x1b[?1006h`);
	}
	disableMouse() {
		this.output.write(`\x1b[?1000l`);
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
}
Object.assign(Terminal, {
	/** Only mousedown, mouseup and wheel events. */
	VT200_MOUSE: 0,

	/** Motion events only when buttons are down. (xterm) */
	BTN_EVENT_MOUSE: 2,

	/** All events. (xterm) */
	ANY_EVENT_MOUSE: 3
});

// Export stuff
module.exports = Terminal;
module.exports.KeyboardEvent = KeyboardEvent;
module.exports.MouseEvent = MouseEvent;