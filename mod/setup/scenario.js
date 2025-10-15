function scenario() {
    const menuList = $.sce._menuList = []
    $.sce._ls.forEach((scenario, i) => {
        scenario.attach(i, 'id')
        scenario.attach(scenario.info.title, 'title')

        if (i > 0) {
            menuList.push({
                id:    scenario.id,
                title: scenario.title,
            })
        }
    })
}
