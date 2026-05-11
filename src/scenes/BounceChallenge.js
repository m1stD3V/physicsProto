import * as Phaser from 'phaser';

export class BounceChallenge extends Phaser.Scene {
    constructor() {
        super('BounceChallenge');
    }

    create() {
        this.add.text(16, 16, 'Challenge 3: Bounce', { fontSize: '24px', fill: '#fff' });
        this.add.text(16, 45, 'Click to place bouncers to guide the ball!', { fontSize: '16px', fill: '#ccc' });

        // Ball setup
        this.ballVisual = this.add.circle(400, 50, 15, 0xffffff);
        this.ball = this.matter.add.gameObject(this.ballVisual, {
            shape: 'circle',
            radius: 15,
            restitution: 0.8,
            friction: 0,
            label: 'ball'
        });

        // Layout setup
        this.add.rectangle(100, 300, 20, 600, 0x666666);
        this.matter.add.rectangle(100, 300, 20, 600, { isStatic: true });

        this.add.rectangle(700, 300, 20, 600, 0x666666);
        this.matter.add.rectangle(700, 300, 20, 600, { isStatic: true });
        
        // Obstacles setup
        this.add.circle(300, 200, 30, 0xff0000);
        this.matter.add.circle(300, 200, 30, { isStatic: true });

        this.add.circle(500, 400, 30, 0xff0000);
        this.matter.add.circle(500, 400, 30, { isStatic: true });

        // Target setup
        this.target = this.matter.add.rectangle(650, 550, 80, 40, { 
            isStatic: true, 
            isSensor: true,
            label: 'target'
        });
        this.add.rectangle(650, 550, 80, 40, 0x00ff00);

        // Bouncer placement
        this.input.on('pointerdown', (pointer) => {
            const bouncer = this.matter.add.circle(pointer.x, pointer.y, 25, {
                isStatic: true,
                restitution: 1.5, // High restitution
                label: 'bouncer'
            });

            const visual = this.add.circle(pointer.x, pointer.y, 25, 0xff00ff);
            
            // Bouncer expiration
            this.time.delayedCall(2000, () => {
                if (bouncer.world) {
                    this.matter.world.remove(bouncer);
                    visual.destroy();
                }
            });

            // Bouncer collision handling
            this.matter.world.on('collisionstart', (event) => {
                event.pairs.forEach(pair => {
                    if ((pair.bodyA === bouncer && pair.bodyB.label === 'ball') ||
                        (pair.bodyB === bouncer && pair.bodyA.label === 'ball')) {
                        
                        this.tweens.add({
                            targets: visual,
                            scale: 1.5,
                            alpha: 0,
                            duration: 200,
                            onComplete: () => {
                                this.matter.world.remove(bouncer);
                                visual.destroy();
                            }
                        });
                    }
                });
            });
        });

        // Target collision handling
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
        if (this.ball.y > 600) {
            this.ball.setPosition(400, 50);
            this.ball.setVelocity(0, 0);
        }
    }

    completeChallenge() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.scene.start('Summary', { 
            nextScene: 'Credits', 
            title: 'All Challenges Complete!',
            text: 'You are a physics master!' 
        });
    }
}
