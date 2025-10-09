function genFlak(st) {
    const N = st.flaks
          step = 100 / (N+1)
    let   bx   = step

    for (let i = 0; i < N; i++) {

        const flak = lab.port.spawn( dna.city.Flak, {
            Z:    101,
            team: 1,
            x:    crx(bx),
            y:    cry(10),
            pods:  [
                new dna.city.pod.Bot(),
                new dna.city.pod.FireControlRadar(),
            ],
        })
        flak.activatePod(flak.bot)

        bx += step
    }
}
