/* Logger Script
 *
 * This is the example logger script for tty-input. Simply type "node logger" in your terminal and
 * press some keys, click somewhere, or paste something.
 */

const Terminal = require("./index.js");

if (process.stdin.isTTY)
	process.stdin.setRawMode(true);

const te = new Terminal;

te.on("keypress", (key)=>{
	if (key == "Ctrl+c") {
		process.stdout.write("\x1b[?1003l")
		process.exit(0)
	}
	console.log(key, key.toString())
})
te.on("unknownSequence", (s)=>console.log("Unknown sequence: %O", s))
te.on("mouse", (s)=>console.log("%O", s))
te.on("paste", (s)=>console.log("Pasted: %O", s))

process.stdin.on("data", (data)=>{
	var str = "";
	for (let i=0; i<data.length; i++)
		str += data[i].toString(16) + " ";

	console.log(str)
})

process.stdout.write("\x1b[?1003h")

te.enableMouse()
te.enableBPM()
