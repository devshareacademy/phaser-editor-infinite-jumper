
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PlatformPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		this.scaleX = 0.75;
		this.scaleY = 0.5;

		// image_1
		const image_1 = scene.add.image(0, 0, "tilesets", 26);
		this.add(image_1);

		// image_2
		const image_2 = scene.add.image(16, 0, "tilesets", 27);
		this.add(image_2);

		// image
		const image = scene.add.image(32, 0, "tilesets", 28);
		this.add(image);

		// image_3
		const image_3 = scene.add.image(48, 0, "tilesets", 29);
		this.add(image_3);

		// image_4
		const image_4 = scene.add.image(64, 0, "tilesets", 30);
		this.add(image_4);

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.setSize(80, 12);
		/** @type {Phaser.Scene} */
		const _scene = scene;
		_scene.physics.world.enable(this);
		this.body.setImmovable(true).setAllowGravity(false).setOffset(32, 0);
		this.body.checkCollision.down = false;
		this.body.checkCollision.left = false;
		this.body.checkCollision.right = false;
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
