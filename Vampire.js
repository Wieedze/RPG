import Character from './Character.js'

class SpecialAttack {
    constructor(name, dmg, manaCost) {
        this.name = name;
        this.dmg = dmg;
        this.manaCost = manaCost;
    }
}

class Vampire extends Character {
    constructor(name) {
        super(name, 12, 4, 120, new SpecialAttack("Blood Drain", 5, 20))
    }
    useSpecialAttack(target){
        if (this.currentMana < this.specialAttack.manaCost) {
            console.log(`${this.name} n’a pas assez de mana pour utiliser ${this.specialAttack.name}`);
            return;
        }

        this.currentMana -= this.specialAttack.manaCost;
        console.log(`${this.name} utilise ${this.specialAttack.name} sur ${target.name} !`);

        this.dealDamage(target)
        this.currentHp += 5;
        if (this.currentHp > this.hpMax) this.currentHp = this.hpMax; 

        console.log(`${this.name} récupère 5 points de vie et en a maintenant ${this.currentHp}, il lui reste ${this.currentMana} mana.`);
    }
}

export default Vampire