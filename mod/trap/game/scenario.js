function scenario(st) {
    const scenarioProfile = $.scenario.locate(st.id)
    scenarioProfile.flaks = st.flaks || env.tune.flaks.default

    job.monitor.controller.dropAllTargetMaps()

    job.control.state.transitTo('city', extend({
        next: function() {
            job.control.mission.newScenario(scenarioProfile)
        }
    }, st))
}
