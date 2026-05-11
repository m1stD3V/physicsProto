import * as Phaser from 'phaser';

export class Summary extends Phaser.Scene {
    constructor() {
        super('Summary');
    }

    init(data) {
        this.nextScene = data.nextScene;
        this.titleText = data.title || 'Challenge Complete';
        this.summaryText = data.text || 'Well done!';
    }

    create() {
        this.add.text(400, 200, this.titleText, { fontSize: '48px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(400, 300, this.summaryText, { fontSize: '24px', fill: '#ccc' }).setOrigin(0.5);
        
        const nextButton = this.add.text(400, 450, 'CONTINUE', { fontSize: '32px', fill: '#0f0' })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        nextButton.on('pointerdown', () => {
            this.scene.start(this.nextScene);
        });

        this.tweens.add({
            targets: nextButton,
            scale: 1.1,
            duration: 800,
            yoyo: true,
            repeat: -1
        });
    }
}
