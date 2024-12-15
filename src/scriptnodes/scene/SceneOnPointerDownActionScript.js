
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../../../phaserjs_editor_scripts_base/ScriptNode.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class SceneOnPointerDownActionScript extends ScriptNode {

	constructor(parent) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {boolean} */
	once = false;

	/* START-USER-CODE */

	// Write your code here.
	execute(...args) {
		/** @type {Phaser.Scene} */
		const _scene = this.scene;

		const eventName = Phaser.Input.Events.POINTER_DOWN;
		if (this.once) {
      _scene.input.once(eventName, () => {
        this.executeChildren();
      });
			return;
		}

    _scene.input.on(eventName, () => {
      this.executeChildren();
    });
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
