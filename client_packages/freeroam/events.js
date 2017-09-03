exports = function(menu) {
    // Add player in the table.
    mp.events.add('playerJoinedServer', (id, name) => {
        if (menu)
            menu.execute(`addPlayerInTheTable('${id}', '${name}');`);
    });

    // Remove player from the table.
    mp.events.add('playerLeavedServer', (id, name) => {
        if (menu)
            menu.execute(`removePlayerInTheTable('${id}');`);
    });

    // Hide vehicle buttons, when player exits vehicle (triggered from server, will be fixed on the client-side).
    function hideVehicleButtons(player, vehicle, seat) {
        if (menu)
            menu.execute('$("#vehicle_buttons").fadeOut(250);');
    }
    mp.events.add('playerExitVehicle', hideVehicleButtons);
    mp.events.add('hideVehicleButtons', hideVehicleButtons);

    // Show vehicle buttons, when player enters vehicle (triggered from server, will be fixed on the client-side).
    mp.events.add('playerEnteredVehicle', (player, vehicle, seat) => {
        if (menu)
            menu.execute('$("#vehicle_buttons").fadeIn(250);');
    });
    
    // Change chat activity.
    mp.events.add('chatInputActive', () => {
        if (menu)
            menu.execute(`setChatActive(true);`);
    });

    mp.events.add('chatInputInactive', () => {
        if (menu)
            menu.execute(`setChatActive(false);`);
    });

    // Getting data from CEF.
    mp.events.add('cefData', function() {
        // CEF data.
        if (arguments[0] !== 'client_color')
            mp.events.callRemote('clientData', JSON.stringify(arguments));
        // Vehicle color or neon.
        else {
            let color = JSON.parse(arguments[2]);
            switch (arguments[1]) {
                // Primary color.
                case 'primary':
                    mp.players.local.vehicle.setCustomPrimaryColour(color.r, color.g, color.b);
                    
                    break;
                // Secondary color.
                case 'secondary':
                    mp.players.local.vehicle.setCustomSecondaryColour(color.r, color.g, color.b);
                    
                    break;
                // Neon.
                case 'neon':
                    // If vehicle neon disabled - enable it.
                    if (!mp.players.local.vehicle.isNeonLightEnabled(0)) {
                        for (let i = 0; i < 4; i++) {
                            mp.players.local.vehicle.setNeonLightEnabled(i, true);
                        }
                    }
                    
                    // Set neon color.
                    mp.players.local.vehicle.setNeonLightsColour(color.r, color.g, color.b);
                    
                    break;
            }
        }
    });
}