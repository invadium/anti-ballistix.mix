const waves = [
    {
        // default wave for this scenario
        delay: 10,
        time:  150,
    },
    {
        time:  60,
        delay: 5,

        fq: {
            drones:            .40,
            ballisticMissiles: .05,
        },
    },
    {
        spawn: {
            ballisticMissiles: 20,
        },
        fq: {
            drones:            .0,
            ballisticMissiles: .25,
        },
    },
]
