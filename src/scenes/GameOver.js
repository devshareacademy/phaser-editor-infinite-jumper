
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class GameOver extends Phaser.Scene {

	constructor() {
		super("GameOver");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// gameOverTextGameObject
		const gameOverTextGameObject = this.add.text(30, 39, "", {});
		gameOverTextGameObject.text = "Game Over";
		gameOverTextGameObject.setStyle({ "fontFamily": "PressStart2P-Regular", "fontSize": "20px" });

		// scoreTextGameObject
		const scoreTextGameObject = this.add.text(95, 97, "", {});
		scoreTextGameObject.text = "Score";
		scoreTextGameObject.setStyle({ "fontFamily": "PressStart2P-Regular", "fontSize": "10px" });

		// scoreValueTextGameObject
		const scoreValueTextGameObject = this.add.text(120, 122, "", {});
		scoreValueTextGameObject.setOrigin(0.5, 0.5);
		scoreValueTextGameObject.text = "0";
		scoreValueTextGameObject.setStyle({ "fontFamily": "PressStart2P-Regular", "fontSize": "10px" });

		this.scoreValueTextGameObject = scoreValueTextGameObject;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	scoreValueTextGameObject;

	/* START-USER-CODE */

	// Write your code here
	scoreData;

	init(data) {
		this.scoreData = data;
	}

	create() {
		this.editorCreate();
		this.scoreValueTextGameObject.setText(this.scoreData.score);
		this.time.delayedCall(3000, () => {
			this.cameras.main.fadeOut(500, 0, 0, 0);
			this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
				this.scene.start("Title");
			});
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
