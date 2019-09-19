/* Highlight tracking Script
 *
 * This is the example highlight tracking script for tty-events. Simply type "node examples/highlight-tacking.js"
 * in your terminal and select some of the sample text.
 */

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nulla tortor, commodo at condimentum ut, pretium non est. Etiam turpis est, condimentum nec ullamcorper ut, volutpat vel sapien. Quisque interdum lorem sit amet mi tempor facilisis. Nulla feugiat est consectetur lobortis efficitur. Proin sed sagittis sapien. Integer tincidunt placerat sapien, eget placerat nisi congue sit amet. Nulla accumsan, ligula at egestas facilisis, leo ligula porttitor dolor, in convallis erat nibh ut urna. Aliquam vitae sem iaculis erat lacinia porta. Donec ipsum dui, semper id consequat at, pretium nec odio. Aliquam sodales augue sit amet nisi tincidunt finibus. Pellentesque sagittis elementum tincidunt. Aliquam blandit gravida erat eget mollis. Duis finibus non nibh ut placerat. Quisque et nunc commodo, auctor est eget, facilisis massa. Nullam leo ipsum, vulputate id ipsum non, egestas eleifend turpis. Phasellus faucibus gravida sem vitae facilisis. Quisque vehicula gravida massa nec consequat. Sed ullamcorper tristique ipsum a porta. Aenean pretium risus in mi lacinia, quis pharetra lacus blandit. Aenean ornare erat in lobortis vulputate. Nulla elementum et diam ac posuere. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras hendrerit lorem quis metus eleifend tristique. Etiam finibus, sapien a tempor sagittis, neque enim ultrices ex, eget sollicitudin mauris nulla sed quam. Maecenas nec consequat lorem. Maecenas scelerisque mattis metus sit amet convallis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed dui ligula, tempus feugiat elit sit amet, cursus volutpat orci. Donec suscipit semper turpis, nec vestibulum tortor tristique et. Phasellus vulputate ligula leo, non tempus enim pulvinar et. Maecenas id ex quis nulla pellentesque porttitor at quis orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisi et diam tempus aliquet. Suspendisse non est nisi. Praesent imperdiet sed augue id laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc eget lacinia ipsum. Ut malesuada ultrices ex ut auctor. Nullam ac velit euismod, sollicitudin nulla vel, malesuada massa. Nunc suscipit justo eu metus feugiat vehicula quis in elit. Mauris a ex vitae elit pharetra sagittis. Vestibulum id velit elit. Sed hendrerit lectus sit amet tempor ornare. Morbi pellentesque quis est vitae posuere. Morbi scelerisque elit sit amet dolor porttitor, at vehicula justo porttitor. Nunc congue venenatis erat sit amet facilisis. Sed feugiat, erat non viverra molestie, turpis augue hendrerit neque, eu finibus elit turpis vel neque. Vivamus est enim, placerat scelerisque augue id, efficitur mollis arcu. Aenean vestibulum cursus sapien, quis tincidunt lorem sollicitudin at.";

const Terminal = require("../index.js"),
stdout = process.stdout;
print = stdout.write.bind(stdout);

const te = new Terminal;

var lastStartX, lastStartY;

function cleanup() {
	// Disable the mouse and the alternate screen buffer.
	te.disableMouse();
	print("\x1b[?1049l")
}

if (process.stdin.isTTY) {
	process.stdin.setRawMode(true);
}

te.enableMouse(Terminal.VT200_HIGHLIGHT_MOUSE);

// Enable the alternate screen buffer, set the cursor to the top left corner and write the sample text.
print("\x1b[?1049h\x1b[H" + loremIpsum.slice(0, stdout.columns*stdout.rows));

te.on("keypress", (key)=>{
	if (key == "Ctrl+c") {
		cleanup();
		process.exit();
	}
})
te.on("mousedown", (ev)=>{
	lastStartX = ev.x;
	lastStartY = ev.y;

	// Instruct the terminal to start selection at the mouse position and let the user end it anywhere.
	print(`\x1b[1;${ev.x};${ev.y};1;${stdout.rows+1}T`);
})
te.on("highlight", (ev)=>{
	cleanup();
	console.log(ev);

	console.log("You selected “\x1b[36m%s\x1b[39m”.", loremIpsum.slice(
		((ev.startX || lastStartX) - 1) + ((ev.startY || lastStartY) - 1)*stdout.columns,
		(ev.endX - 1) + (ev.endY - 1)*stdout.columns
	))
	process.exit();
})