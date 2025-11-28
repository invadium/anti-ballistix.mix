const waves = [

    {
        // default wave for this scenario
        delay: 10,
        time:  60,
    },

    // wave 1
    {
        time:  120,
        delay: 5,

        fq: {
            drones:            .40,
            ballisticMissiles: 0,
        },
    },
    // wave 2
    {
        time: 180,
        fq: {
            drones:            .30,
            ballisticMissiles: .05,
        },
    },
    // wave 3
    {
        time: 180,
        fq: {
            drones:            .0,
            ballisticMissiles: .25,
        },
    },
]
