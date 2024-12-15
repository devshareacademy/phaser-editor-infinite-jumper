import Level from "./scenes/Level.js";
import Preload from "./scenes/Preload.js";
import UI from "./scenes/UI.js";
import GameOver from "./scenes/GameOver.js";
import Title from "./scenes/Title.js";

window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: 240,
		height: 176,
		type: Phaser.AUTO,
        backgroundColor: "#000000",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		},
		pixelArt: true,
		physics: {
			default: 'arcade',
			arcade: {
				gravity: {
					x: 0,
					y: 300
				},
				debug: false
			}
		}
	});

	game.scene.add("Level", Level);
	game.scene.add("UI", UI);
	game.scene.add("GameOver", GameOver);
	game.scene.add("Title", Title);
	game.scene.add("Preload", Preload, true);
});
