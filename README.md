# RAGE.MP Freeroam package
## Description
This is a graphical interface for freeroam servers. Instead of having to memorize and enter console commands, players can click buttons and make selections from lists. Many features are available: vehicles, weapons, skins, etc.
## Instalation
1. `git clone https://github.com/n-n1ks/rage.mp-freeroam.git`.
2. Copy `packages` and `client_packages` to `<rage.mp_client>/server-files/` folder.
3. Start `server.exe`.
### IMPORTANT!
If you are using some client packages - don't override your `index.js` file in `client_packages` folder. Just add this line in `index.js`:
```JavaScript
require('freeroam/index.js');
```
Otherwise another client pacakges wont work!
## License
Freeroam is released under the [MIT License](https://opensource.org/licenses/MIT).