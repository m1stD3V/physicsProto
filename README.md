# Physics Indirectly

A physics-based game built with Phaser 3 and Matter.js focusing on indirect interaction.

## Requirement Fulfillment

### 1. Playable Game
The game is structured and built using Vite, ensuring it is ready for deployment to platforms like Itch.io. All scenes and physics interactions are verified to function in a standard web environment.

### 2. Indirect Physics Interaction
Player control is strictly indirect. The target object (the ball) is never directly controlled by the player. Instead, the player influences its movement by:
- **Level 1 (Jump)**: Applying external "blast" forces near the ball to push it.
- **Level 2 (Acceleration)**: Creating a magnetic field that pulls the ball towards the pointer.
- **Level 3 (Bounce)**: Placing temporary physical bouncers in the environment to redirect the ball's path.

### 3. Non-Gameplay Scenes
The game features a robust scene management system to provide context:
- **Intro (Menu)**: Provides the game title and high-level instructions.
- **Summaries**: Transition scenes appear after every challenge to confirm success and provide a thematic break before the next level.
- **Credits**: A final scene that contextualizes the development and asset usage.

### 4. Progression through 3+ Physics Challenges
The game features three distinct gameplay challenges, each utilizing a different physics principle:
- **Challenge 1: Jump**: Focuses on impulsive forces and gravity management.
- **Challenge 2: Acceleration**: Focuses on continuous force application and friction/drag (frictionAir).
- **Challenge 3: Bounce**: Focuses on restitution and collision redirection.

### 5. Functional Continuous and Discrete Inputs
The input system is designed to support multiple interaction styles:
- **Discrete Input**: Level 1 (single-click blasts) and Level 3 (single-click bouncer placement) require precise, individual actions.
- **Continuous Input**: Level 2 (holding the mouse button) requires sustained interaction to maintain the magnetic pull, demonstrating functional continuous input.

### 6. Credits and Asset Attribution
Credits are present in two locations:
- **In-Game**: A dedicated `Credits` scene accessible after completing the final challenge.
- **README**: Full attribution for the game engine (Phaser 3), physics engine (Matter.js), and procedural assets is listed below.

---

## Credits & Asset Attribution
- **Design & Implementation**: m1stD3V
- **Game Engine**: [Phaser 3](https://phaser.io/)
- **Physics Engine**: [Matter.js](https://brm.io/matter-js/)
- **Assets**: All visuals are procedurally generated using the Phaser Graphics API.

## Technical Setup
1. **Install dependencies**: `npm install`
2. **Start development**: `npm start`
3. **Production build**: `npm run build`
