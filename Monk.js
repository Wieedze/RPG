import Character from './Character.js'

class SpecialAttack {
    constructor(name, dmg, manaCost) {
        this.name = name;
        this.dmg = dmg;
        this.manaCost = manaCost;
    }
}

class Monk extends Character {
    constructor(name){
        super(name, 10, 4, 200, new SpecialAttack("Heal", 0, 25))
    }
    useSpecialAttack() {
        if (this.currentMana < this.specialAttack.manaCost) {
            console.log(`${this.name} n’a pas assez de mana pour utiliser ${this.specialAttack.name}`);
            return;
        }

        this.currentMana -= this.specialAttack.manaCost;
        console.log(`${this.name} utilise ${this.specialAttack.name} ,il lui reste ${this.currentMana} mana.`);

        
        this.currentHp += 8;
        if (this.currentHp > this.hpMax) {
            this.currentHp = this.hpMax;
        }

        console.log(`${this.name} récupère 8 points de vie.`);
        console.log(`${this.name} a maintenant ${this.currentHp} points de vie.`);
    }
}
export default Monk