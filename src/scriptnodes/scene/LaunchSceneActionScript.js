
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../../../phaserjs_editor_scripts_base/ScriptNode.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class LaunchSceneActionScript extends ScriptNode {

	constructor(parent) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {string} */
	sceneKey = "";

	/* START-USER-CODE */

	// Write your code here.
	execute() {
		/** @type {Phaser.Scene} */
		const _scene = this.scene;
		_scene.scene.launch(this.sceneKey);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
