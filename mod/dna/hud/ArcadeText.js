/*
 * An overlay component to type out text
 *
 * The most important interface of this class is the _typeOut()_ function,
 * that schedules the typeout of the provided text message.
 *
 * In the simplest form it accepts a string to type out -
 * default settings will be applied in that case.
 *
 * ```
 * arcadeText.typeOut('A simplest message')
 * ```
 *
 * You can customize behavior by supplying a message object
 * containing the text to type out and an optional set of
 * parameters to apply to this particular message:
 *
 * ```
 * arcadeText.typeOut({
 *     // the message text
 *     text:     'Just a Test Message to Type Out',
 *
 *     // custom message parameters (all optional)
 *     typeFQ:    8,  // specify how many characters per second to type with this message (default: 12)
 *     delay:     1,  // specify the initial delay before the type out starts (default: 0)
 *     keep:      3,  // how long the message should be kept after fully printed (default: 5)
 *     fadeOut:   2,  // specify the message fade out time (default: 1)
 *     withhold:  1,  // how long to withhold this message before discarding it
 *                    // and moving to the next one if any (default: 0)
 *
 *     // event handlers - will be triggered in the listed order when defined
 *     onSchedule: function() {}, // triggered when the message is added to the waiting queue
 *     onStart:    function() {}, // triggered when the message is activated from the waiting queue
 *                                // and is waiting to be typed out
 *     onType:     function() {}, // a handler for start of typing
 *     onDisplay:  function() {}, // triggered when the message is fully typed
 *     onFadeOut:  function() {}, // triggered after the keep time is out
 *                                // and the message starts to fade out
 *     onWithhold: function() {}, // triggered after the message is fully faded out
 *     onFinish:   function() {}, // triggered when the message is fully finished and about to be discarded
 * })
 * ```
 *
 * You can also supply a list of messages (in any form - string or object)
 * to type out one by one:
 *
 * ```
 * arcadeText.typeOut([
 *     'The First Message',
 *     {
 *         text: 'The Second Message',
 *         delay: 4,
 *     }
 * ])
 * ```
 */

const SCHEDULED   = 0,
      AWAITING    = 1,
      TYPING      = 2,
      DISPLAYED   = 3,
      FADING_OUT  = 4,
      WITHHOLDING = 5,
      FINISHED    = 6

const dfMsg = {
    state:    SCHEDULED,
    text:     '',
    lines:    [],
    length:   0,

    typeFQ:   12,
    delay:    0,
    keep:     5,
    fadeOut:  1,
    withhold: 0,

    progression: 0,
    splitTime:   0,
}

let id = 0

function rightPad(line, len) {
    for (let i = line.length; i < len; i++) line = line + ' '
    return line
}

class ArcadeText {

    constructor(st) {
        extend(this, {
            name:         'arcadeText' + (++id),
            msg:          null,
            queue:        [],

            color:        '#dede90',
            font:         '24px pixel-operator',
            align:        'center',
            baseline:     'middle',
            step:          28,
            x:             0,
            y:             0,
            rx:           .5,
            ry:           .5,
            shadowDx:      5,
            shadowDy:      5,

        }, st)
    }

    schedule(msg) {
        this.queue.push(msg)
        if (isFun(msg.onSchedule)) msg.onSchedule()
        this.keepSchedule()
    }

    start() {
        const msg = this.msg
        if (!msg) return

        msg.state = AWAITING
        msg.splitTime = env.time
        msg.progression = 0
        if (isFun(msg.onStart)) msg.onStart()
    }

    fadeOut() {
        const msg = this.msg
        if (!msg) return

        msg.state = FADING_OUT
        msg.splitTime = env.time
        msg.withhold = 0
    }

    finish() {
        const msg = this.msg
        if (!msg) return

        msg.state = FINISHED
        msg.finishTime = env.time
        if (isFun(msg.onFinish)) msg.onFinish()
        this.msg = null
    }

    keepSchedule() {
        if (this.msg) return
        if (this.queue.length === 0) return

        this.msg = this.queue.shift()
        this.start()
    }

    // type out the next scheduled message if any
    next() {
        this.finish()
        this.keepSchedule()
    }

    clearSchedule() {
        this.queue.length = 0
    }

    // type out provided text
    //
    // @param {string or object} st - a string or a message object
    typeOut(st) {
        let msg
        if (isArr(st)) {
            const _ = this
            st.forEach(msg => _.typeOut(msg))
            return
        } else if (isStr(st)) {
            msg = extend({}, dfMsg, {
                text: st,
            })
        } else {
            msg = extend({}, dfMsg, st)
        }
        msg.__ = this

        if (msg.text) {
            msg.lines = msg.text.split('\n')
            msg.length = msg.lines.reduce((acc, line) => acc + line.length, 0)
        }
        msg.createdTime = env.time

        this.schedule(msg)
    }

    evo(dt) {
        const msg = this.msg
        if (!msg) return

        switch(msg.state) {
            case AWAITING:
                if (env.time - msg.splitTime >= msg.delay) {
                    msg.state = TYPING
                    msg.splitTime = env.time
                    if (isFun(msg.onType)) msg.onType()
                }
                break
            case TYPING:
                msg.progression = floor((env.time - msg.splitTime) * msg.typeFQ)
                if (msg.progression >= msg.length) {
                    msg.state = DISPLAYED
                    msg.splitTime = env.time
                    if (isFun(msg.onDisplay)) msg.onDisplay()
                }
                break
            case DISPLAYED:
                if (env.time - msg.splitTime >= msg.keep) {
                    msg.state = FADING_OUT
                    msg.splitTime = env.time
                    if (isFun(msg.onFadeOut)) msg.onFadeOut()
                }
                break
            case FADING_OUT:
                if (env.time - msg.splitTime >= msg.fadeOut) {
                    msg.state = WITHHOLDING
                    msg.splitTime = env.time
                    if (isFun(msg.onWithhold)) msg.onWithhold()
                }
                break
            case WITHHOLDING:
                if (env.time - msg.splitTime >= msg.withhold) {
                    this.next()
                }
                break
        }
    }

    draw() {
        const msg = this.msg
        if (!msg || msg.length === 0) return
        if (msg.state < 2 || msg.state > 4) return

        save()

        ctx.textAlign    = this.align
        ctx.textBaseline = this.baseline
        font(this.font)

        let tx = isNumber(this.rx)? rx(this.rx) : this.x
        let ty = isNumber(this.ry)? ry(this.ry) : this.y
        const stepY = this.step

        let charCount = 0
        for (let i = 0; i < msg.lines.length; i++) {
            const line = msg.lines[i]
            let hShift = 0

            if (charCount < msg.progression) {
                let vline = line
                
                if (msg.progression < charCount + line.length) {
                    vline = line.substring(0, msg.progression - charCount)
                    switch(this.align) {
                        case 'center': hShift = -.5 * (textWidth(line) - textWidth(vline)); break;
                        case 'right':  hShift = -textWidth(line) - textWidth(vline); break;
                    }
                }

                if (msg.state === FADING_OUT) {
                    alpha( max(1 - (env.time - msg.splitTime) / msg.fadeOut, 0) )
                }

                if (this.shadowColor) {
                    fill(this.shadowColor)
                    text(vline, tx+this.shadowDx+hShift, ty+this.shadowDy)
                }
                fill(this.color)
                text(vline, tx+hShift, ty)
            }

            charCount += line.length
            ty += stepY
        }

        restore()
    }
}
