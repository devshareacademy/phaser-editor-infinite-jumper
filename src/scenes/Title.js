
// You can write more code here

/* START OF COMPILED CODE */

import BackgroundPrefab from "../prefabs/BackgroundPrefab.js";
import ForegroundPrefab from "../prefabs/ForegroundPrefab.js";
import WallPrefab from "../prefabs/WallPrefab.js";
import PlayerPrefab from "../prefabs/PlayerPrefab.js";
import OnAwakeActionScript from "../scriptnodes/utils/OnAwakeActionScript.js";
import FadeEffectCameraActionScript from "../scriptnodes/camera/FadeEffectCameraActionScript.js";
import TweenActionScript from "../scriptnodes/animation/TweenActionScript.js";
import SceneOnPointerDownActionScript from "../scriptnodes/scene/SceneOnPointerDownActionScript.js";
import CallbackActionScript from "../scriptnodes/utils/CallbackActionScript.js";
import TimeEventActionScript from "../scriptnodes/timer/TimeEventActionScript.js";
import StartSceneActionScript from "../scriptnodes/scene/StartSceneActionScript.js";
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

		// backgroundLayer
		const backgroundLayer = this.add.layer();

		// backgroundPrefab
		const backgroundPrefab = new BackgroundPrefab(this, 0, 0);
		backgroundLayer.add(backgroundPrefab);

		// foregroundPrefab
		const foregroundPrefab = new ForegroundPrefab(this, 0, 0);
		backgroundLayer.add(foregroundPrefab);

		// leftWall
		const leftWall = new WallPrefab(this, 0, 0);
		backgroundLayer.add(leftWall);

		// rightWall
		const rightWall = new WallPrefab(this, 208, 0);
		rightWall.flipX = true;
		rightWall.flipY = false;
		rightWall.tilePositionX = 0;
		rightWall.tilePositionY = -120;
		backgroundLayer.add(rightWall);

		// ground
		const ground = this.add.image(0, 144, "ground");
		ground.setOrigin(0, 0);
		backgroundLayer.add(ground);

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

		// onAwakeActionScript
		const onAwakeActionScript = new OnAwakeActionScript(this);

		// fadeEffectCameraActionScript
		const fadeEffectCameraActionScript = new FadeEffectCameraActionScript(onAwakeActionScript);

		// tweenActionScriptForPlayText
		const tweenActionScriptForPlayText = new TweenActionScript(onAwakeActionScript);

		// sceneOnPointerDownActionScript
		const sceneOnPointerDownActionScript = new SceneOnPointerDownActionScript(onAwakeActionScript);

		// callbackActionScript
		const callbackActionScript = new CallbackActionScript(sceneOnPointerDownActionScript);

		// timeEventActionScriptForSceneTransition
		const timeEventActionScriptForSceneTransition = new TimeEventActionScript(this);

		// fadeEffectCameraActionScript_1
		const fadeEffectCameraActionScript_1 = new FadeEffectCameraActionScript(timeEventActionScriptForSceneTransition);

		// startSceneActionScript
		const startSceneActionScript = new StartSceneActionScript(fadeEffectCameraActionScript_1);

		// fadeEffectCameraActionScript (prefab fields)
		fadeEffectCameraActionScript.duration = 500;

		// tweenActionScriptForPlayText (prefab fields)
		tweenActionScriptForPlayText.target = clickToPlayTextGameObject;
		tweenActionScriptForPlayText.duration = 1200;
		tweenActionScriptForPlayText.yoyo = true;
		tweenActionScriptForPlayText.repeat = -1;
		tweenActionScriptForPlayText.delay = 500;
		tweenActionScriptForPlayText.loopDelay = 500;
		tweenActionScriptForPlayText.tweenProperty = "alpha";
		tweenActionScriptForPlayText.tweenPropertyValue = 0.2;

		// callbackActionScript (prefab fields)
		callbackActionScript.callback = () => { this.startGame(); };

		// timeEventActionScriptForSceneTransition (prefab fields)
		timeEventActionScriptForSceneTransition.delay = 1000;

		// fadeEffectCameraActionScript_1 (prefab fields)
		fadeEffectCameraActionScript_1.duration = 500;
		fadeEffectCameraActionScript_1.fadeEvent = "camerafadeoutcomplete";

		// startSceneActionScript (prefab fields)
		startSceneActionScript.sceneKey = "Level";

		this.player = player;
		this.clickToPlayTextGameObject = clickToPlayTextGameObject;
		this.tweenActionScriptForPlayText = tweenActionScriptForPlayText;
		this.timeEventActionScriptForSceneTransition = timeEventActionScriptForSceneTransition;

		this.events.emit("scene-awake");
	}

	/** @type {PlayerPrefab} */
	player;
	/** @type {Phaser.GameObjects.Text} */
	clickToPlayTextGameObject;
	/** @type {TweenActionScript} */
	tweenActionScriptForPlayText;
	/** @type {TimeEventActionScript} */
	timeEventActionScriptForSceneTransition;

	/* START-USER-CODE */

	// Write your code here
	/** @type {Phaser.Tweens.Tween} */
	glowTween;

	create() {
		this.editorCreate();
		this.player.body.enable = false;
		const glowFx = this.player.postFX.addGlow(0x00ffff, 1, 0, false, 0.1, 5);
		this.glowTween = this.tweens.add({
			targets: glowFx,
			outerStrength: 4,
			duration: 800,
			yoyo: true,
			repeat: -1
		});
	}

	startGame() {
		this.player.stop();
		this.player.setFrame("player-duck.png");
		this.time.delayedCall(1000, () => {
			this.player.play("playerIdle");
			this.glowTween.destroy();
			this.player.postFX.clear();

			// enable player physics after game starts
			this.player.body.enable = true;
			this.player.body.velocity.y = -1000;

			// trigger next scene
			this.timeEventActionScriptForSceneTransition.execute();
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
