import * as Phaser from 'phaser';

export class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        console.log('Boot: Preload started');
        // Visual loading indicator
        const graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(250, 290, 300, 20);
        
        this.load.on('progress', (value) => {
            graphics.clear();
            graphics.fillStyle(0xffffff, 1);
            graphics.fillRect(250, 290, 300 * value, 20);
        });

        this.load.on('complete', () => {
            console.log('Boot: Loading complete, starting Menu');
            this.scene.start('Menu');
        });

        // Trigger loading completion
        this.load.image('dummy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');
    }
}
