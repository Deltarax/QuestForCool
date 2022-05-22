class Maze extends Phaser.Scene {
    constructor() {
        super("mazeScene");
    }

    create() {
        console.log("we in maze mode");

        //flags for simple sprite animation
        this.mouthTicks = 0;
        this.mouthOpen = true;

        // text configuration
        this.add.text(50, 25, "Use Arrow keys to move!     Don't touch the walls!", smallConfig);
        // this.add.text(50, 75, "Don't touch the walls!", smallConfig);

        // adds Main charecter sprites
        this.mazeHead = this.physics.add.sprite(25, 320, 'mazeHead').setOrigin(0.5, 0.5).setScale(0.25);
        this.mazeHead.body.setCircle(55).setOffset(10,10);
        this.mazeHead.setCollideWorldBounds(true);

        // create arrowkeys
        this.arrowkeys = this.input.keyboard.createCursorKeys();

        // Create the corn maze block group
        this.cornMaze = this.add.group();

        // Matrix for maze layout (1 = wall, 0 = path)
        this.mazeMatrix = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
            [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
            [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        
        // Loop to place maze blocks
        for (let i = 0; i < this.mazeMatrix.length; i++){
            for (let j = 0; j < this.mazeMatrix[i].length; j++){
                if (this.mazeMatrix[i][j] == 1){
                    // this.add.rectangle(70 + (j * 40), 120 + (i * 40), 40, 40, 0x005500);
                    let corn = this.physics.add.sprite(20 + (j * 40), 120 + (i * 40), 'corn');
                    this.cornMaze.add(corn);
                }
            }
        }


        // Create the green arrow, link it to next scene, and hide it before it's needed.
        this.nextArrow = this.add.sprite(50, 500, 'arrow').setAlpha(0).setScale(2);
        this.nextArrow.setInteractive({
            useHandCursor: true,
        });
        // click on a Game Object
        this.input.on('gameobjectdown', (pointer, gameObject, event) => {
            cutsceneState = 'end';
            this.scene.start('cutScene');
        });


    }

    update() {

        this.physics.world.collide(this.mazeHead, this.cornMaze, this.cornCollision, null, this);

        if (this.arrowkeys.up.isDown) {
            this.mazeHead.y--;
            this.mazeHead.y--;
        } else if (this.arrowkeys.down.isDown) {
            this.mazeHead.y++;
            this.mazeHead.y++;
        } else if (this.arrowkeys.left.isDown) {
            this.mazeHead.x--;
            this.mazeHead.x--;
        } else if (this.arrowkeys.right.isDown) {
            this.mazeHead.x++;
            this.mazeHead.x++;
        }
        
    }

    cornCollision() {
        console.log('hit');
        this.mazeHead.x = 25;
        this.mazeHead.y = 320;

    }

}