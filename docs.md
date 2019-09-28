<a name="module_tty-events"></a>

# tty-events

* [tty-events](#module_tty-events)
    * [Terminal](#exp_module_tty-events--Terminal) ⏏
        * [new Terminal(input, output, options)](#new_module_tty-events--Terminal_new)
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
            * ["mouse"](#module_tty-events--Terminal+event_mouse)
            * ["paste"](#module_tty-events--Terminal+event_paste)
            * ["focusin"](#module_tty-events--Terminal+event_focusin)
            * ["focusout"](#module_tty-events--Terminal+event_focusout)
            * ["highlight"](#module_tty-events--Terminal+event_highlight)
            * ["unknownSequence"](#module_tty-events--Terminal+event_unknownSequence)
        * _static_
            * [.KeyboardEvent](#module_tty-events--Terminal..KeyboardEvent)
                * [.name](#module_tty-events--Terminal..KeyboardEvent+name) : <code>string</code>
                * [.sequence](#module_tty-events--Terminal..KeyboardEvent+sequence) : <code>string</code>
                * [.isSpecial](#module_tty-events--Terminal..KeyboardEvent+isSpecial) : <code>boolean</code>
                * [.ctrl](#module_tty-events--Terminal..KeyboardEvent+ctrl) : <code>boolean</code>
                * [.alt](#module_tty-events--Terminal..KeyboardEvent+alt) : <code>boolean</code>
                * [.shift](#module_tty-events--Terminal..KeyboardEvent+shift) : <code>boolean</code>
                * [.meta](#module_tty-events--Terminal..KeyboardEvent+meta) : <code>boolean</code>
                * [.toString()](#module_tty-events--Terminal..KeyboardEvent+toString)
            * [.MouseEvent](#module_tty-events--Terminal.MouseEvent)
                * [.x](#module_tty-events--Terminal.MouseEvent+x) : <code>number</code>
                * [.y](#module_tty-events--Terminal.MouseEvent+y) : <code>number</code>
                * [.button](#module_tty-events--Terminal.MouseEvent+button) : <code>number</code>
                * [.ctrl](#module_tty-events--Terminal.MouseEvent+ctrl) : <code>boolean</code>
                * [.alt](#module_tty-events--Terminal.MouseEvent+alt) : <code>boolean</code>
                * [.shift](#module_tty-events--Terminal.MouseEvent+shift) : <code>boolean</code>
                * [.type](#module_tty-events--Terminal.MouseEvent+type) : <code>string</code>
                * [.direction](#module_tty-events--Terminal.MouseEvent+direction) : <code>number</code>
            * [.HighlightEvent](#module_tty-events--Terminal..HighlightEvent)
                * [.startX](#module_tty-events--Terminal..HighlightEvent+startX) : <code>number</code>
                * [.startY](#module_tty-events--Terminal..HighlightEvent+startY) : <code>number</code>
                * [.endX](#module_tty-events--Terminal..HighlightEvent+endX) : <code>number</code>
                * [.endY](#module_tty-events--Terminal..HighlightEvent+endY) : <code>number</code>
                * [.mouseX](#module_tty-events--Terminal..HighlightEvent+mouseX) : <code>number</code>
                * [.mouseY](#module_tty-events--Terminal..HighlightEvent+mouseY) : <code>number</code>
            * [.VT200_MOUSE](#module_tty-events--Terminal.VT200_MOUSE)
            * [.VT200_HIGHLIGHT_MOUSE](#module_tty-events--Terminal.VT200_HIGHLIGHT_MOUSE)
            * [.BTN_EVENT_MOUSE](#module_tty-events--Terminal.BTN_EVENT_MOUSE)
            * [.ANY_EVENT_MOUSE](#module_tty-events--Terminal.ANY_EVENT_MOUSE)
        * _inner_
            * [~TermOptions](#module_tty-events--Terminal..TermOptions)

<a name="exp_module_tty-events--Terminal"></a>

## Terminal ⏏
Represents a terminal that emits events.

**Kind**: Exported class  
<a name="new_module_tty-events--Terminal_new"></a>

### new Terminal(input, output, options)

| Param | Type | Description |
| --- | --- | --- |
| input | <code>ReadableStream</code> | The input stream. (Normally stdin.) |
| output | <code>WritableStream</code> | The output stream for activating mouse support and bracketed paste mode. (Normally stdout.) Optional. |
| options | <code>TermOptions</code> |  |

<a name="module_tty-events--Terminal+pause"></a>

### terminal.pause()
Removes the `data` listener from the input stream.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+resume"></a>

### terminal.resume()
Attaches the `data` listener to the input stream.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+enableMouse"></a>

### terminal.enableMouse(mode, sgr)
Enables mouse events.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| mode | <code>number</code> | <code>0</code> | The mouse mode (one of the constants) |
| sgr | <code>boolean</code> | <code>true</code> | Whether to try to activate SGR extended mode |

<a name="module_tty-events--Terminal+disableMouse"></a>

### terminal.disableMouse()
Disables mouse events.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+enableBPM"></a>

### terminal.enableBPM()
Enables bracketed paste mode.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+disableBPM"></a>

### terminal.disableBPM()
Disables bracketed paste mode.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+enableFocus"></a>

### terminal.enableFocus()
Enables focus events.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+disableFocus"></a>

### terminal.disableFocus()
Disables focus events.

**Kind**: instance method of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+event_keypress"></a>

### "keypress"
Event fired when a key (or key combinaion) is pressed.

**Kind**: event emitted by [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+event_mousedown"></a>

### "mousedown"
Event fired when a mouse button is pressed down.

**Kind**: event emitted by [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+event_mouseup"></a>

### "mouseup"
Event fired when a mouse button is released.

**Kind**: event emitted by [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+event_mousemove"></a>

### "mousemove"
Event fired when the cursor moves.

**Kind**: event emitted by [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+event_wheel"></a>

### "wheel"
Event fired when the mouse wheel is moved or when the scroll action is triggered (for example, using two fingers on a trackpad).

**Kind**: event emitted by [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+event_mouse"></a>

### "mouse"
Event fired with any mouse event.

**Kind**: event emitted by [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
**See**: module:tty-events.MouseEvent#type  
<a name="module_tty-events--Terminal+event_paste"></a>

### "paste"
Event fired when text is pasted while bracketed paste mode is activated.

**Kind**: event emitted by [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+event_focusin"></a>

### "focusin"
Event fired when the terminal window receives focus.

**Kind**: event emitted by [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+event_focusout"></a>

### "focusout"
Event fired when the terminal window loses focus.

**Kind**: event emitted by [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+event_highlight"></a>

### "highlight"
Event fired when text is selected using highlight tracking. This event may not fire if the selection was empty.

**Kind**: event emitted by [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal+event_unknownSequence"></a>

### "unknownSequence"
Event fired when the terminal receives an unrecognized or broken escape sequence.

**Kind**: event emitted by [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal..KeyboardEvent"></a>

### Terminal.KeyboardEvent
Represents a keyboard event (key or key combination).

**Kind**: static class of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  

* [.KeyboardEvent](#module_tty-events--Terminal..KeyboardEvent)
    * [.name](#module_tty-events--Terminal..KeyboardEvent+name) : <code>string</code>
    * [.sequence](#module_tty-events--Terminal..KeyboardEvent+sequence) : <code>string</code>
    * [.isSpecial](#module_tty-events--Terminal..KeyboardEvent+isSpecial) : <code>boolean</code>
    * [.ctrl](#module_tty-events--Terminal..KeyboardEvent+ctrl) : <code>boolean</code>
    * [.alt](#module_tty-events--Terminal..KeyboardEvent+alt) : <code>boolean</code>
    * [.shift](#module_tty-events--Terminal..KeyboardEvent+shift) : <code>boolean</code>
    * [.meta](#module_tty-events--Terminal..KeyboardEvent+meta) : <code>boolean</code>
    * [.toString()](#module_tty-events--Terminal..KeyboardEvent+toString)

<a name="module_tty-events--Terminal..KeyboardEvent+name"></a>

#### keyboardEvent.name : <code>string</code>
The key name (for special keys) or character produced by the key.

**Kind**: instance property of [<code>KeyboardEvent</code>](#module_tty-events--Terminal..KeyboardEvent)  
<a name="module_tty-events--Terminal..KeyboardEvent+sequence"></a>

#### keyboardEvent.sequence : <code>string</code>
The sequence produced by the key / key combination.

**Kind**: instance property of [<code>KeyboardEvent</code>](#module_tty-events--Terminal..KeyboardEvent)  
<a name="module_tty-events--Terminal..KeyboardEvent+isSpecial"></a>

#### keyboardEvent.isSpecial : <code>boolean</code>
Determines if the key is a special key. Special keys have names like `f2` or `backspace` or are a combination of Ctrl+symbol / Ctrl+letter.

**Kind**: instance property of [<code>KeyboardEvent</code>](#module_tty-events--Terminal..KeyboardEvent)  
<a name="module_tty-events--Terminal..KeyboardEvent+ctrl"></a>

#### keyboardEvent.ctrl : <code>boolean</code>
Determines if the Ctrl modifier was being pressed with the key. If the key is not a special key, this is always `false`.

**Kind**: instance property of [<code>KeyboardEvent</code>](#module_tty-events--Terminal..KeyboardEvent)  
<a name="module_tty-events--Terminal..KeyboardEvent+alt"></a>

#### keyboardEvent.alt : <code>boolean</code>
Determines if the Alt modifier was being pressed with the key.

**Kind**: instance property of [<code>KeyboardEvent</code>](#module_tty-events--Terminal..KeyboardEvent)  
<a name="module_tty-events--Terminal..KeyboardEvent+shift"></a>

#### keyboardEvent.shift : <code>boolean</code>
Determines if the Shift modifier was being pressed with the key. If the key is not a special key, this is always `false`.

**Kind**: instance property of [<code>KeyboardEvent</code>](#module_tty-events--Terminal..KeyboardEvent)  
<a name="module_tty-events--Terminal..KeyboardEvent+meta"></a>

#### keyboardEvent.meta : <code>boolean</code>
Determines if the Alt modifier was being pressed with the key. Present for compatibility with the `readline` module.

**Kind**: instance property of [<code>KeyboardEvent</code>](#module_tty-events--Terminal..KeyboardEvent)  
<a name="module_tty-events--Terminal..KeyboardEvent+toString"></a>

#### keyboardEvent.toString()
Represents the key combination with a string in the format `["Ctrl+"]["Alt+"]["Shift+"]key.name`. For example: `"b"`, `"B"`, `"Ctrl+e"`, `"Ctrl+Shift+home"`, `"+"`.

**Kind**: instance method of [<code>KeyboardEvent</code>](#module_tty-events--Terminal..KeyboardEvent)  
<a name="module_tty-events--Terminal.MouseEvent"></a>

### Terminal.MouseEvent
Represents a mouse event (click, wheel, etc.).

**Kind**: static class of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  

* [.MouseEvent](#module_tty-events--Terminal.MouseEvent)
    * [.x](#module_tty-events--Terminal.MouseEvent+x) : <code>number</code>
    * [.y](#module_tty-events--Terminal.MouseEvent+y) : <code>number</code>
    * [.button](#module_tty-events--Terminal.MouseEvent+button) : <code>number</code>
    * [.ctrl](#module_tty-events--Terminal.MouseEvent+ctrl) : <code>boolean</code>
    * [.alt](#module_tty-events--Terminal.MouseEvent+alt) : <code>boolean</code>
    * [.shift](#module_tty-events--Terminal.MouseEvent+shift) : <code>boolean</code>
    * [.type](#module_tty-events--Terminal.MouseEvent+type) : <code>string</code>
    * [.direction](#module_tty-events--Terminal.MouseEvent+direction) : <code>number</code>

<a name="module_tty-events--Terminal.MouseEvent+x"></a>

#### mouseEvent.x : <code>number</code>
The x coordinate of where the mouse event happened (1 = leftmost column).

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-events--Terminal.MouseEvent)  
<a name="module_tty-events--Terminal.MouseEvent+y"></a>

#### mouseEvent.y : <code>number</code>
The y coordinate of where the mouse event happened (1 = topmost row).

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-events--Terminal.MouseEvent)  
<a name="module_tty-events--Terminal.MouseEvent+button"></a>

#### mouseEvent.button : <code>number</code>
The button number, in the range 1-11. This property might be `undefined` for `mouseup` and `mousemove` events. If `undefined` in a `mousemove` event, no button was pressed when the cursor moved.List of mouse buttons (from [http://xahlee.info/linux/linux_x11_mouse_button_number.html](http://xahlee.info/linux/linux_x11_mouse_button_number.html)):- `1`: Left button- `2`: Middle (wheel) button- `3`: Right button- `4`: Rotate wheel up- `5`: Rotate wheel down- `6`: Push wheel left- `7`: Push wheel right- `8`: 4th button or XButton1 (browser back)- `9`: 5th button or XButton2 (browser forward)

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-events--Terminal.MouseEvent)  
<a name="module_tty-events--Terminal.MouseEvent+ctrl"></a>

#### mouseEvent.ctrl : <code>boolean</code>
Determines if the Ctrl modifier was being pressed when the mouse event occured.

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-events--Terminal.MouseEvent)  
<a name="module_tty-events--Terminal.MouseEvent+alt"></a>

#### mouseEvent.alt : <code>boolean</code>
Determines if the Alt modifier was being pressed when the mouse event occured.

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-events--Terminal.MouseEvent)  
<a name="module_tty-events--Terminal.MouseEvent+shift"></a>

#### mouseEvent.shift : <code>boolean</code>
Determines if the Shift modifier was being pressed when the mouse event occured.

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-events--Terminal.MouseEvent)  
<a name="module_tty-events--Terminal.MouseEvent+type"></a>

#### mouseEvent.type : <code>string</code>
Type of mouse event (`mousedown`, `mouseup`, `mousemove` or `wheel`).

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-events--Terminal.MouseEvent)  
<a name="module_tty-events--Terminal.MouseEvent+direction"></a>

#### mouseEvent.direction : <code>number</code>
Only for `wheel` events. Direction of the wheel turn (1 = down; -1 = up).

**Kind**: instance property of [<code>MouseEvent</code>](#module_tty-events--Terminal.MouseEvent)  
<a name="module_tty-events--Terminal..HighlightEvent"></a>

### Terminal.HighlightEvent
Represents a highlight selection.

**Kind**: static class of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  

* [.HighlightEvent](#module_tty-events--Terminal..HighlightEvent)
    * [.startX](#module_tty-events--Terminal..HighlightEvent+startX) : <code>number</code>
    * [.startY](#module_tty-events--Terminal..HighlightEvent+startY) : <code>number</code>
    * [.endX](#module_tty-events--Terminal..HighlightEvent+endX) : <code>number</code>
    * [.endY](#module_tty-events--Terminal..HighlightEvent+endY) : <code>number</code>
    * [.mouseX](#module_tty-events--Terminal..HighlightEvent+mouseX) : <code>number</code>
    * [.mouseY](#module_tty-events--Terminal..HighlightEvent+mouseY) : <code>number</code>

<a name="module_tty-events--Terminal..HighlightEvent+startX"></a>

#### highlightEvent.startX : <code>number</code>
The x coordinate of the first character of the selection.

**Kind**: instance property of [<code>HighlightEvent</code>](#module_tty-events--Terminal..HighlightEvent)  
<a name="module_tty-events--Terminal..HighlightEvent+startY"></a>

#### highlightEvent.startY : <code>number</code>
The y coordinate of the first character of the selection.

**Kind**: instance property of [<code>HighlightEvent</code>](#module_tty-events--Terminal..HighlightEvent)  
<a name="module_tty-events--Terminal..HighlightEvent+endX"></a>

#### highlightEvent.endX : <code>number</code>
The x coordinate of the first character after the selection.

**Kind**: instance property of [<code>HighlightEvent</code>](#module_tty-events--Terminal..HighlightEvent)  
<a name="module_tty-events--Terminal..HighlightEvent+endY"></a>

#### highlightEvent.endY : <code>number</code>
The y coordinate of the first character after the selection.

**Kind**: instance property of [<code>HighlightEvent</code>](#module_tty-events--Terminal..HighlightEvent)  
<a name="module_tty-events--Terminal..HighlightEvent+mouseX"></a>

#### highlightEvent.mouseX : <code>number</code>
The x coordinate of the mouse position.

**Kind**: instance property of [<code>HighlightEvent</code>](#module_tty-events--Terminal..HighlightEvent)  
<a name="module_tty-events--Terminal..HighlightEvent+mouseY"></a>

#### highlightEvent.mouseY : <code>number</code>
The y coordinate of the mouse position.

**Kind**: instance property of [<code>HighlightEvent</code>](#module_tty-events--Terminal..HighlightEvent)  
<a name="module_tty-events--Terminal.VT200_MOUSE"></a>

### Terminal.VT200\_MOUSE
Constant used for `enableMouse()`: Only mousedown, mouseup and wheel events.

**Kind**: static constant of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal.VT200_HIGHLIGHT_MOUSE"></a>

### Terminal.VT200\_HIGHLIGHT\_MOUSE
Constant used for `enableMouse()`: Mouse highlight tracking. **If you use this constant, make sure to respond to `mousedown` events with a proper escape sequence, otherwise the terminal may hang.**

**Kind**: static constant of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal.BTN_EVENT_MOUSE"></a>

### Terminal.BTN\_EVENT\_MOUSE
Constant used for `enableMouse()`: Motion events only when buttons are down.

**Kind**: static constant of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal.ANY_EVENT_MOUSE"></a>

### Terminal.ANY\_EVENT\_MOUSE
Constant used for `enableMouse()`: All events.

**Kind**: static constant of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
<a name="module_tty-events--Terminal..TermOptions"></a>

### Terminal~TermOptions
**Kind**: inner typedef of [<code>Terminal</code>](#exp_module_tty-events--Terminal)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| timeout | <code>number</code> | <code>500</code> | The escape sequence timeout, in millisseconds. `tty-events` will stop waiting for the rest of an escape sequence when the timeout fires. `Infinity` = no timeout. |

