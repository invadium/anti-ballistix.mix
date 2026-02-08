const tune = {
    horizonLine:      .6,     // represents relative size of the sky against the ground
    citySkyLine:       0,     // relative to the horizon line in screen (port?) coordinates
    cityBaseHeight:   .14,
    // powerStationLine: .1,  // TODO deprecate, it should be defined within the battleZone

    // TODO redefine in normalized ground coordinates?
    battleZone: {
        start:        .68,
        end:          .95,
    },
    battleground: {
        start:        .1,    // in ground-normal y coordinates
        height:       .8,
    },
    powerZone: {
        start:        .2,    // battleground-normal y coordinates
        end:          .6,
    },

    building: {
        baseHeight:   .07,
        varHeight:    .15,
        baseWidth:    .04,
        varWidth:     .10,
        floorHeight:  .075,  // relative to BH
        windowHeight: .35, // relative to the floor height
    },

    gameOverTimeout: 3,

    friendlyFire: false,

    flaks: {
        min:     1,
        default: 3,
        max:     7,
    },

    player: {
        botTakeoverTimeout: 30,
    },

    title: {
        hold: 5,
    },

    gameOver: {
        hold: 15,
    },

    credits: {
        hold: 8,
    },

    control: {
        ffwSpeed:      8,
        ffwStep:       1.5,
        slowDownSpeed: 0.25,
        slowDownStep:  0.75,
    },

    mixer: {
        fadeOutSpeed: 0.25,
        fadeInSpeed:  0.50,
    },
}
