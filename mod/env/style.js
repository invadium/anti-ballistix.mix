const style = {

    color: {
        main:  '#6b1fb1',
        title: '#6b1fb1',

        sky: '#1f123a',

        menu: {
            title: '#6b1fb1',
        },
        credits: {
            title: '#6b1fb1',
            front: '#62aadd',
            back:  '#3a1e7e',
        },
    },
    
    font: {
        main: {
            family: 'moon',
            size:   24,
        },
        title: {
            family: 'moon',
            size:   64,
        },
        menu: {
            family: 'moon',
            size:   32,
        },
        menuHigh: {
            family: 'moon',
            size:   36,
        },
        credits: {
            family: 'moon',
            size:   32,
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

