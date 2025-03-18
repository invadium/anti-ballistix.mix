function level(st) {
    // TODO find and setup the level
    // ...
    lab.control.game.level({
        level: 1,
    })
    lab.control.state.transitTo('city', st)
}
