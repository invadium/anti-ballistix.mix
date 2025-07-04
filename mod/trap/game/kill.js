module.exports = function(e) {
    if (e.score) env.score += e.score
    if (e.cost) env.balance += e.cost
}
