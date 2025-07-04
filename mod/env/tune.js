const tune = {
    horizonLine:      .6,
    citySkyLine:       0,
    cityBaseHeight:   .14,
    powerStationLine: .1,

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

    player: {
        releaseControlTimeout: 30,
    },

    title: {
        hold: 5,
    },

    gameover: {
        hold: 15,
    },

    credits: {
        hold: 8,
    },

    mixer: {
        fadeOutSpeed: 0.25,
        fadeInSpeed:  0.50,
    },
}
