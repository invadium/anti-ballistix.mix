function scenario(st) {
    //const scenarioProfile = $.sce._ls[st.id] || $.sce._ls[1]
    const scenarioProfile = $.sce.locate(st.id) || $.sce._ls[1]

    lab.monitor.controller.dropAllTargetMaps()

    lab.control.state.transitTo('city', extend({
        next: function() {
            lab.control.mission.newScenario(scenarioProfile)
        }
    }, st))
}
