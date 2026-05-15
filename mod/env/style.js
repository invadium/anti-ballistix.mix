const style = {

    color: {
        main:  '#6b1fb1',
        // title: '#6b1fb1',
        title:    '#80dbff',
        subTitle: '#ff99ff',

        sky: '#1f123a',
        grid: '#9e0abf',

        powerStation: '#110f14',

        menu: {
            title: '#6b1fb1',
        },
        credits: {
            front: '#80dbff',
            // back:  '#3a1e7e',
            back:  '#F10000',
        },

        titleBar: {
            front:   '#ff9717',
            outline: '#000000',
        },
        messageBar: {
            front:   '#ff9717',
            outline: '#000000',
        },
        status: {
            front: '#ebff12',
            back:  '#000000C0',
        },

        neon: {
            red:     '#ff0000',
            green:   '#00ff00',
            blue:    '#00c0ff',
            cyan:    '#00ffff',
            yellow:  '#ffff00',
            purple:  '#8060ff',
            white:   '#ffffff',
        },
    },

    font: {
        main: {
            family: 'moon',
            size:   24,
        },

        title: {
            family: 'suggested-regular',
            size:   72,
        },
        subTitle: {
            family: 'kabur-regular',
            size:   78,
        },

        titleBar: {
            family: 'future-earth',
            size:   32,
        },
        messageBar: {
            family: 'future-earth',
            size:   48,
        },
        subMessageBar: {
            family: 'future-earth',
            size:   38,
        },
        menu: {
            family: 'future-earth',
            size:   32,
        },
        menuHigh: {
            family: 'future-earth',
            size:   35,
        },
        menuSuperHigh: {
            family: 'future-earth',
            size:   38,
        },
        menuPressed: {
            family: 'future-earth',
            size:   30,
        },
        credits: {
            // family: 'future-earth',
            family: 'kabur-regular',
            size:   42,
        },

        debug: {
            family: 'moon',
            size: 24,
        },
    },
}

function classifyFonts() {
    for (let id in style.font) {
        const font = style.font[id]
        font.id = id
        font.head = font.size + 'px ' + font.family
    }
}

(function setupStyles() {
    classifyFonts()
})()

