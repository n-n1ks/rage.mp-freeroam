/* eslint no-useless-escape: 0 */

// Adding weapon in the weapon window.
exports = function(browser, weapon) {
    Object.keys(weapon).forEach(key => {
        let weapons = '';
        let keyFormated = key.toLowerCase().replace(/\s/g, '_');

        weapon[key].forEach(weaponData => {
            weapons += `<div class="item weapon" data-hash="${weaponData.hash}">${weaponData.name}</div>`;
        });

        let query = `
        <div class="item collapse_parent" data-parent="#weapon_window" data-child="#${keyFormated}_list">
            ${key}
        </div>
        <div class="collapse_child" id="${keyFormated}_list" style="display: none;">
            ${weapons}
        </div>`;

        let queryFormated = query.replace(/\n/g, '').replace(/"/g, '\"');

        browser.execute(`$('#weapon_window .window_body').append('${queryFormated}')`);
    });
};
