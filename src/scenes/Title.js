
// You can write more code here

/* START OF COMPILED CODE */

import BackgroundPrefab from "./BackgroundPrefab.js";
import ForegroundPrefab from "./ForegroundPrefab.js";
import RightWallPrefab from "./RightWallPrefab.js";
import LeftWallPrefab from "../prefabs/LeftWallPrefab.js";
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

		// rightWallPrefab
		const rightWallPrefab = new RightWallPrefab(this, 224, 0);
		backgroundLayer.add(rightWallPrefab);

		// leftWallPrefab
		const leftWallPrefab = new LeftWallPrefab(this, 0, 0);
		backgroundLayer.add(leftWallPrefab);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
