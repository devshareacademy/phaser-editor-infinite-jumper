
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../../../phaserjs_editor_scripts_base/ScriptNode.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class TweenActionScript extends ScriptNode {

	constructor(parent) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.GameObject} */
	target;
	/** @type {number} */
	duration = 0;
	/** @type {boolean} */
	yoyo = false;
	/** @type {number} */
	repeat = 0;
	/** @type {number} */
	delay = 0;
	/** @type {number} */
	loopDelay = 0;
	/** @type {string} */
	tweenProperty = "";
	/** @type {any} */
	tweenPropertyValue;

	/* START-USER-CODE */
	/** @type {Phaser.Tweens.Tween} */
	tween;

	// Write your code here.
	execute(...args) {
		/** @type {Phaser.Scene} */
		const _scene = this.scene;

		this.tween = _scene.tweens.add({
			targets: this.target,
			duration: this.duration,
			yoyo: this.yoyo,
			repeat: this.repeat,
			delay: this.delay,
			loopDelay: this.loopDelay,
			[this.tweenProperty]: this.tweenPropertyValue,
			onComplete: () => {
				this.executeChildren(args);
			}
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
