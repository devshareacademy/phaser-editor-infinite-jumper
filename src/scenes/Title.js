
// You can write more code here

/* START OF COMPILED CODE */

import BackgroundPrefab from "../prefabs/BackgroundPrefab.js";
import ForegroundPrefab from "../prefabs/ForegroundPrefab.js";
import RightWallPrefab from "../prefabs/RightWallPrefab.js";
import LeftWallPrefab from "../prefabs/LeftWallPrefab.js";
import PlayerPrefab from "../prefabs/PlayerPrefab.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Title extends Phaser.Scene {

	constructor() {
		super("Title");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// editabletilemap
		this.cache.tilemap.add("editabletilemap_c7d66947-190a-4c6e-8517-469e089d8734", {
			format: 1,
			data: {
				width: 15,
				height: 2,
				orientation: "orthogonal",
				tilewidth: 16,
				tileheight: 16,
				tilesets: [
					{
						columns: 24,
						margin: 0,
						spacing: 0,
						tilewidth: 16,
						tileheight: 16,
						tilecount: 288,
						firstgid: 1,
						image: "tilesets",
						name: "tilesets",
						imagewidth: 384,
						imageheight: 192,
					},
				],
				layers: [
					{
						type: "tilelayer",
						name: "groundLayer",
						width: 15,
						height: 2,
						opacity: 1,
						data: [153, 146, 160, 148, 149, 0, 0, 0, 0, 0, 159, 151, 159, 148, 149, 177, 170, 184, 172, 173, 27, 28, 29, 30, 31, 183, 175, 183, 172, 173],
					},
				],
			},
		});
		const editabletilemap = this.add.tilemap("editabletilemap_c7d66947-190a-4c6e-8517-469e089d8734");
		editabletilemap.addTilesetImage("tilesets");

		// backgroundLayer
		const backgroundLayer = this.add.layer();

		// backgroundPrefab
		const backgroundPrefab = new BackgroundPrefab(this, 0, 0);
		backgroundLayer.add(backgroundPrefab);

		// foregroundPrefab
		const foregroundPrefab = new ForegroundPrefab(this, 0, 0);
		backgroundLayer.add(foregroundPrefab);

		// rightWallPrefab
		const rightWallPrefab = new RightWallPrefab(this, 224, 0);
		backgroundLayer.add(rightWallPrefab);

		// leftWallPrefab
		const leftWallPrefab = new LeftWallPrefab(this, 0, 0);
		backgroundLayer.add(leftWallPrefab);

		// groundLayer
		editabletilemap.createLayer("groundLayer", ["tilesets"], 0, 144);

		// player
		const player = new PlayerPrefab(this, 120, 136);
		this.add.existing(player);

		// titleTextGameObject
		const titleTextGameObject = this.add.text(32, 15, "", {});
		titleTextGameObject.text = "Warped Cave\nEscape";
		titleTextGameObject.setStyle({ "align": "center", "color": "#00ace1ff", "fontFamily": "PressStart2P-Regular", "stroke": "#00ffff", "shadow.offsetX": 3, "shadow.offsetY": 1, "shadow.blur": 2, "shadow.stroke": true, "shadow.fill": true });
		titleTextGameObject.setLineSpacing(3);

		// clickToPlayTextGameObject
		const clickToPlayTextGameObject = this.add.text(68, 81, "", {});
		clickToPlayTextGameObject.text = "Click to Play";
		clickToPlayTextGameObject.setStyle({ "color": "#59006eff", "fontFamily": "PressStart2P-Regular", "fontSize": "8px", "stroke": "#000000" });

		this.player = player;
		this.clickToPlayTextGameObject = clickToPlayTextGameObject;
		this.editabletilemap = editabletilemap;

		this.events.emit("scene-awake");
	}

	/** @type {PlayerPrefab} */
	player;
	/** @type {Phaser.GameObjects.Text} */
	clickToPlayTextGameObject;
	/** @type {Phaser.Tilemaps.Tilemap} */
	editabletilemap;

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();

		this.cameras.main.fadeIn(500, 0, 0, 0);
		this.player.body.enable = false;
		const glowFx = this.player.postFX.addGlow(0x00ffff, 1, 0, false, 0.1, 5);
		const glowTween = this.tweens.add({
			targets: glowFx,
			outerStrength: 4,
			duration: 800,
			yoyo: true,
			repeat: -1
		});

		this.tweens.add({
			targets: this.clickToPlayTextGameObject,
			alpha: 0.2,
			duration: 1200,
			yoyo: true,
			repeat: -1,
			delay: 500,
			loopDelay: 500,
		});

		this.input.once(Phaser.Input.Events.POINTER_DOWN, () => {
			this.player.stop();
			this.player.setTexture("player-duck");
			this.time.delayedCall(1000, () => {
				this.player.play("playerIdle");
				glowTween.destroy();
				this.player.postFX.clear();
				this.startGame();
			});
		});
	}

	startGame() {
		// enable player physics after game starts
		this.player.body.enable = true;
		this.player.body.velocity.y = -1000;

		this.time.delayedCall(1000, () => {
			this.cameras.main.fadeOut(500,0,0,0);
			this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
				this.scene.start("Level");
			});
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
