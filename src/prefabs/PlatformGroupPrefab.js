
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
		this.group.get(90, 0);

		// create next set of platforms
		for (let i = 1; i < 5; i += 1) {
			const x = Phaser.Math.Between(10, 200);
			const y = -150 * i;

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

		const childrenToMove = [];
		children.forEach((child) => {
			if (child.y >= scrollY + maxDist) {
				childrenToMove.push(child);
			}
			if (child.y > this.bottomMostPlatformYPosition) {
				this.bottomMostPlatformYPosition = child.y;
			}
		});

		let childrenToMoveYOffset = 0;
		childrenToMove.forEach((child, index) => {
			child.x = Phaser.Math.Between(10, 200);
			childrenToMoveYOffset += Phaser.Math.Between(10, 40);
			child.y = scrollY - childrenToMoveYOffset;
		});
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
