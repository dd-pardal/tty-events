declare module "tty-events" {
    import * as events from "events";
	import * as stream from "stream";
	
	namespace Terminal {
		class Key {
			/**
			 * The name (for special keys) or character produced by the key.
			 */
			name: string;

			/**
			 * The sequence produced by the key / key combination.
			 */
			sequence: string;

			/**
			 * Determines if the key is a special key. Special keys have names like `f2` or `backspace` or are a combination of Ctrl+symbol / Ctrl+letter.
			 */
			isSpecial: boolean;

			/**
			 * Determines if the Ctrl modifier was being pressed with the key. If the key is not a special key, this is always `false`.
			 */
			ctrl: boolean;

			/**
			 * Determines if the Alt modifier was being pressed with the key.
			 */
			alt: boolean;

			/**
			 * Determines if the Shift modifier was being pressed with the key. If the key is not a special key, this is always `false`.
			 */
			shift: boolean;

			/**
			 * Represents the key combination with a string in the format `["Ctrl+"]["Alt+"]["Shift+"]key.name`. For example: `"b"`, `"B"`, `"Ctrl+e"`, `"Ctrl+Shift+home"`, `"+"`.
			 */
			toString(): string;
		}

		class MouseEvent {
			/**
			 * The x coordinate of where the mouse event happened. (1 = leftmost column.)
			 */
			x: number;
			/** 
			 * The y coordinate of where the mouse event happened. (1 = topmost row.)
			 */
			y: number;
			/**
			 * The button number, in the range 1-11. This property might be `undefined` for `mouseup` and `mousemove` events. If `undefined` in a `mousemove` event, no button was pressed when the cursor moved.
			 * 
			 * List of mouse buttons (from [http://xahlee.info/linux/linux_x11_mouse_button_number.html](http://xahlee.info/linux/linux_x11_mouse_button_number.html)):
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
			 */
			button: number;
			/**
			 * Determines if the Ctrl modifier was being pressed when the mouse event occured.
			 */
			ctrl: boolean;
			/**
			 * Determines if the Alt modifier was being pressed when the mouse event occured.
			 */
			alt: boolean;
			/**
			 * Determines if the Shift modifier was being pressed when the mouse event occured.
			 */
			shift: boolean;
			/**
			 * Type of mouse event (`mousedown`, `mouseup`, `mousemove` or `wheel`).
			 */
			type: string;
			/**
			* Only for `wheel` events. Direction of the wheel turn (1=down; -1=up).
			* 
			* @name module:tty-events.MouseEvent#direction
			*/
			direction: number;
		}

		/**
		 * Constant used for `enableMouse()`: Only mousedown, mouseup and wheel events.
		 */
		const VT200_MOUSE: number;
		/**
		 * Constant used for `enableMouse()`: Motion events only when buttons are down.
		 */
		const BTN_EVENT_MOUSE: number;
		/**
		 * Constant used for `enableMouse()`: All events.
		 */
		const ANY_EVENT_MOUSE: number;
	}

	interface TermOptions{
		/**
		 * The escape sequence timeout, in millisseconds. `tty-events` will stop waiting for the rest of an escape sequence when the timeout fires. `Infinity` = no timeout.
		 */
		timeout: number
	}

	type mouseListener = (mouseEvent: Terminal.MouseEvent) => void;

	class Terminal extends events.EventEmitter{
		/**
		 * @param {ReadableStream} input The input stream. (Normally stdin.)
		 * @param {WritableStream} output The output stream for activating mouse support and bracketed paste mode. (Normally stdout.) Optional.
		 * @param {TermOptions} options
		 */
		constructor(
			input: stream.Readable,
			output: stream.Writable,
			options: TermOptions
		);

		/**
		 * Removes the `data` listener from the input stream.
		 */
		pause(): void;
		/**
		 * Attaches the `data` listener to the input stream.
		 */
		resume(): void;

		/**
		 * Enables mouse events.
		 * @param {number} mode The mouse mode (one of the constants)
		 * @param {boolean} sgr Whether to try to activate SGR extended mode
		 */
		enableMouse(mode: number, sgr: boolean): void;
		/**
		 * Disables mouse events.
		 */
		disableMouse(): void;

		/**
		 * Enables bracketed paste mode.
		 */
		enableBPM(): void;
		/**
		 * Disables bracketed paste mode.
		 */
		disableBPM(): void;

		/**
		 * Enables focus events.
		 */
		enableFocus(): void;
		/**
		 * Disables focus events.
		 */
		disableFocus(): void;

		// EVENTS //

		/**
		 * Event fired when a key (or key combinaion) is pressed.
		 */
		addListener(event: "keypress", listener: (key: KeyboardEvent) => void): this;

		/**
		 * Event fired when a mouse button is pressed down.
		 */
		addListener(event: "mousedown", listener: mouseListener): this;
		/**
		 * Event fired when a mouse button is released.
		 */
		addListener(event: "mouseup", listener: mouseListener): this;
		/**
		 * Event fired when the cursor moves.
		 */
		addListener(event: "mousemove", listener: mouseListener): this;
		/**
		 * Event fired when the mouse wheel is moved or when the scroll action is triggered (for example, using two fingers on a trackpad).
		 */
		addListener(event: "wheel", listener: mouseListener): this;
		/**
		 * Event fired with any mouse event.
		 */
		addListener(event: "mouse", listener: mouseListener): this;

		/**
		 * Event fired when text is pasted while bracketed paste mode is activated.
		 */
		addListener(event: "paste", listener: (text: string) => void): this;

		/**
		 * Event fired when the terminal window receives focus.
		 */
		addListener(event: "focusin", listener: () => void): this;
		/**
		 * Event fired when the terminal window loses focus.
		 */
		addListener(event: "focusout", listener: () => void): this;

		/**
		 * Event fired when the terminal receives an unrecognized or broken escape sequence.
		 */
		addListener(event: "unknownSequence", listener: () => void): this;


		/**
		 * Event fired when a key (or key combinaion) is pressed.
		 */
		on(event: "keypress", listener: (key: KeyboardEvent) => void): this;

		/**
		 * Event fired when a mouse button is pressed down.
		 */
		on(event: "mousedown", listener: mouseListener): this;
		/**
		 * Event fired when a mouse button is released.
		 */
		on(event: "mouseup", listener: mouseListener): this;
		/**
		 * Event fired when the cursor moves.
		 */
		on(event: "mousemove", listener: mouseListener): this;
		/**
		 * Event fired when the mouse wheel is moved or when the scroll action is triggered (for example, using two fingers on a trackpad).
		 */
		on(event: "wheel", listener: mouseListener): this;
		/**
		 * Event fired with any mouse event.
		 */
		on(event: "mouse", listener: mouseListener): this;

		/**
		 * Event fired when text is pasted while bracketed paste mode is activated.
		 */
		on(event: "paste", listener: (text: string) => void): this;

		/**
		 * Event fired when the terminal window receives focus.
		 */
		on(event: "focusin", listener: () => void): this;
		/**
		 * Event fired when the terminal window loses focus.
		 */
		on(event: "focusout", listener: () => void): this;

		/**
		 * Event fired when the terminal receives an unrecognized or broken escape sequence.
		 */
		on(event: "unknownSequence", listener: () => void): this;
	}

	export = Terminal;
}