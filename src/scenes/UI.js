
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class UI extends Phaser.Scene {

	constructor() {
		super("UI");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// scoreTextGameObject
		const scoreTextGameObject = this.add.text(235, 5, "", {});
		scoreTextGameObject.setOrigin(1, 0);
		scoreTextGameObject.text = "0";
		scoreTextGameObject.setStyle({ "fontFamily": "PressStart2P-Regular" });

		this.scoreTextGameObject = scoreTextGameObject;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	scoreTextGameObject;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	updateScoreText(text) {
		this.scoreTextGameObject.setText(text);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
