<a name="module_tty-events"></a>

## tty-events

* [tty-events](#module_tty-events)
    * [Terminal](#exp_module_tty-events--Terminal) ⏏
        * [new Terminal(input, output)](#new_module_tty-events--Terminal_new)
        * _instance_
            * [.pause()](#module_tty-events--Terminal+pause)
            * [.resume()](#module_tty-events--Terminal+resume)
            * [.enableMouse(mode, sgr)](#module_tty-events--Terminal+enableMouse)
            * [.disableMouse()](#module_tty-events--Terminal+disableMouse)
            * [.enableBPM()](#module_tty-events--Terminal+enableBPM)
            * [.disableBPM()](#module_tty-events--Terminal+disableBPM)
            * [.enableFocus()](#module_tty-events--Terminal+enableFocus)
            * [.disableFocus()](#module_tty-events--Terminal+disableFocus)
            * ["keypress"](#module_tty-events--Terminal+event_keypress)
            * ["mousedown"](#module_tty-events--Terminal+event_mousedown)
            * ["mouseup"](#module_tty-events--Terminal+event_mouseup)
            * ["mousemove"](#module_tty-events--Terminal+event_mousemove)
            * ["wheel"](#module_tty-events--Terminal+event_wheel)
            * ["paste"](#module_tty-events--Terminal+event_paste)
        * _static_
            * [.KeyboardEvent](#module_tty-events--Terminal..KeyboardEvent)
                * [.name](#module_tty-events--Terminal..KeyboardEvent+name) : <code>string</code>
                * [.sequence](#module_tty-events--Terminal..KeyboardEvent+sequence) : <code>string</code>
                * [.isSpecial](#module_tty-events--Terminal..KeyboardEvent+isSpecial) : <code>boolean</code>
                * [.ctrl](#module_tty-events--Terminal..KeyboardEvent+ctrl) : <code>boolean</code>
                * [.alt](#module_tty-events--Terminal..KeyboardEvent+alt) : <code>boolean</code>
                * [.shift](#module_tty-events--Terminal..KeyboardEvent+shift) : <code>boolean</code>
                * [.toString()](#module_tty-events--Terminal..KeyboardEvent+toString)
            * [.MouseEvent](#module_tty-events--Terminal..MouseEvent)
                * [.x](#module_tty-events--Terminal..MouseEvent+x) : <code>number</code>
                * [.y](#module_tty-events--Terminal..MouseEvent+y) : <code>number</code>
                * [.button](#module_tty-events--Terminal..MouseEvent+button) : <code>number</code>
                * [.ctrl](#module_tty-events--Terminal..MouseEvent+ctrl) : <code>boolean</code>
                * [.alt](#module_tty-events--Terminal..MouseEvent+alt) : <code>boolean</code>
                * [.shift](#module_tty-events--Terminal..MouseEvent+shift) : <code>boolean</code>
                * [.type](#module_tty-events--Terminal..MouseEvent+type) : <code>string</code>
            * [.VT200_MOUSE](#module_tty-events--Terminal.VT200_MOUSE)
            * [.BTN_EVENT_MOUSE](#module_tty-events--Terminal.BTN_EVENT_MOUSE)
            * [.ANY_EVENT_MOUSE](#module_tty-events--Terminal.ANY_EVENT_MOUSE)

<a name="exp_module_tty-events--Terminal"></a>

### Terminal ⏏
Represents a terminal that emits events.

**Kind**: Exported class  
<a name="new_module_tty-events--Terminal_new"></a>

#### new Terminal(input, output)

| Param | Type | Description |
| --- | --- | --- |
| input | <code>ReadableStream</code> | The input stream. (Normally stdin.) |
| output | <code>WritableStream</code> | The output stream for activating mouse support and bracketed paste mode. (Normally stdout.) Optional. |

<a name="module_tty-events--Terminal+pause"></a>

#### terminal.pause()
Removes the `data` listener from the input stream.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+resume"></a>

#### terminal.resume()
Attaches the `data` listener to the input stream.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+enableMouse"></a>

#### terminal.enableMouse(mode, sgr)
Enables mouse events.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| mode | <code>number</code> | <code>0</code> | The mouse mode (one of the constants) |
| sgr | <code>boolean</code> | <code>true</code> | Whether to try to activate SGR extended mode |

<a name="module_tty-events--Terminal+disableMouse"></a>

#### terminal.disableMouse()
Disables mouse events.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+enableBPM"></a>

#### terminal.enableBPM()
Enables bracketed paste mode.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+disableBPM"></a>

#### terminal.disableBPM()
Disables bracketed paste mode.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+enableFocus"></a>

#### terminal.enableFocus()
Enables focus events.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+disableFocus"></a>

#### terminal.disableFocus()
Disables focus events.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+event_keypress"></a>

#### "keypress"
Event fired when a key (or key combinaion) is pressed.

**Kind**: event emitted by [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+event_mousedown"></a>

#### "mousedown"
Event fired when a mouse button is pressed down.

**Kind**: event emitted by [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+event_mouseup"></a>

#### "mouseup"
Event fired when a mouse button is released or when the cursor moves whitout any button currently pressed.

**Kind**: event emitted by [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+event_mousemove"></a>

#### "mousemove"
Event fired when the cursor moves with one or more buttons currently pressed.

**Kind**: event emitted by [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+event_wheel"></a>

#### "wheel"
Event fired when the mouse wheel is moved or when the scroll action is triggered (for example, using two fingers on a trackpad).

**Kind**: event emitted by [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+event_paste"></a>

#### "paste"
Event fired when text is pasted while bracketed paste mode is activated.

**Kind**: event emitted by [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal..KeyboardEvent"></a>

#### Terminal.KeyboardEvent
Represents a keyboard event (key or key combination).

**Kind**: static class of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  

* [.KeyboardEvent](#module_tty-events--Terminal..KeyboardEvent)
    * [.name](#module_tty-events--Terminal..KeyboardEvent+name) : <code>string</code>
    * [.sequence](#module_tty-events--Terminal..KeyboardEvent+sequence) : <code>string</code>
    * [.isSpecial](#module_tty-events--Terminal..KeyboardEvent+isSpecial) : <code>boolean</code>
    * [.ctrl](#module_tty-events--Terminal..KeyboardEvent+ctrl) : <code>boolean</code>
    * [.alt](#module_tty-events--Terminal..KeyboardEvent+alt) : <code>boolean</code>
    * [.shift](#module_tty-events--Terminal..KeyboardEvent+shift) : <code>boolean</code>
    * [.toString()](#module_tty-events--Terminal..KeyboardEvent+toString)

<a name="module_tty-events--Terminal..KeyboardEvent+name"></a>

##### keyboardEvent.name : <code>string</code>
The key name (for special keys) or character produced by the key.

**Kind**: instance property of [<code>KeyboardEvent</code>](#module_tty-events--Terminal..KeyboardEvent)  
<a name="module_tty-events--Terminal..KeyboardEvent+sequence"></a>

##### keyboardEvent.sequence : <code>string</code>
The sequencd produced by the key / key combination.

**Kind**: instance property of [<code>KeyboardEvent</code>](#module_tty-events--Terminal..KeyboardEvent)  
<a name="module_tty-events--Terminal..KeyboardEvent+isSpecial"></a>

##### keyboardEvent.isSpecial : <code>boolean</code>
Determines if the key is a special key. Special keys have names like `f2` or `backspace` or are a combination of Ctrl+symbol / Ctrl+letter.

**Kind**: instance property of [<code>KeyboardEvent</code>](#module_tty-events--Terminal..KeyboardEvent)  
<a name="module_tty-events--Terminal..KeyboardEvent+ctrl"></a>

##### keyboardEvent.ctrl : <code>boolean</code>
Determines if the Ctrl modifier was being pressed with the key. If the key is not a special key, this is always `false`.

**Kind**: instance property of [<code>KeyboardEvent</code>](#module_tty-events--Terminal..KeyboardEvent)  
<a name="module_tty-events--Terminal..KeyboardEvent+alt"></a>

##### keyboardEvent.alt : <code>boolean</code>
Determines if the Alt modifier was being pressed with the key.

**Kind**: instance property of [<code>KeyboardEvent</code>](#module_tty-events--Terminal..KeyboardEvent)  
<a name="module_tty-events--Terminal..KeyboardEvent+shift"></a>

##### keyboardEvent.shift : <code>boolean</code>
Determines if the Shift modifier was being pressed with the key. If the key is not a special key, this is always `false`.

**Kind**: instance property of [<code>KeyboardEvent</code>](#module_tty-events--Terminal..KeyboardEvent)  
<a name="module_tty-events--Terminal..KeyboardEvent+toString"></a>

##### keyboardEvent.toString()
Represents the key combination with a string in the format `["Ctrl+"]["Alt+"]["Shift+"]key.name`. For example: `"b"`, `"B"`, `"Ctrl+e"`, `"Ctrl+Shift+home"`, `"+"`.

**Kind**: instance method of [<code>KeyboardEvent</code>](#module_tty-events--Terminal..KeyboardEvent)  
<a name="module_tty-events--Terminal..MouseEvent"></a>

#### Terminal.MouseEvent
Represents a mouse event (click, wheel, etc.).

**Kind**: static class of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  

* [.MouseEvent](#module_tty-events--Terminal..MouseEvent)
    * [.x](#module_tty-events--Terminal..MouseEvent+x) : <code>number</code>
    * [.y](#module_tty-events--Terminal..MouseEvent+y) : <code>number</code>
    * [.button](#module_tty-events--Terminal..MouseEvent+button) : <code>number</code>
    * [.ctrl](#module_tty-events--Terminal..MouseEvent+ctrl) : <code>boolean</code>
    * [.alt](#module_tty-events--Terminal..MouseEvent+alt) : <code>boolean</code>
    * [.shift](#module_tty-events--Terminal..MouseEvent+shift) : <code>boolean</code>
    * [.type](#module_tty-events--Terminal..MouseEvent+type) : <code>string</code>

<a name="module_tty-events--Terminal..MouseEvent+x"></a>

##### mouseEvent.x : <code>number</code>
The x coordinate of where the mouse event happened. (1 = leftmost column.)

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-events--Terminal..MouseEvent)  
<a name="module_tty-events--Terminal..MouseEvent+y"></a>

##### mouseEvent.y : <code>number</code>
The y coordinate of where the mouse event happened. (1 = topmost row.)

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-events--Terminal..MouseEvent)  
<a name="module_tty-events--Terminal..MouseEvent+button"></a>

##### mouseEvent.button : <code>number</code>
The button number. This property might be absent for `mouseup` events.

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-events--Terminal..MouseEvent)  
<a name="module_tty-events--Terminal..MouseEvent+ctrl"></a>

##### mouseEvent.ctrl : <code>boolean</code>
Determines if the Ctrl modifier was being pressed when the mouse event occured.

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-events--Terminal..MouseEvent)  
<a name="module_tty-events--Terminal..MouseEvent+alt"></a>

##### mouseEvent.alt : <code>boolean</code>
Determines if the Alt modifier was being pressed when the mouse event occured.

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-events--Terminal..MouseEvent)  
<a name="module_tty-events--Terminal..MouseEvent+shift"></a>

##### mouseEvent.shift : <code>boolean</code>
Determines if the Shift modifier was being pressed when the mouse event occured.

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-events--Terminal..MouseEvent)  
<a name="module_tty-events--Terminal..MouseEvent+type"></a>

##### mouseEvent.type : <code>string</code>
Type of mouse event (`mousedown`, `mouseup`, `mousemove` or `wheel`).

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-events--Terminal..MouseEvent)  
<a name="module_tty-events--Terminal.VT200_MOUSE"></a>

#### Terminal.VT200\_MOUSE
Constant used for `enableMouse()`: Only mousedown, mouseup and wheel events.

**Kind**: static property of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal.BTN_EVENT_MOUSE"></a>

#### Terminal.BTN\_EVENT\_MOUSE
Constant used for `enableMouse()`: Motion events only when buttons are down.

**Kind**: static property of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal.ANY_EVENT_MOUSE"></a>

#### Terminal.ANY\_EVENT\_MOUSE
Constant used for `enableMouse()`: All events.

**Kind**: static property of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
