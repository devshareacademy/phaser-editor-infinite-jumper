
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "../../phaserjs_editor_scripts_base/UserComponent.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class HorizontalMove extends UserComponent {

	constructor(gameObject) {
		super(gameObject);

		this.gameObject = gameObject;
		gameObject["__HorizontalMove"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {HorizontalMove} */
	static getComponent(gameObject) {
		return gameObject["__HorizontalMove"];
	}

	/** @type {Phaser.Physics.Arcade.Image} */
	gameObject;
	/** @type {number} */
	horizontalVelocity = 0;
	/** @type {number} */
	minXPosition = 0;
	/** @type {number} */
	maxXPosition = 0;
	/** @type {boolean} */
	active = false;

	/* START-USER-CODE */

	// Write your code here.
	start() {
		if (!this.active) {
			return;
		}
		this.gameObject.body.velocity.x = this.horizontalVelocity;
	}

	update() {
		if (!this.active) {
			return;
		}

		const velocity = this.gameObject.body.velocity;
		if (this.gameObject.x < this.minXPosition) {
			velocity.x = Math.abs(this.horizontalVelocity);
		} else if (this.gameObject.x > this.maxXPosition) {
			velocity.x = -Math.abs(this.horizontalVelocity);
		}
	}

	enable() {
		this.active = true;
		this.gameObject.body.velocity.x = this.horizontalVelocity;
	}

	disable() {
		this.active = false;
		this.gameObject.body.velocity.x = 0;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
