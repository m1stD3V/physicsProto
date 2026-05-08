import * as Phaser from 'phaser';
import { Boot } from './scenes/Boot.js';
import { Menu } from './scenes/Menu.js';
import { JumpChallenge } from './scenes/JumpChallenge.js';
import { AccelerationChallenge } from './scenes/AccelerationChallenge.js';
import { BounceChallenge } from './scenes/BounceChallenge.js';
import { Summary } from './scenes/Summary.js';
import { Credits } from './scenes/Credits.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 1 },
            debug: true
        }
    },
    scene: [Boot, Menu, JumpChallenge, AccelerationChallenge, BounceChallenge, Summary, Credits],
    parent: 'game-container'
};

const game = new Phaser.Game(config);
