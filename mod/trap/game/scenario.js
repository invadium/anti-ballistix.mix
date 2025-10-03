function scenario(st) {
    // TODO find and setup the scenario
    // ...
    // hardcoded for now
    const scenarioDef = $.sce._ls[1]

    lab.monitor.controller.dropAllTargetMaps()

    lab.control.state.transitTo('city', extend({
        next: function() {
            lab.control.mission.newScenario(scenarioDef)
        }
    }, st))
}
