// define the playable field
const playfield = {
    width:  2000,
    height: 1000,
    depth:  2000,

    adjust: function() {
        this.height = lab.port.getViewportHeight()
    },
}
