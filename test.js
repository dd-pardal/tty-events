/* This is the test script for tty-events */

const Terminal = require("./index.min.js"),
stream = require("stream"),
assert = require("assert");

const tests = [
	{
		name: "Char a",
		sequence: "a",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "a",
			sequence: "a",
			isSpecial: false,
		})
	},
	{
		name: "Char ç",
		sequence: "ç",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "ç",
			sequence: "ç",
			isSpecial: false,
		})
	},
	{
		name: "Char ➀",
		sequence: "➀",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "➀",
			sequence: "➀",
			isSpecial: false,
		})
	},
	{
		name: "Alt+Char 👌",
		sequence: "\x1b👌",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "👌",
			sequence: "\x1b👌",
			isSpecial: false,
			alt: true,
		})
	},
	{
		name: "Char 😁",
		sequence: "😁",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "😁",
			sequence: "😁",
			isSpecial: false,
		})
	},
	{
		name: "Ctrl+A",
		sequence: "\x01",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "a",
			sequence: "\x01",
			isSpecial: true,
			ctrl: true
		})
	},
	{
		name: "Ctrl+-",
		sequence: "\x1f",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "-",
			sequence: "\x1f",
			isSpecial: true,
			ctrl: true
		})
	},
	{
		name: "Esc",
		sequence: "\x1b",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "escape",
			sequence: "\x1b",
			isSpecial: true,
		})
	},
	{
		name: "F1",
		sequence: "\x1b[[A",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "f1",
			sequence: "\x1b[[A",
			isSpecial: true,
		})
	},
	{
		name: "F2",
		sequence: "\x1bOQ",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "f2",
			sequence: "\x1bOQ",
			isSpecial: true,
		})
	},
	{
		name: "F3",
		sequence: "\x1b[R",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "f3",
			sequence: "\x1b[R",
			isSpecial: true,
		})
	},
	{
		name: "F4",
		sequence: "\x1b[14~",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "f4",
			sequence: "\x1b[14~",
			isSpecial: true,
		})
	},
	{
		name: "Ctrl+F5",
		sequence: "\x1b[15^",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "f5",
			sequence: "\x1b[15^",
			isSpecial: true,
			ctrl: true,
		})
	},
	{
		name: "Shift+F1",
		sequence: "\x1b[1;2P",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "f1",
			sequence: "\x1b[1;2P",
			isSpecial: true,
			shift: true
		})
	},
	{
		name: "Ctrl+Alt+F6",
		sequence: "\x1b[17;7~",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "f6",
			sequence: "\x1b[17;7~",
			isSpecial: true,
			alt: true,
			ctrl: true,
		})
	},
	{
		name: "Alt+Shift+F7",
		sequence: "\x1b\x1b[18$",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "f7",
			sequence: "\x1b\x1b[18$",
			isSpecial: true,
			alt: true,
			shift: true
		})
	},
	{
		name: "Home",
		sequence: "\x1b[1~",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "home",
			sequence: "\x1b[1~",
			isSpecial: true,
		})
	},
	{
		name: "Shift+Insert",
		sequence: "\x1b[2;2~",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "insert",
			sequence: "\x1b[2;2~",
			isSpecial: true,
			shift: true
		})
	},
	{
		name: "Mousedown left (1, 1)",
		sequence: "\x1b[M !!",
		type: "mousedown",
		ev: new Terminal.MouseEvent({
			x: 1,
			y: 1,
			button: 1,
			type: "mousedown",
			ctrl: false,
			alt: false,
			shift: false
		})
	},
	{
		name: "Mouseup (10, 1)",
		sequence: "\x1b[M#*!",
		type: "mouseup",
		ev: new Terminal.MouseEvent({
			x: 10,
			y: 1,
			button: undefined,
			type: "mouseup",
			ctrl: false,
			alt: false,
			shift: false
		})
	},
	{
		name: "Mousedown right (1, 5)",
		sequence: "\x1b[M\"!%",
		type: "mousedown",
		ev: new Terminal.MouseEvent({
			x: 1,
			y: 5,
			button: 3,
			type: "mousedown",
			ctrl: false,
			alt: false,
			shift: false
		})
	},
	{
		name: "Wheel up (80, 96)",
		sequence: [0x1b, 0x5b, 0x4d, 0x60, 0x70, 0x80],
		type: "wheel",
		ev: new Terminal.MouseEvent({
			x: 80,
			y: 96,
			direction: -1,
			type: "wheel",
			ctrl: false,
			alt: false,
			shift: false
		})
	},
	{
		name: "Mouseup (160, 160)",
		sequence: [0x1b, 0x5b, 0x4d, 0x23, 0xc0, 0xc0],
		type: "mouseup",
		ev: new Terminal.MouseEvent({
			x: 160,
			y: 160,
			button: undefined,
			type: "mouseup",
			ctrl: false,
			alt: false,
			shift: false
		})
	},
	{
		name: "Mousemove left (56, 36)",
		sequence: "\x1b[M@XD",
		type: "mousemove",
		ev: new Terminal.MouseEvent({
			x: 56,
			y: 36,
			button: 1,
			type: "mousemove",
			ctrl: false,
			alt: false,
			shift: false
		})
	},
	{
		name: "Mousemove (12, 34)",
		sequence: "\x1b[MC,B",
		type: "mousemove",
		ev: new Terminal.MouseEvent({
			x: 12,
			y: 34,
			button: undefined,
			type: "mousemove",
			ctrl: false,
			alt: false,
			shift: false
		})
	},
	{
		name: "Mousedown left (1, 1)",
		sequence: "\x1b[<0;1;1M",
		type: "mousedown",
		ev: new Terminal.MouseEvent({
			x: 1,
			y: 1,
			button: 1,
			type: "mousedown",
			ctrl: false,
			alt: false,
			shift: false
		})
	},
	{
		name: "Mouseup left (10, 1)",
		sequence: "\x1b[<3;10;1m",
		type: "mouseup",
		ev: new Terminal.MouseEvent({
			x: 10,
			y: 1,
			button: undefined,
			type: "mouseup",
			ctrl: false,
			alt: false,
			shift: false
		})
	},
	{
		name: "Paste",
		sequence: "\x1b[200~Text\x1b[201~",
		type: "paste",
		ev: "Text"
	},
	{
		name: "Focus in",
		sequence: "\x1b[I",
		type: "focusin",
		ev: undefined
	},
	{
		name: "Focus out",
		sequence: "\x1b[O",
		type: "focusout",
		ev: undefined
	},
];

// Actual code //

var failedTests = 0;

function ok(str, ...args) {
	console.log("\x1b[92m✓\x1b[0m " + str, ...args);
}
function nok(str, ...args) {
	failedTests++;
	console.log("\x1b[91m✗\x1b[0m " + str, ...args);
}

(async function(){
	process.stdout.write("\x1b[3g\x1b[28G\x1bH\x1b[0G"); // Clear the tab stops, move the cursor and set a tab stop.
	console.log("  \x1b[1mNAME\tSEQUENCE\x1b[0m");
	console.log("--------------------------------------------");

	let testIndex;

	const inputStream = new class InputStream extends stream.Readable {
		constructor() {
			super();
			this.resetReady();
		}
	
		resetReady() {
			this.ready = new Promise((res)=>{this.readyRes = res});
		}

		_read() {
			this.readyRes();
		}

		async $push(sequence) {
			await this.ready;

			let pushRetVal;
			if (typeof sequence === "string")
				pushRetVal = this.push(Buffer.from(sequence, "utf8"));
			else
				pushRetVal = this.push(Buffer.from(sequence));

			if (!pushRetVal)
				this.resetReady();
		}
	};

	const term = new Terminal(inputStream, null, {escKeyTimeout: 100});

	for (testIndex=0; testIndex<tests.length; testIndex++) {
		const {name, type, sequence, ev} = tests[testIndex];

		try {
			let res;

			// This promise will throw on timeout.
			const actual = await new Promise((_res, rej)=>{
				res = _res;
				term.on(type, res);
				inputStream.$push(sequence);

				setTimeout(()=>rej({message: "Event not recieved."}), 200);
			});
			term.removeListener(type, res);

			assert.deepStrictEqual(actual, ev);
			ok("%s\t%O", name, sequence)
		} catch(e) {
			nok("%s\t%O\n%s\n", name, sequence, e.message)
		}
	}

	if (failedTests)
		console.log("\x1b[91m%i out of %i failed tests.\x1b[0m", failedTests, tests.length);
	else
		console.log("\x1b[92mAll %i tests passed.\x1b[0m", tests.length);
	process.exitCode = failedTests;
})()