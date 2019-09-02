/* This is the test script for tty-input */

const Terminal = require("./index.js"),
stream = require("stream"),
assert = require("assert");

var passedTests = 0,
failedTests = 0;

function reportStatus() {
	process.stdout.write(`\x1b[94m${passedTests+failedTests}/${tests.length} tests performed: ${failedTests} failed, ${passedTests} passed.\x1b[0m`)
}

const clearAndHome = "\x1b[2K\x1b[1G";
function ok(str) {
	passedTests++;
	console.log(clearAndHome+"\x1b[92m✓\x1b[0m %s", str);
	reportStatus()
}
function nok(str) {
	failedTests++;
	console.log(clearAndHome+"\x1b[91m✗\x1b[0m %s", str);
	reportStatus()
}

const tests = [
	{
		name: "Char a",
		sequence: "a",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "a",
			sequence: "a",
			isSpecial: false,
			meta: false,
			ctrl: false,
			shift: false
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
			meta: false,
			ctrl: false,
			shift: false
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
			meta: false,
			ctrl: false,
			shift: false
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
			meta: false,
			ctrl: false,
			shift: false
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
			meta: false,
			ctrl: false,
			shift: false
		})
	},
	{
		name: "F1 ([[A)",
		sequence: "\x1b[[A",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "f1",
			sequence: "\x1b[[A",
			isSpecial: true,
			meta: false,
			ctrl: false,
			shift: false
		})
	},
	{
		name: "F2 (OQ)",
		sequence: "\x1bOQ",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "f2",
			sequence: "\x1bOQ",
			isSpecial: true,
			meta: false,
			ctrl: false,
			shift: false
		})
	},
	{
		name: "F3 ([R)",
		sequence: "\x1b[R",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "f3",
			sequence: "\x1b[R",
			isSpecial: true,
			meta: false,
			ctrl: false,
			shift: false
		})
	},
	{
		name: "F4 ([14~)",
		sequence: "\x1b[14~",
		type: "keypress",
		ev: new Terminal.KeyboardEvent({
			name: "f4",
			sequence: "\x1b[14~",
			isSpecial: true,
			meta: false,
			ctrl: false,
			shift: false
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
			meta: false,
			ctrl: true,
			shift: false
		})
	},
];

// Actual code //

(async function(){
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
			// if (ready) {
			// 	const sequence = tests[testIndex].sequence;

			// 	if (typeof sequence === "string")
			// 		this.push(Buffer.from(sequence, "utf8"));
			// 	else
			// 		this.push(Buffer.from(sequence));

			// 	ready = false;
			// }
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
			ok(name)
		} catch(e) {
			nok(name + ": " + e.message)
		}
	}

	// if (failedTests)
	// 	console.log("%i out of %i failed tests.", failedTests, tests.length);
	// else
	// 	console.log("All tests passed.");
	process.exitCode = failedTests;
})()