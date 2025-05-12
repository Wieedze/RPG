# ⚔️ Terminal Battle Game

A simple turn-based battle game made in JavaScript, running in the terminal via Node.js.  
Choose your fighter and defeat your enemies using basic and special attacks!

## 🎮 Game Versions

This project includes **three versions** of the game logic:

1. **Full Manual Version**  
   You control all characters manually one by one.

2. **Random Team Version**  
   A random selection of characters is made at the beginning. You still control each of them manually.

3. **Single Player vs AI (Champion Mode)**  
   You choose one character to play as. The remaining fighters are controlled by the computer (bots).  
   Bots make random choices at first, and a simple AI can later be added to prioritize killing blows.

## 🚀 How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/terminal-battle-game.git
   cd terminal-battle-game
Install dependencies:

bash
Copier
Modifier
npm install
Run the game (adjust the entry file depending on the version you want to test):

bash
Copier
Modifier
node version1_full_manual.js      # Full Manual Version
node version2_random_team.js      # Random Team Version
node version3_champion_mode.js    # Champion Mode (You vs Bots)
👾 Characters
Each character has unique stats and special attacks:

🛡️ Fighter

✝️ Paladin

🙏 Monk

🔥 Berzerker

🗡️ Assassin

🔮 Wizard

🧛 Vampire

📦 Dependencies
readline-sync – for user input in terminal.

💡 Ideas for Improvement
Improve AI to prioritize low-health enemies.

Add healing or defense mechanics.

Display damage dealt each round.

Improve visuals with colors using chalk.

🧑‍💻 Author
Made by Maxime Saint-Joannis as part of a learning project.

Thanks for playing! 🎲

