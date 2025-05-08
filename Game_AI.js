import readlineSync from 'readline-sync';
import Fighter from './Fighter.js';
import Paladin from './Paladin.js';
import Monk from './Monk.js';
import Berzerker from './Berzerker.js';
import Assassin from './Assassin.js';
import Wizard from './Wizard.js';
import Vampire from './Vampire.js';


class Game {
    constructor(turnLeft) {
        this.maxTurns = turnLeft;
        this.players = [];
        this.turnLeft = turnLeft;
        this.status = "In Progress";
        this.humanPlayer = null;
    }

    startGame() {
        const allCharacters = [
            new Fighter("Grace"),
            new Paladin("Ulder"),
            new Monk("Moana"),
            new Berzerker("Draven"),
            new Assassin("Carl"),
            new Wizard("Mago"),
            new Vampire("Dracula"),
        ];

        const shuffled = allCharacters.sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 5);

        console.log("🎮  Choisis ton personnage parmi les suivants :");
        selected.forEach((char, index) => {
            console.log(`${index + 1}. ${char.constructor.name} ${char.name}`);
        });

        let playerIndex;
        while (playerIndex === undefined) {
            const input = readlineSync.questionInt("👉 Entrez le numéro de votre choix : ");
            if (input >= 1 && input <= selected.length) {
                playerIndex = input - 1;
            } else {
                console.log("❌ Choix invalide.");
            }
        }

        this.humanPlayer = selected[playerIndex];
        this.players = selected;
        console.log(`🙋 Tu joues ${this.humanPlayer.constructor.name} ${this.humanPlayer.name}`);
    }

    startTurn() {
        const turnNumber = this.maxTurns - this.turnLeft + 1;
        console.log(`\n🎲🔁 ─────── Tour ${turnNumber} ───────`);

        const activePlayers = this.players.filter(p => p.status === "Playing" && p.isAlive());
        const shuffledPlayers = [...activePlayers].sort(() => Math.random() - 0.5);

        for (let player of shuffledPlayers) {
            if (!player.isAlive()) continue;

            const enemies = this.players.filter(enemy => enemy !== player && enemy.status === "Playing" && enemy.isAlive());
            if (enemies.length === 0) continue;

            console.log(`\n👉 C'est au tour de ✨ ${player.name} ✨ de jouer !`);

            if (player === this.humanPlayer) {
                this.humanPlayerTurn(player, enemies);
            } else {
                this.botTurn(player, enemies);
            }

            if (this.checkVictory()) {
                this.status = "Finished";
                return;
            }
        }

        this.turnLeft--;
        if (this.turnLeft <= 0) {
            this.status = "Finished";
        }
    }

    humanPlayerTurn(player, enemies) {
        let validAction = false;

        while (!validAction) {
            const actionChoice = readlineSync.question(`\n🛡️ Que veux-tu faire ?\n1️⃣ Attaquer\n2️⃣ Voir les stats\n0️⃣ Quitter\n👉 Ton choix : `);

            switch (actionChoice) {
                case '0':
                    console.log(`🚪 ${player.name} a choisi de quitter le jeu.`);
                    player.status = "Dead";
                    validAction = true;
                    break;
                case '1':
                    this.attack(player, enemies);
                    validAction = true;
                    break;
                case '2':
                    this.displayStats();
                    break;
                default:
                    console.log("❌ Choix invalide.");
            }
        }
    }

    botTurn(player, enemies) {
        const target = enemies[Math.floor(Math.random() * enemies.length)];
        const useSpecial = Math.random() < 0.5;

        if (useSpecial) {
            console.log(`✨ ${player.name} utilise une attaque spéciale sur ${target.name}`);
            player.useSpecialAttack(target);
        } else {
            console.log(`⚔️ ${player.name} attaque ${target.name}`);
            player.dealDamage(target);
        }

        console.log(`❤️ ${target.name} a ${target.currentHp} points de vie restants.`);
    }

    attack(player, enemies) {
        let target;
        while (!target) {
            const targetName = readlineSync.question(`\n👊 Qui veux-tu attaquer, ${player.name} ? (tape le nom exact) 👉 `);
            target = enemies.find(enemy => enemy.name.toLowerCase() === targetName.toLowerCase());

            if (!target) {
                console.log("❌ Nom invalide. Veuillez choisir un ennemi valide.");
            }
        }

        const useSpecial = readlineSync.question(`\n✨ Veux-tu utiliser une attaque spéciale ? (oui/non) 👉 `).toLowerCase();
        if (useSpecial === "oui") {
            player.useSpecialAttack(target);
        } else if (useSpecial === "non") {
            player.dealDamage(target);
            console.log(`⚔️ ${player.name} attaque ${target.name}.`);
        } else {
            console.log("❌ Veuillez entrer 'oui' ou 'non'.");
        }

        console.log(`❤️ ${target.name} a ${target.currentHp} points de vie restants.`);
    }

    displayStats() {
        console.log("\n📊 Statistiques des joueurs :\n--------------------------");
        this.players.forEach(player =>
            console.log(`- ${player.constructor.name} ${player.name} : ❤️ ${player.currentHp} HP | 🔮 ${player.currentMana} Mana`)
        );
    }

    skipTurn() {
        this.turnLeft -= 1;

        if (this.checkVictory()) {
            this.status = "Finished";
            return;
        }

        if (this.turnLeft === 0) {
            this.status = "Finished";
            const alivePlayers = this.players.filter(players => players.status === "Playing");

            if (alivePlayers.length > 0) {
                alivePlayers.forEach(player => {
                    player.status = "Winner";
                    console.log(`🎉 ${player.name} a gagné la partie ! 🏆`);
                });
            }
        }
    }

    checkVictory() {
        const alivePlayers = this.players.filter(player => player.status === "Playing");

        if (alivePlayers.length === 1) {
            const winner = alivePlayers[0];
            winner.status = "Winner";
            console.log(`🎉🎉 ${winner.name} est le dernier survivant et remporte la partie ! 🏆`);
            return true;
        }

        return false;
    }

    gameOverScreen() {
        console.log("\n🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥");
        console.log("💀💀💀          GAME OVER          💀💀💀");
        console.log("🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥\n");
    
        console.log("📜 Résumé de la partie :\n-------------------------");
    
        this.players.forEach(player => {
            let state = player.status;
            if (player.status === "Playing" && player.currentHp <= 0) {
                state = "Dead";
            }
            console.log(`- ${player.constructor.name} ${player.name} : ${state} | ❤️ ${player.currentHp} HP | 🔮 ${player.currentMana} Mana`);
        });
    
        const winners = this.players.filter(p => p.status === "Winner");
        if (winners.length > 0) {
            console.log("\n🏆 Gagnant(s) :");
            winners.forEach(p => console.log(`✨ ${p.name}`));
        } else {
            console.log("\n⚠️ Aucun gagnant cette fois.");
        }
    
        console.log("\nMerci d'avoir joué ! 🎮");
    }

}

export default Game;

const game = new Game(10);
game.startGame();
game.displayStats();

while (game.status === "In Progress") {
    game.startTurn();
}
game.gameOverScreen(); 