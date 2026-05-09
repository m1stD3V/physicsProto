import * as Phaser from 'phaser';

export class JumpChallenge extends Phaser.Scene {
    constructor() {
        super('JumpChallenge');
    }

    create() {
        this.add.text(16, 16, 'Challenge 1: Jump', { fontSize: '24px', fill: '#fff' });
        this.add.text(16, 45, 'Click below the ball to make it jump!', { fontSize: '16px', fill: '#ccc' });

        // Ball setup
        this.ballVisual = this.add.circle(100, 500, 20, 0xffffff);
        this.ball = this.matter.add.gameObject(this.ballVisual, {
            shape: 'circle',
            radius: 20,
            friction: 0.005,
            restitution: 0.5,
            label: 'ball'
        });

        // Floor setup
        this.add.rectangle(400, 580, 800, 40, 0x666666);
        this.matter.add.rectangle(400, 580, 800, 40, { isStatic: true });

        // Obstacles setup
        this.add.rectangle(300, 500, 40, 150, 0xff0000);
        this.matter.add.rectangle(300, 500, 40, 150, { isStatic: true });

        this.add.rectangle(500, 450, 40, 250, 0xff0000);
        this.matter.add.rectangle(500, 450, 40, 250, { isStatic: true });

        // Target setup
        this.target = this.matter.add.rectangle(750, 540, 60, 40, { 
            isStatic: true, 
            isSensor: true,
            label: 'target'
        });
        this.add.rectangle(750, 540, 60, 40, 0x00ff00);

        // Click input handling
        this.input.on('pointerdown', (pointer) => {
            const distance = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.ball.x, this.ball.y);
            if (distance < 100) {
                // Upward force application
                const force = 0.05;
                const angle = Phaser.Math.Angle.Between(pointer.x, pointer.y, this.ball.x, this.ball.y);
                this.matter.applyForce(this.ball.body, {
                    x: Math.cos(angle) * force,
                    y: Math.sin(angle) * force
                });
                
                // Input feedback
                const circle = this.add.circle(pointer.x, pointer.y, 10, 0xff0000);
                this.tweens.add({
                    targets: circle,
                    scale: 3,
                    alpha: 0,
                    duration: 300,
                    onComplete: () => circle.destroy()
                });
            }
        });

        // Collision handling
        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach(pair => {
                if ((pair.bodyA.label === 'ball' && pair.bodyB.label === 'target') ||
                    (pair.bodyB.label === 'ball' && pair.bodyA.label === 'target')) {
                    this.completeChallenge();
                }
            });
        });
    }

    completeChallenge() {
        this.scene.start('Summary', { 
            nextScene: 'AccelerationChallenge', 
            title: 'Challenge 1 Complete!',
            text: 'You mastered the jump!' 
        });
    }

    update() {
        // Boundary check and reset
        if (this.ball.y > 600 || this.ball.x < 0) {
            this.scene.restart();
        }
    }
}
