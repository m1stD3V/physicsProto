import * as Phaser from 'phaser';

export class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        this.add.text(400, 200, 'Physics Indirectly', { fontSize: '48px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(400, 300, 'Guide the ball to the target by interacting with the environment.', { fontSize: '18px', fill: '#ccc' }).setOrigin(0.5);
        
        const startButton = this.add.text(400, 450, 'START GAME', { fontSize: '32px', fill: '#0f0' })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        startButton.on('pointerdown', () => {
            this.scene.start('JumpChallenge');
        });

        // Start button animation
        this.tweens.add({
            targets: startButton,
            scale: 1.1,
            duration: 800,
            yoyo: true,
            repeat: -1
        });
    }
}
