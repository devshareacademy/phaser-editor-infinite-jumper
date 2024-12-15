
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class BackgroundPrefab extends Phaser.GameObjects.TileSprite {

	constructor(scene, x, y, width, height, texture, frame) {
		super(scene, x ?? 0, y ?? 0, width ?? 240, height ?? 176, texture || "background", frame);

		this.setOrigin(0, 0);

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.setScrollFactor(0);
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
