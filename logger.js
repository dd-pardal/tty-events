/* Logger Script
 *
 * This is the example logger script for tty-events. Simply type "node logger" in your terminal and
 * press some keys, click somewhere, or paste something.
 */

const Terminal = require("./index.js");

if (process.stdin.isTTY)
	process.stdin.setRawMode(true);

const te = new Terminal;

function dataListener(data) {
	var str = "";
	for (let i=0; i<data.length; i++)
		str += data[i].toString(16) + " ";

	console.log(str)
}
process.stdin.on("data", dataListener)

te.on("keypress", (key)=>{
	if (key == "Ctrl+c") {
		te.disableMouse()
		te.disableBPM()
		te.disableFocus()
		process.exit();
	}
	console.log(key, key.toString())
})
te.on("unknownSequence", (s)=>console.log("Unknown sequence: %O", s))
te.on("mouse", (s)=>console.log("%O", s))
te.on("paste", (s)=>console.log("Pasted: %O", s))
te.on("focusin", ()=>console.log("Focus in."))
te.on("focusout", ()=>console.log("Focus out."))

te.enableMouse(Terminal.ANY_EVENT_MOUSE)
te.enableBPM()
te.enableFocus()