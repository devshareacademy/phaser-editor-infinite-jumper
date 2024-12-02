
// You can write more code here

/* START OF COMPILED CODE */

import PlatformGroupPrefab from "../prefabs/PlatformGroupPrefab.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

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

		// leftKeyboardKey
		const leftKeyboardKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

		// rightKeyboardKey
		const rightKeyboardKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

		// levelLayer
		const levelLayer = this.add.layer();

		// backgroundTileSprite
		const backgroundTileSprite = this.add.tileSprite(0, 0, 240, 176, "background");
		backgroundTileSprite.setOrigin(0, 0);
		levelLayer.add(backgroundTileSprite);

		// foregroundTileSprite
		const foregroundTileSprite = this.add.tileSprite(0, 0, 240, 176, "middleground-no-fungus");
		foregroundTileSprite.setOrigin(0, 0);
		levelLayer.add(foregroundTileSprite);

		// rightWallTileSprite
		const rightWallTileSprite = this.add.tileSprite(224, 0, 16, 176, "tilesets", 229);
		rightWallTileSprite.setOrigin(0, 0);
		levelLayer.add(rightWallTileSprite);

		// leftWallTileSprite
		const leftWallTileSprite = this.add.tileSprite(0, 0, 16, 176, "tilesets", 232);
		leftWallTileSprite.setOrigin(0, 0);
		levelLayer.add(leftWallTileSprite);

		// groundLayer
		editabletilemap.createLayer("groundLayer", ["tilesets"], 0, 144);

		// playerLayer
		const playerLayer = this.add.layer();

		// player
		const player = this.physics.add.sprite(120, 136, "player-idle", 0);
		player.body.checkCollision.up = false;
		player.body.setOffset(35, 20);
		player.body.setSize(11, 44, false);
		playerLayer.add(player);

		// platformGroupPrefab
		const platformGroupPrefab = new PlatformGroupPrefab(this);
		this.add.existing(platformGroupPrefab);

		// lists
		const levelTileSprites = [leftWallTileSprite, rightWallTileSprite, foregroundTileSprite, backgroundTileSprite];
		const walls = [leftWallTileSprite, rightWallTileSprite];
		const movingLevelTileSprites = [leftWallTileSprite, rightWallTileSprite, foregroundTileSprite];

		// playerWithPlatformsCollider
		this.physics.add.collider(player, platformGroupPrefab.group);

		// playerWithWallsCollider
		this.physics.add.collider(player, walls);

		this.player = player;
		this.platformGroupPrefab = platformGroupPrefab;
		this.editabletilemap = editabletilemap;
		this.leftKeyboardKey = leftKeyboardKey;
		this.rightKeyboardKey = rightKeyboardKey;
		this.levelTileSprites = levelTileSprites;
		this.walls = walls;
		this.movingLevelTileSprites = movingLevelTileSprites;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Physics.Arcade.Sprite} */
	player;
	/** @type {PlatformGroupPrefab} */
	platformGroupPrefab;
	/** @type {Phaser.Tilemaps.Tilemap} */
	editabletilemap;
	/** @type {Phaser.Input.Keyboard.Key} */
	leftKeyboardKey;
	/** @type {Phaser.Input.Keyboard.Key} */
	rightKeyboardKey;
	/** @type {Phaser.GameObjects.TileSprite[]} */
	levelTileSprites;
	/** @type {Phaser.GameObjects.TileSprite[]} */
	walls;
	/** @type {Phaser.GameObjects.TileSprite[]} */
	movingLevelTileSprites;

	/* START-USER-CODE */

	// Write more your code here
	/** @type {boolean} */
	levelStarted = false;
	/** @type {boolean} */
	firstJumpMade = false;
	/** @type {number} */
	maxHeight = 0;
	/** @type {number} */
	startMaxHeight = 0;
	/** @type {number} */
	currentScore = 0;

	create() {
		this.editorCreate();

		this.levelTileSprites.forEach((tileSprite) => {
			tileSprite.setScrollFactor(0);
		});
		this.walls.forEach((tileSprite) => {
			this.physics.world.enable(tileSprite);
			tileSprite.body.setImmovable(true).setAllowGravity(false);
		});

		this.player.body.updateFromGameObject();
		this.player.body.enable = false;
		this.time.delayedCall(500, () => {
			// enable player physics after game starts
			this.player.body.enable = true;
			this.player.body.velocity.y = -500;

			this.time.delayedCall(1000, () => {
				this.cameras.main.fadeOut(500,0,0,0);
				this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
					this.player.body.velocity.y = 0;
					this.player.play("playerSpin");
					this.cameras.main.startFollow(this.player, false, 0.1, 1, 0.1);
					this.cameras.main.setDeadzone(this.scale.width);
					this.cameras.main.fadeIn(500,0,0,0);
					this.levelStarted = true;
					this.scene.launch("UI");
				});
			});
		});
	}

	update() {
		if (!this.levelStarted) {
			return;
		}

		const distance = Math.floor(Math.abs(this.player.body.bottom));
		const isTouchingDown = this.player.body.touching.down;
		if (isTouchingDown) {
			this.player.play("playerJump");
			this.player.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "playerJump", () => {
				this.player.play("playerSpin");
			});
			this.player.setVelocityY(-350);
			if (!this.firstJumpMade) {
				this.firstJumpMade = true;
				this.startMaxHeight = distance;
			}
		}

		if (this.leftKeyboardKey.isDown && !isTouchingDown && this.firstJumpMade) {
			this.player.setVelocityX(-150);
			this.player.setFlipX(true);
		} else if (this.rightKeyboardKey.isDown && !isTouchingDown && this.firstJumpMade) {
			this.player.setVelocityX(150);
			this.player.setFlipX(false);
		} else {
			this.player.setVelocityX(0);
		}

		this.movingLevelTileSprites.forEach((tileSprite) => {
			tileSprite.tilePositionY = this.player.y * 0.2;
		});
		this.walls.forEach((tileSprite) => {
			tileSprite.body.setOffset(0, this.cameras.main.worldView.y);
		});

		if (!this.firstJumpMade) {
			return;
		}
		this.platformGroupPrefab.update();
		if (distance > this.maxHeight) {
			this.maxHeight = distance;
			this.currentScore = Math.floor((this.maxHeight - this.startMaxHeight)/10);
			this.scene.get("UI").updateScoreText(this.currentScore);
		}

		// handle game over
		if (this.player.y > this.platformGroupPrefab.bottomMostPlatformYPosition + 50) {
			console.log('game over');
			this.scene.stop();
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
