import * as Phaser from 'phaser';

export class AccelerationChallenge extends Phaser.Scene {
    constructor() {
        super('AccelerationChallenge');
    }

    create() {
        this.add.text(16, 16, 'Challenge 2: Acceleration', { fontSize: '24px', fill: '#fff' });
        this.add.text(16, 45, 'Hold near the ball to pull it towards your pointer!', { fontSize: '16px', fill: '#ccc' });

        // Ball setup
        this.ballVisual = this.add.circle(100, 300, 20, 0xffffff);
        this.ball = this.matter.add.gameObject(this.ballVisual, {
            shape: 'circle',
            radius: 20,
            frictionAir: 0.05,
            label: 'ball'
        });

        // Boundaries setup
        this.add.rectangle(400, 50, 800, 40, 0x666666);
        this.matter.add.rectangle(400, 50, 800, 40, { isStatic: true });

        this.add.rectangle(400, 550, 800, 40, 0x666666);
        this.matter.add.rectangle(400, 550, 800, 40, { isStatic: true });

        this.add.rectangle(50, 300, 40, 600, 0x666666);
        this.matter.add.rectangle(50, 300, 40, 600, { isStatic: true });
        
        // Obstacles setup
        this.add.rectangle(300, 200, 40, 300, 0xff0000);
        this.matter.add.rectangle(300, 200, 40, 300, { isStatic: true });

        this.add.rectangle(500, 400, 40, 300, 0xff0000);
        this.matter.add.rectangle(500, 400, 40, 300, { isStatic: true });

        // Target setup
        this.target = this.matter.add.rectangle(700, 300, 60, 60, { 
            isStatic: true, 
            isSensor: true,
            label: 'target'
        });
        this.add.rectangle(700, 300, 60, 60, 0x00ff00);

        // Magnet visual
        this.magnetVisual = this.add.circle(0, 0, 30, 0x00ffff, 0.3);
        this.magnetVisual.setVisible(false);
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

    update() {
        const pointer = this.input.activePointer;
        
        if (pointer.isDown) {
            this.magnetVisual.setPosition(pointer.x, pointer.y);
            this.magnetVisual.setVisible(true);

            const distance = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.ball.x, this.ball.y);
            
            if (distance < 200) {
                // Continuous force application
                const forceMagnitude = 0.002;
                const angle = Phaser.Math.Angle.Between(this.ball.x, this.ball.y, pointer.x, pointer.y);
                
                this.matter.applyForce(this.ball.body, {
                    x: Math.cos(angle) * forceMagnitude,
                    y: Math.sin(angle) * forceMagnitude
                });
            }
        } else {
            this.magnetVisual.setVisible(false);
        }
    }

    completeChallenge() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.scene.start('Summary', { 
            nextScene: 'BounceChallenge', 
            title: 'Challenge 2 Complete!',
            text: 'Great control!' 
        });
    }
}
