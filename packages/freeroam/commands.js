module.exports = function() {
    mp.events.addCommand('veh', (player, vehName) => {
        if (vehName[0] && vehName[0].trim().length > 0) {
            // If player has vehicle - change model.
			if (player.customData.vehicle) {
                if (player.customData.vehicle.model != mp.joaat(vehName[0]))
				    player.customData.vehicle.model = mp.joaat(vehName[0]);
			// Else - create new vehicle.
			} else {
				let pos = player.position;
				pos.x += 2;
				player.customData.vehicle = mp.vehicles.new(mp.joaat(vehName[0]), pos);
			}
        } else
            player.outputChatBox(`<b>Command syntax:</b> /veh [vehicle_name]`);
    });

    mp.events.addCommand('skin', (player, skinName) => {
        if (skinName[0] && skinName[0].trim().length > 0)
            player.model = mp.joaat(skinName[0]);
        else
            player.outputChatBox(`<b>Command syntax:</b> /skin [skin_name]`);
    });

    mp.events.addCommand('fix', (player) => {
        if (player.vehicle)
            player.vehicle.repair();
        else
            player.outputChatBox(`<b>Error:</b> you are not in the vehicle!`);
    });

    mp.events.addCommand('flip', (player) => {
        if (player.vehicle) {
            let rotation = player.vehicle.rotation;
			rotation.y = 0;
			player.vehicle.rotation = rotation;
        } else
            player.outputChatBox(`<b>Error:</b> you are not in the vehicle!`);
    });

    mp.events.addCommand('weapon', (player, weaponName) => {
        if (weaponName[0] && weaponName[0].trim().length > 0)
            player.giveWeapon(mp.joaat(`weapon_${weaponName[0]}`), 100);
        else
            player.outputChatBox(`<b>Command syntax:</b> /weapon [weapon_name]`);
    });

    mp.events.addCommand('kill', (player) => {
        player.health = 0;
    });

    mp.events.addCommand('hp', (player) => {
        player.health = 100;
    });

    mp.events.addCommand('armour', (player) => {
        player.armour = 100;
    });

    mp.events.addCommand('warp', (player, playerID) => {
        if (playerID[0] && playerID[0].trim().length > 0) {
            let warped = false;
            mp.players.forEach(_player => {
                if (_player.id === parseInt(playerID[0])) {
                    let playerPos = _player.position;
                    playerPos.x += 1;
                    player.position = playerPos;
                    warped = true;
                }
            });

            if (!warped)
                player.outputChatBox(`<b>Error:</b> player with such id not found!`);     
        } else
            player.outputChatBox(`<b>Command syntax:</b> /warp [player_id]`);
    });

    mp.events.addCommand('tp', (player, pos) => {
        if (pos.length == 3 && parseFloat(pos[0]) && parseFloat(pos[1]) && parseFloat(pos[2]))
            player.position = new mp.Vector3(parseFloat(pos[0]),parseFloat(pos[1]),parseFloat(pos[2]));
        else
            player.outputChatBox(`<b>Command syntax:</b> /tp [x] [y] [z]`);
    });
}