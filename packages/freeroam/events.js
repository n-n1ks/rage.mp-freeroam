let skins       = require('./configs/skins.json').Skins;
let spawnPoints = require('./configs/spawn_points.json').SpawnPoints;

/* !!! REMOVE AFTER FIX (TRIGGERED FROM SERVER) !!! */
mp.events.add('playerEnteredVehicle', (player) => {
    if (player.vehicle && player.seat === 0 || player.seat === 255)
        player.call('playerEnteredVehicle');
});
/* */

mp.events.add('playerExitVehicle', (player) => {
    player.call('playerExitVehicle');
});

mp.events.add('playerJoin', (player) => {
    player.customData = {};

    mp.players.forEach(_player => {
        if (_player != player)
            _player.call('playerJoinedServer', [player.id, player.name]);
    });

    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);

    player.model = skins[Math.floor(Math.random() * skins.length)];
    player.health = 100;
    player.armour = 100;
});

mp.events.add('playerQuit', (player) => {
    if (player.customData.vehicle)
        player.customData.vehicle.destroy();

    mp.players.forEach(_player => {
        if (_player != player)
            _player.call('playerLeavedServer', [player.id, player.name]);
    });
});

mp.events.add('playerDeath', (player) => {
    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);

    // player.model = skins[Math.floor(Math.random() * skins.length)];
    player.health = 100;
    player.armour = 100;
});

mp.events.add('playerChat', (player, message) => {
    mp.players.broadcast(`<b>${player.name}[${player.id}]:</b> ${message}`);
});

// Getting data from client.
mp.events.add('clientData', function() {
    let player = arguments[0];
    /*
        @@ args[0] - data name.
        @@ args[n] - data value (if it is needed).
    */
    let args = JSON.parse(arguments[1]);

    switch (args[0]) {
    // Suicide.
    case 'kill':
        player.health = 0;

        break;
    // Change skin.
    case 'skin':
        player.model = args[1];

        break;
    // Creating new vehicle for player.
    case 'vehicle':
        // If player has vehicle - change model.
        if (player.customData.vehicle) {
            let pos = player.position;
            pos.x += 2;
            player.customData.vehicle.position = pos;
            player.customData.vehicle.model = mp.joaat(args[1]);
        // Else - create new vehicle.
        } else {
            let pos = player.position;
            pos.x += 2;
            player.customData.vehicle = mp.vehicles.new(mp.joaat(args[1]), pos);
        }
        // Hide vehicle buttons (bugfix).
        player.call('hideVehicleButtons');

        break;
        // Weapon.
    case 'weapon':
        player.giveWeapon(mp.joaat(args[1]), 1000);

        break;
    // Repair the vehicle.
    case 'fix':
        if (player.vehicle)
            player.vehicle.repair();

        break;
    // Flip the vehicle.
    case 'flip':
        if (player.vehicle) {
            let rotation = player.vehicle.rotation;
            rotation.y = 0;
            player.vehicle.rotation = rotation;
        }

        break;
    // Vehicle color or neon.
    case 'server_color':
        if (player.vehicle) {
            if (args[1] == 'color') {
                let colorPrimary = JSON.parse(args[2]);
                let colorSecondary = JSON.parse(args[3]);
                player.vehicle.setColourRGB(colorPrimary.r, colorPrimary.g, colorPrimary.b, colorSecondary.r, colorSecondary.g, colorSecondary.b);
            }

            if (args[1] == 'neon') {
                let color = JSON.parse(args[2]);
                player.vehicle.setNeonColour(color.r, color.g, color.b);
            }
        }

        break;
    }
});
