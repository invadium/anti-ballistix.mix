function level(st) {
    // TODO find and setup the level
    // ...
    const levelConfig = $.lvl._ls[0]

    lab.control.game.level(levelConfig)

    lab.control.state.transitTo('city', st)
}
