
// You can write more code here

/* START OF COMPILED CODE */

import BackgroundPrefab from "../prefabs/BackgroundPrefab.js";
import ForegroundPrefab from "../prefabs/ForegroundPrefab.js";
import RightWallPrefab from "../prefabs/RightWallPrefab.js";
import LeftWallPrefab from "../prefabs/LeftWallPrefab.js";
import PlayerPrefab from "../prefabs/PlayerPrefab.js";
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

		// leftKeyboardKey
		const leftKeyboardKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

		// rightKeyboardKey
		const rightKeyboardKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

		// levelLayer
		const levelLayer = this.add.layer();

		// backgroundTileSprite
		const backgroundTileSprite = new BackgroundPrefab(this, 0, 0);
		levelLayer.add(backgroundTileSprite);

		// foregroundTileSprite
		const foregroundTileSprite = new ForegroundPrefab(this, 0, 0);
		levelLayer.add(foregroundTileSprite);

		// rightWallTileSprite
		const rightWallTileSprite = new RightWallPrefab(this, 224, 0);
		levelLayer.add(rightWallTileSprite);

		// leftWallTileSprite
		const leftWallTileSprite = new LeftWallPrefab(this, 0, 0);
		levelLayer.add(leftWallTileSprite);

		// playerLayer
		const playerLayer = this.add.layer();

		// player
		const player = new PlayerPrefab(this, 120, -84);
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
		this.leftKeyboardKey = leftKeyboardKey;
		this.rightKeyboardKey = rightKeyboardKey;
		this.levelTileSprites = levelTileSprites;
		this.walls = walls;
		this.movingLevelTileSprites = movingLevelTileSprites;

		this.events.emit("scene-awake");
	}

	/** @type {PlayerPrefab} */
	player;
	/** @type {PlatformGroupPrefab} */
	platformGroupPrefab;
	/** @type {Phaser.Input.Keyboard.Key} */
	leftKeyboardKey;
	/** @type {Phaser.Input.Keyboard.Key} */
	rightKeyboardKey;
	/** @type {Array<LeftWallPrefab|RightWallPrefab|ForegroundPrefab|BackgroundPrefab>} */
	levelTileSprites;
	/** @type {Array<LeftWallPrefab|RightWallPrefab>} */
	walls;
	/** @type {Array<LeftWallPrefab|RightWallPrefab|ForegroundPrefab>} */
	movingLevelTileSprites;

	/* START-USER-CODE */

	// Write more your code here
	/** @type {boolean} */
	isGameOver = false;
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

		this.isGameOver = false;
		this.firstJumpMade = false;
		this.currentScore = 0;
		this.startMaxHeight = 0;
		this.maxHeight = 0;
		this.scene.launch("UI");
		this.player.play("playerSpin");
		this.player.body.enable = true;
		this.cameras.main.fadeIn(500, 0, 0, 0);
		this.cameras.main.startFollow(this.player, false, 0.1, 1, 0.1);
		this.cameras.main.setDeadzone(this.scale.width);
	}

	update() {
		const distance = Math.floor(Math.abs(this.player.body.bottom));
		const isTouchingDown = this.player.body.touching.down;
		if (isTouchingDown) {
			this.player.play("playerJump");
			this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "playerJump", () => {
				this.player.play("playerSpin");
			});
			this.player.setVelocityY(-350);
			if (!this.firstJumpMade) {
				this.firstJumpMade = true;
				this.startMaxHeight = distance;
			}
		}

		if (this.leftKeyboardKey.isDown && !isTouchingDown && this.firstJumpMade && !this.isGameOver) {
			this.player.setVelocityX(-150);
			this.player.setFlipX(true);
		} else if (this.rightKeyboardKey.isDown && !isTouchingDown && this.firstJumpMade && !this.isGameOver) {
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
		if (this.isGameOver) {
			this.player.setVelocityY(15);
			return;
		}

		if (this.player.y > this.platformGroupPrefab.bottomMostPlatformYPosition + 50) {
			this.isGameOver = true;
			this.player.setVelocityY(15);
			this.player.play("playerHurt");
			const wipeFx = this.player.postFX.addWipe(0.1, 0, 1);
			this.tweens.add({
				targets: wipeFx,
				progress: 1,
				duration: 3000,
				onComplete: () => {
					this.player.body.enable = false;
					this.cameras.main.fadeOut(500, 0, 0, 0);
					this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
						this.scene.stop("UI");
						this.scene.start("GameOver", { score: this.currentScore });
					});
				},
			});
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
