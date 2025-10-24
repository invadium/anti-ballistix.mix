function scenario(st) {
    const scenarioProfile = $.sce.locate(st.id)
    scenarioProfile.flaks = st.flaks || env.tune.flaks.default

    lab.monitor.controller.dropAllTargetMaps()

    lab.control.state.transitTo('city', extend({
        next: function() {
            lab.control.mission.newScenario(scenarioProfile)
        }
    }, st))
}
