const waves = [
    {
        // default wave for this scenario
        delay: 0,
        time:  60,
    },
    {
        fq: {
            drones:            .40,
        },
        shape: {
            // split the wave timespan on even slices
            // and apply % factor on frequencies relative to the max value
            // TODO maybe a custom text format with ASCII charts?
            drones: '011488422', 
            /*
             * --------------
             * drones: .25
             * --------------
             *      XX
             *      XX    X
             *   XXXXXX X XX
             *  XXXXXXXXXXXXX
             * --------------
             * missiles: .01
             * --------------
             *   XX  XX X XX
             *  XXXXXXXXXXXXX
             *
             *  or maybe vertical will be easier???
             *  probably so, but harder to compare to each other in that case!!!
             *  e.g.
             *  ------------------
             *  drones: .2
             *  ------------------
             *  X
             *  XX
             *  XX
             *  XXXXX
             *  XXXXXXX
             *  XXXXX
             *  XXXXXXX
             *  XX
             *  XX
             *  X
             *  -----------------
             */
        },
    },
    {
        fq: {
            drones:            .35,
            ballisticMissiles: .15,
        },
    },
    {
        seed:  101, // ???
        time:  30,
        limit: {
            ballisticMissiles: 20,
        },
        fq: {
            drones:            .0,
            ballisticMissiles: .25,
        },
    },
]
