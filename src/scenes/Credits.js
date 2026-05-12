import * as Phaser from 'phaser';

export class Credits extends Phaser.Scene {
    constructor() {
        super('Credits');
    }

    create() {
        this.add.text(400, 100, 'CREDITS', { fontSize: '48px', fill: '#fff' }).setOrigin(0.5);
        
        const credits = [
            'Game Design: m1stD3V',
            'Engine: Phaser 3',
            'Physics: Matter.js',
            'Assets: Procedural Shapes',
            '',
            'Thanks for playing!'
        ];

        credits.forEach((line, index) => {
            this.add.text(400, 200 + (index * 40), line, { fontSize: '24px', fill: '#ccc' }).setOrigin(0.5);
        });

        const menuButton = this.add.text(400, 500, 'BACK TO MENU', { fontSize: '32px', fill: '#0f0' })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        menuButton.on('pointerdown', () => {
            this.scene.start('Menu');
        });

        this.tweens.add({
            targets: menuButton,
            scale: 1.1,
            duration: 800,
            yoyo: true,
            repeat: -1
        });
    }
}
