function debug(args) {
    env.debug = !env.debug
    this.print('debug: ' + (env.debug? 'on' : 'off'))
}
debug.info = 'switch debug on/off'
