const waves = [
    {
        // default wave for this scenario
        delay: 10,
        time:  150,
    },
    {
        time:  60,
        delay: 10,

        fq: {
            drones:            .40,
            ballisticMissiles: .05,
        },
    },
    {
        seed:  101, // ???
        limit: {
            ballisticMissiles: 20,
        },
        fq: {
            drones:            .0,
            ballisticMissiles: .25,
        },
    },
]
