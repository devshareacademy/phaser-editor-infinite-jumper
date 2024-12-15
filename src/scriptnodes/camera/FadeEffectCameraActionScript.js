
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../../../phaserjs_editor_scripts_base/ScriptNode.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class FadeEffectCameraActionScript extends ScriptNode {

	constructor(parent) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {number} */
	duration = 1000;
	/** @type {"camerafadeincomplete"|"camerafadeoutcomplete"} */
	fadeEvent = "camerafadeincomplete";

	/* START-USER-CODE */

	// Write your code here.
	execute() {
		/** @type {Phaser.Scene} */
		const _scene = this.scene;
		const camera = _scene.cameras.main;
		if (this.fadeEvent === "camerafadeincomplete") {
			camera.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
				this.executeChildren();
			})
			camera.fadeIn(this.duration, 0, 0, 0);
			return;
		}
		camera.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
			this.executeChildren();
		})
		camera.fadeOut(this.duration, 0, 0, 0);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
