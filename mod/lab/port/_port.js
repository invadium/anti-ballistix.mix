/*
 * Viewport on the City
 */
const _port = {
    Z:     11,
    DNA:  'city/CityCamera',
    name: 'port',

    flipY: true,

    setup: function() {
        pin.link(this, 'cam')
    },
}
