import Character from './Character.js'

class SpecialAttack {
    constructor(name, dmg, manaCost) {
        this.name = name;
        this.dmg = dmg;
        this.manaCost = manaCost;
    }
}

class Wizard extends Character {
    constructor(name) {
        super(name,10, 2, 200, new SpecialAttack("Fire Ball", 7, 25))
    }
    useSpecialAttack(target) {
        if (this.currentMana < this.specialAttack.manaCost) {
            console.log(`${this.name} n’a pas assez de mana pour utiliser ${this.specialAttack.name}`);
            return;
        }

        this.currentMana -= this.specialAttack.manaCost;
        console.log(`${this.name} utilise ${this.specialAttack.name} sur ${target.name} !`);

        this.dealDamage(target)

    }
}

export default Wizard