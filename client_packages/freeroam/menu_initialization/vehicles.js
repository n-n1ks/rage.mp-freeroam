/* eslint no-useless-escape: 0 */

// Adding vehicles in the vehicles window.
exports = function(browser, vehicles) {
    Object.keys(vehicles).forEach((key) => {
        // Adding all cars.
        let cars = '';
        let keyFormated = key.toLowerCase().replace(/\s/g, '_');

        vehicles[key].forEach(vehName => {
            cars += `<div class="item vehicle" data-name="${vehName}">${vehName.toUpperCase()}</div>`;
        });

        let query = `
        <div class="item collapse_parent" data-parent="#vehicles_window" data-child="#${keyFormated}_list">
            ${key}
        </div>
        <div class="collapse_child" id="${keyFormated}_list" style="display: none;">
            ${cars}
        </div>`;

        let queryFormated = query.replace(/\n/g, '').replace(/"/g, '\"');

        browser.execute(`$('#vehicles_window .window_body').append('${queryFormated}')`);
    });
};
