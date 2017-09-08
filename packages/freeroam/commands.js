mp.events.addCommand('veh', (player, _, vehName) => {
    if (vehName && vehName.trim().length > 0) {
        let pos = player.position;
        pos.x += 2;
        // If player has vehicle - change model.
        if (player.customData.vehicle) {
            player.customData.vehicle.repair();
            player.customData.vehicle.position = pos;
            player.customData.vehicle.model = mp.joaat(vehName);
        // Else - create new vehicle.
        } else {
            player.customData.vehicle = mp.vehicles.new(mp.joaat(vehName), pos);
        }
    } else {
        player.outputChatBox(`<b>Command syntax:</b> /veh [vehicle_name]`);
    }
});

mp.events.addCommand('skin', (player, _, skinName) => {
    if (skinName && skinName.trim().length > 0)
        player.model = mp.joaat(skinName);
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
    } else {
        player.outputChatBox(`<b>Error:</b> you are not in the vehicle!`);
    }
});

mp.events.addCommand('weapon', (player, _, weaponName) => {
    if (weaponName.trim().length > 0)
        player.giveWeapon(mp.joaat(`weapon_${weaponName}`), 100);
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

mp.events.addCommand('warp', (player, _, playerID) => {
    if (playerID && playerID.trim().length > 0) {
        let sourcePlayer = mp.players.at(parseInt(playerID));
        if (sourcePlayer) {
            let playerPos = sourcePlayer.position;
            playerPos.x += 1;
            player.position = playerPos;
        } else {
            player.outputChatBox(`<b>Warp:</b> player with such ID not found!`);
        }
    } else
        player.outputChatBox(`<b>Command syntax:</b> /warp [player_id]`);
});

mp.events.addCommand('tp', (player, _, x, y ,z) => {
    if (!isNaN(parseFloat(x)) && !isNaN(parseFloat(y)) && !isNaN(parseFloat(z)))
        player.position = new mp.Vector3(parseFloat(x),parseFloat(y),parseFloat(z));
    else
        player.outputChatBox(`<b>Command syntax:</b> /tp [x] [y] [z]`);
});
