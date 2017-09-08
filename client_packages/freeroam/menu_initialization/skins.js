// Adding skins in the skins window.
exports = function(browser, skins) {
    skins.forEach(skin => {
        let skinName = skin.replace(/[a-z]_[a-z]_([a-z]_)?/ig, '').replace(/0/ig, '');
        let query = `<div class="item skin" data-name="${skin}">${skinName.toUpperCase()}</div>`;
        browser.execute(`$('#skins_window .window_body').append('${query}')`);
    });
};
