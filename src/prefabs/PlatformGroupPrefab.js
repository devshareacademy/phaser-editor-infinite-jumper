
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import PlatformPrefab from "./PlatformPrefab.js";
/* END-USER-IMPORTS */

export default class PlatformGroupPrefab extends Phaser.GameObjects.Layer {

	constructor(scene) {
		super(scene);

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.group = scene.add.group({
			classType: PlatformPrefab
		});

		// create initial platform for the start of the game
		this.group.get(90, -200);

		// create next set of platforms
		for (let i = 1; i < 5; i += 1) {
			const x = Phaser.Math.Between(10, 200);
			const y = -150 * i + -200;

			this.group.get(x, y);
		}
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.
	/** @type {Phaser.GameObjects.Group} */
	group;
	/** @type {number} */
	bottomMostPlatformYPosition = 0;

	update() {
		const scrollY = this.scene.cameras.main.scrollY;
		const maxDist = this.scene.scale.height * 3;
		const children = this.group.getChildren();
		this.bottomMostPlatformYPosition = children[0].y;
		children.forEach((child) => {
			if (child.y >= scrollY + maxDist) {
				child.x = Phaser.Math.Between(10, 200);
				child.y = scrollY - Phaser.Math.Between(10, 40);
			}
			if (child.y > this.bottomMostPlatformYPosition) {
				this.bottomMostPlatformYPosition = child.y;
			}
		});
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here