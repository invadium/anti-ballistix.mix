function over() {
    env.gameState = 'gameOver'
    lab.control.state.transitTo('gameover', {
        fadein: 5,
    })
}
