
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../../../phaserjs_editor_scripts_base/ScriptNode.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class UpdateTextureActionScript extends ScriptNode {

	constructor(parent) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {{key:string,frame?:string|number}} */
	textureConfig;

	/* START-USER-CODE */

	// Write your code here.
	execute() {
		if (this.gameObject === undefined) {
			return;
		}
		if (this.textureConfig === undefined) {
			return;
		}
		this.gameObject.setTexture(this.textureConfig.key);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
