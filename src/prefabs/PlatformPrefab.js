
// You can write more code here

/* START OF COMPILED CODE */

import HorizontalMove from "../components/HorizontalMove.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PlatformPrefab extends Phaser.Physics.Arcade.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "platform", frame);

		this.scaleX = 0.75;
		this.scaleY = 0.5;
		scene.physics.add.existing(this, false);
		this.body.allowGravity = false;
		this.body.checkCollision.down = false;
		this.body.checkCollision.left = false;
		this.body.checkCollision.right = false;
		this.body.pushable = false;
		this.body.setSize(80, 12, false);

		// this (components)
		const thisHorizontalMove = new HorizontalMove(this);
		thisHorizontalMove.horizontalVelocity = 50;
		thisHorizontalMove.minXPosition = 10;
		thisHorizontalMove.maxXPosition = 200;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
