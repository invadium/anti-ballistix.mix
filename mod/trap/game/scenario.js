function scenario(st) {
    // TODO find and setup the scenario
    // ...
    // hardcoded for now
    const scenarioConfig = $.sce._ls[0]

    lab.monitor.controller.dropAllTargetMaps()

    lab.control.state.transitTo('city', extend({
        next: function() {
            lab.control.mission.newScenario(scenarioConfig)
        }
    }, st))
}
