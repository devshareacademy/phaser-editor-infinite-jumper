
// You can write more code here

/* START OF COMPILED CODE */

import BackgroundPrefab from "../prefabs/BackgroundPrefab.js";
import ForegroundPrefab from "../prefabs/ForegroundPrefab.js";
import WallPrefab from "../prefabs/WallPrefab.js";
import PlayerPrefab from "../prefabs/PlayerPrefab.js";
import PlatformGroupPrefab from "../prefabs/PlatformGroupPrefab.js";
import TimeEventActionScript from "../scriptnodes/timer/TimeEventActionScript.js";
import FadeEffectCameraActionScript from "../scriptnodes/camera/FadeEffectCameraActionScript.js";
import StartSceneActionScript from "../scriptnodes/scene/StartSceneActionScript.js";
import StopSceneActionScript from "../scriptnodes/scene/StopSceneActionScript.js";
import OnAwakeActionScript from "../scriptnodes/utils/OnAwakeActionScript.js";
import LaunchSceneActionScript from "../scriptnodes/scene/LaunchSceneActionScript.js";
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
		const rightWallTileSprite = new WallPrefab(this, 208, 0);
		rightWallTileSprite.flipX = true;
		rightWallTileSprite.flipY = false;
		levelLayer.add(rightWallTileSprite);

		// leftWallTileSprite
		const leftWallTileSprite = new WallPrefab(this, 0, 0);
		levelLayer.add(leftWallTileSprite);

		// playerLayer
		const playerLayer = this.add.layer();

		// player
		const player = new PlayerPrefab(this, 120, -84);
		playerLayer.add(player);

		// platformGroupPrefab
		const platformGroupPrefab = new PlatformGroupPrefab(this);
		this.add.existing(platformGroupPrefab);

		// timeEventActionScriptForSceneTransition
		const timeEventActionScriptForSceneTransition = new TimeEventActionScript(this);

		// fadeEffectCameraActionScript_1
		const fadeEffectCameraActionScript_1 = new FadeEffectCameraActionScript(timeEventActionScriptForSceneTransition);

		// startSceneActionScript
		const startSceneActionScript = new StartSceneActionScript(fadeEffectCameraActionScript_1);

		// stopSceneActionScript
		const stopSceneActionScript = new StopSceneActionScript(fadeEffectCameraActionScript_1);

		// onAwakeActionScript
		const onAwakeActionScript = new OnAwakeActionScript(this);

		// launchSceneActionScript
		const launchSceneActionScript = new LaunchSceneActionScript(onAwakeActionScript);

		// lists
		const levelTileSprites = [leftWallTileSprite, rightWallTileSprite, foregroundTileSprite, backgroundTileSprite];
		const walls = [leftWallTileSprite, rightWallTileSprite];
		const movingLevelTileSprites = [leftWallTileSprite, rightWallTileSprite, foregroundTileSprite];

		// playerWithPlatformsCollider
		this.physics.add.collider(player, platformGroupPrefab.group);

		// playerWithWallsCollider
		this.physics.add.collider(player, walls);

		// rightWallTileSprite (prefab fields)
		rightWallTileSprite.tileOffsetY = -120;

		// timeEventActionScriptForSceneTransition (prefab fields)
		timeEventActionScriptForSceneTransition.delay = 1000;

		// fadeEffectCameraActionScript_1 (prefab fields)
		fadeEffectCameraActionScript_1.duration = 500;
		fadeEffectCameraActionScript_1.fadeEvent = "camerafadeoutcomplete";

		// startSceneActionScript (prefab fields)
		startSceneActionScript.sceneKey = "GameOver";

		// stopSceneActionScript (prefab fields)
		stopSceneActionScript.sceneKey = "UI";

		// launchSceneActionScript (prefab fields)
		launchSceneActionScript.sceneKey = "UI";

		this.player = player;
		this.platformGroupPrefab = platformGroupPrefab;
		this.timeEventActionScriptForSceneTransition = timeEventActionScriptForSceneTransition;
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
	/** @type {TimeEventActionScript} */
	timeEventActionScriptForSceneTransition;
	/** @type {Phaser.Input.Keyboard.Key} */
	leftKeyboardKey;
	/** @type {Phaser.Input.Keyboard.Key} */
	rightKeyboardKey;
	/** @type {Array<WallPrefab|ForegroundPrefab|BackgroundPrefab>} */
	levelTileSprites;
	/** @type {WallPrefab[]} */
	walls;
	/** @type {Array<WallPrefab|ForegroundPrefab>} */
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
	/** @type {number} */
	level = 0;

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
		this.level = 0;
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
			if (tileSprite.tileOffsetY !== undefined) {
				tileSprite.tilePositionY = this.player.y * 0.2 + tileSprite.tileOffsetY;
			} else {
				tileSprite.tilePositionY = this.player.y * 0.2;
			}
		});
		this.walls.forEach((tileSprite) => {
			if (tileSprite.flipX)  {
				tileSprite.body.setOffset(16, this.cameras.main.worldView.y);
			} else {
				tileSprite.body.setOffset(0, this.cameras.main.worldView.y);
			}
		});

		if (!this.firstJumpMade) {
			return;
		}
		this.platformGroupPrefab.update();
		if (distance > this.maxHeight) {
			this.maxHeight = distance;
			this.currentScore = Math.floor((this.maxHeight - this.startMaxHeight)/10);
			this.scene.get("UI").updateScoreText(this.currentScore);

			if (this.currentScore > 200 && this.level === 0) {
				this.level = 1;
				this.platformGroupPrefab.enableMovingPlatforms = true;
			}
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
					this.registry.set('score', this.currentScore);
					this.timeEventActionScriptForSceneTransition.execute();
				},
			});
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
