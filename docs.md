<a name="module_tty-input"></a>

## tty-input

* [tty-input](#module_tty-input)
    * [Terminal](#exp_module_tty-input--Terminal) ⏏
        * [new Terminal(input, output)](#new_module_tty-input--Terminal_new)
        * _instance_
            * [.pause()](#module_tty-input--Terminal+pause)
            * [.resume()](#module_tty-input--Terminal+resume)
            * [.enableBPM()](#module_tty-input--Terminal+enableBPM)
            * [.disableBPM()](#module_tty-input--Terminal+disableBPM)
        * _inner_
            * [~KeyboardEvent](#module_tty-input--Terminal.KeyboardEvent)
                * [.name](#module_tty-input--Terminal.KeyboardEvent+name) : <code>string</code>
                * [.sequence](#module_tty-input--Terminal.KeyboardEvent+sequence) : <code>string</code>
                * [.isSpecial](#module_tty-input--Terminal.KeyboardEvent+isSpecial) : <code>boolean</code>
                * [.ctrl](#module_tty-input--Terminal.KeyboardEvent+ctrl) : <code>boolean</code>
                * [.alt](#module_tty-input--Terminal.KeyboardEvent+alt) : <code>boolean</code>
                * [.shift](#module_tty-input--Terminal.KeyboardEvent+shift) : <code>boolean</code>
                * [.toString()](#module_tty-input--Terminal.KeyboardEvent+toString)
            * [~MouseEvent](#module_tty-input--Terminal.MouseEvent)
                * [.x](#module_tty-input--Terminal.MouseEvent+x) : <code>number</code>
                * [.y](#module_tty-input--Terminal.MouseEvent+y) : <code>number</code>
                * [.button](#module_tty-input--Terminal.MouseEvent+button) : <code>number</code>
                * [.ctrl](#module_tty-input--Terminal.MouseEvent+ctrl) : <code>boolean</code>
                * [.alt](#module_tty-input--Terminal.MouseEvent+alt) : <code>boolean</code>
                * [.shift](#module_tty-input--Terminal.MouseEvent+shift) : <code>boolean</code>
                * [.type](#module_tty-input--Terminal.MouseEvent+type) : <code>string</code>
            * [~VT200_MOUSE](#module_tty-input--Terminal..VT200_MOUSE)
            * [~BTN_EVENT_MOUSE](#module_tty-input--Terminal..BTN_EVENT_MOUSE)
            * [~ANY_EVENT_MOUSE](#module_tty-input--Terminal..ANY_EVENT_MOUSE)

<a name="exp_module_tty-input--Terminal"></a>

### Terminal ⏏
Represents a terminal that emits events.

**Kind**: Exported class  
<a name="new_module_tty-input--Terminal_new"></a>

#### new Terminal(input, output)

| Param | Type | Description |
| --- | --- | --- |
| input | <code>ReadableStream</code> | The input stream. (Normally stdin.) |
| output | <code>WritableStream</code> | The output stream for activating mouse support and bracketed paste mode. (Normally stdout.) Optional. |

<a name="module_tty-input--Terminal+pause"></a>

#### terminal.pause()
Removes the listener from the input stream, allowing Node to exit.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-input--Terminal)  
<a name="module_tty-input--Terminal+resume"></a>

#### terminal.resume()
Removes the listener from the input stream, allowing Node to exit.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-input--Terminal)  
<a name="module_tty-input--Terminal+enableBPM"></a>

#### terminal.enableBPM()
Enables bracketed paste mode.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-input--Terminal)  
<a name="module_tty-input--Terminal+disableBPM"></a>

#### terminal.disableBPM()
Disables bracketed paste mode.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-input--Terminal)  
<a name="module_tty-input--Terminal.KeyboardEvent"></a>

#### Terminal~KeyboardEvent
Represents a keyboard event (key or key combination).

**Kind**: inner class of [<code>Terminal</code>](#exp_module_tty-input--Terminal)  

* [~KeyboardEvent](#module_tty-input--Terminal.KeyboardEvent)
    * [.name](#module_tty-input--Terminal.KeyboardEvent+name) : <code>string</code>
    * [.sequence](#module_tty-input--Terminal.KeyboardEvent+sequence) : <code>string</code>
    * [.isSpecial](#module_tty-input--Terminal.KeyboardEvent+isSpecial) : <code>boolean</code>
    * [.ctrl](#module_tty-input--Terminal.KeyboardEvent+ctrl) : <code>boolean</code>
    * [.alt](#module_tty-input--Terminal.KeyboardEvent+alt) : <code>boolean</code>
    * [.shift](#module_tty-input--Terminal.KeyboardEvent+shift) : <code>boolean</code>
    * [.toString()](#module_tty-input--Terminal.KeyboardEvent+toString)

<a name="module_tty-input--Terminal.KeyboardEvent+name"></a>

##### keyboardEvent.name : <code>string</code>
The key name (for special keys) or character produced by the key.

**Kind**: instance property of [<code>KeyboardEvent</code>](#module_tty-input--Terminal.KeyboardEvent)  
<a name="module_tty-input--Terminal.KeyboardEvent+sequence"></a>

##### keyboardEvent.sequence : <code>string</code>
The sequencd produced by the key / key combination.

**Kind**: instance property of [<code>KeyboardEvent</code>](#module_tty-input--Terminal.KeyboardEvent)  
<a name="module_tty-input--Terminal.KeyboardEvent+isSpecial"></a>

##### keyboardEvent.isSpecial : <code>boolean</code>
Determines if the key is a special key. Special keys have names like `f2` or `backspace` or are a combination of Ctrl+symbol / Ctrl+letter.

**Kind**: instance property of [<code>KeyboardEvent</code>](#module_tty-input--Terminal.KeyboardEvent)  
<a name="module_tty-input--Terminal.KeyboardEvent+ctrl"></a>

##### keyboardEvent.ctrl : <code>boolean</code>
Determines if the Ctrl modifier was being pressed with the key. If the key is not a special key, this is always `false`.

**Kind**: instance property of [<code>KeyboardEvent</code>](#module_tty-input--Terminal.KeyboardEvent)  
<a name="module_tty-input--Terminal.KeyboardEvent+alt"></a>

##### keyboardEvent.alt : <code>boolean</code>
Determines if the Alt modifier was being pressed with the key.

**Kind**: instance property of [<code>KeyboardEvent</code>](#module_tty-input--Terminal.KeyboardEvent)  
<a name="module_tty-input--Terminal.KeyboardEvent+shift"></a>

##### keyboardEvent.shift : <code>boolean</code>
Determines if the Shift modifier was being pressed with the key. If the key is not a special key, this is always `false`.

**Kind**: instance property of [<code>KeyboardEvent</code>](#module_tty-input--Terminal.KeyboardEvent)  
<a name="module_tty-input--Terminal.KeyboardEvent+toString"></a>

##### keyboardEvent.toString()
Represents the key combination with a string in the format `["Alt+"]["Ctrl+"]["Shift+"]key.name`.For example:- `"b"`- `"B"`- `"Ctrl+e"`- `"Ctrl+Shift+home"`- `"+"`

**Kind**: instance method of [<code>KeyboardEvent</code>](#module_tty-input--Terminal.KeyboardEvent)  
<a name="module_tty-input--Terminal.MouseEvent"></a>

#### Terminal~MouseEvent
Represents a mouse event (click, wheel, etc.).

**Kind**: inner class of [<code>Terminal</code>](#exp_module_tty-input--Terminal)  

* [~MouseEvent](#module_tty-input--Terminal.MouseEvent)
    * [.x](#module_tty-input--Terminal.MouseEvent+x) : <code>number</code>
    * [.y](#module_tty-input--Terminal.MouseEvent+y) : <code>number</code>
    * [.button](#module_tty-input--Terminal.MouseEvent+button) : <code>number</code>
    * [.ctrl](#module_tty-input--Terminal.MouseEvent+ctrl) : <code>boolean</code>
    * [.alt](#module_tty-input--Terminal.MouseEvent+alt) : <code>boolean</code>
    * [.shift](#module_tty-input--Terminal.MouseEvent+shift) : <code>boolean</code>
    * [.type](#module_tty-input--Terminal.MouseEvent+type) : <code>string</code>

<a name="module_tty-input--Terminal.MouseEvent+x"></a>

##### mouseEvent.x : <code>number</code>
The x coordinate of where the mouse event happened. (1 = leftmost column.)

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-input--Terminal.MouseEvent)  
<a name="module_tty-input--Terminal.MouseEvent+y"></a>

##### mouseEvent.y : <code>number</code>
The y coordinate of where the mouse event happened. (1 = topmost row.)

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-input--Terminal.MouseEvent)  
<a name="module_tty-input--Terminal.MouseEvent+button"></a>

##### mouseEvent.button : <code>number</code>
The button number.

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-input--Terminal.MouseEvent)  
<a name="module_tty-input--Terminal.MouseEvent+ctrl"></a>

##### mouseEvent.ctrl : <code>boolean</code>
Determines if the Ctrl modifier was being pressed with the mouse event.

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-input--Terminal.MouseEvent)  
<a name="module_tty-input--Terminal.MouseEvent+alt"></a>

##### mouseEvent.alt : <code>boolean</code>
Determines if the Alt modifier was being pressed with the mouse event.

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-input--Terminal.MouseEvent)  
<a name="module_tty-input--Terminal.MouseEvent+shift"></a>

##### mouseEvent.shift : <code>boolean</code>
Determines if the Shift modifier was being pressed with the mouse event.

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-input--Terminal.MouseEvent)  
<a name="module_tty-input--Terminal.MouseEvent+type"></a>

##### mouseEvent.type : <code>string</code>
Type of mouse event (`mousedown`, `mouseup`, `mousemove`, `wheel`)

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-input--Terminal.MouseEvent)  
<a name="module_tty-input--Terminal..VT200_MOUSE"></a>

#### Terminal~VT200\_MOUSE
Constant used for `enableMouse()`: Only mousedown, mouseup and wheel events.

**Kind**: inner property of [<code>Terminal</code>](#exp_module_tty-input--Terminal)  
<a name="module_tty-input--Terminal..BTN_EVENT_MOUSE"></a>

#### Terminal~BTN\_EVENT\_MOUSE
Constant used for `enableMouse()`: Motion events only when buttons are down. (xterm)

**Kind**: inner property of [<code>Terminal</code>](#exp_module_tty-input--Terminal)  
<a name="module_tty-input--Terminal..ANY_EVENT_MOUSE"></a>

#### Terminal~ANY\_EVENT\_MOUSE
Constant used for `enableMouse()`: All events. (xterm)

**Kind**: inner property of [<code>Terminal</code>](#exp_module_tty-input--Terminal)  
