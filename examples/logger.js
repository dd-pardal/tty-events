/* Logger Script
 *
 * This is the example logger script for tty-events. Simply type "node examples/logger" in your terminal and
 * press some keys, click somewhere, or paste something.
 */

const Terminal = require("../index.js");

if (process.stdin.isTTY)
	process.stdin.setRawMode(true);

function dataListener(data) {
	var str = "";
	for (let i=0; i<data.length; i++)
		str += data[i].toString(16) + " ";

	console.log("Input bytes: "+str)
}
process.stdin.on("data", dataListener)

const term = new Terminal;

term.on("keypress", (key)=>{
	if (key == "Ctrl+c") {
		term.disableMouse()
		term.disableBPM()
		term.disableFocus()
		process.exit();
	}
	console.log(key, key.toString())
})
term.on("unknownSequence", (s)=>console.log("Unknown sequence: %O", s))
term.on("mouse", (s)=>console.log("%O", s))
term.on("paste", (s)=>console.log("Pasted: %O", s))
term.on("focusin", ()=>console.log("Focus in."))
term.on("focusout", ()=>console.log("Focus out."))

term.enableMouse(Terminal.ANY_EVENT_MOUSE)
term.enableBPM()
term.enableFocus()