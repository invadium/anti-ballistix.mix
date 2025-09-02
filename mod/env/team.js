const team = [
    {
        name: 'neutral',
        // TODO color & glow is already deprecated?
        color: hsl(.01, 0, 1),
        glow:  hsl(.01, 0, 1),
    },
    {
        name:  'friends',
        color: '#00ffff',
        glow:  '#00ffff',
    },
    {
        name: 'enemy',
        color: '#ff0000',
        glow:  '#ff0000',
    },
    {
        name: 'danger',
        color: '#ffff00',
        glow:  '#ffff00',
    },
]

function matchTeam(e) {
    if (!e) return team[0]

    const iteam = e.team || 0
    const t = team[iteam]

    return (t || team[0])
}

team.color = function(e) {
    return matchTeam(e).color
}
team.glow = function(e) {
    return matchTeam(e).glow
}
