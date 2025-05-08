import Character from './Character.js'

class SpecialAttack {
    constructor(name, dmg, manaCost) {
        this.name = name;
        this.dmg = dmg;
        this.manaCost = manaCost;
    }
}

class Fighter extends Character {
    constructor(name) {
        super(name, 12, 4, 40, new SpecialAttack("Dark Vision", 5, 20))
        this.protectedNextTurn = false
    }


    takeDamage(amount) {
        let realDamage = this.protectedNextTurn ? Math.max(amount - 2, 0) : amount;
        this.protectedNextTurn = false;
        this.currentHp -= realDamage;
        if (this.currentHp < 0) this.currentHp = 0;

        console.log(`${this.name} a pris ${realDamage} dégâts.`);

        if (this.currentHp === 0) {
            console.log(`${this.name} est mort.`);
            this.status = "Defeated";
        }
    }


    useSpecialAttack(target) {
        if (this.currentMana < this.specialAttack.manaCost) {
            console.log(`${this.name} n’a pas assez de mana pour utiliser ${this.specialAttack.name}`);
            return;
        }

        this.currentMana -= this.specialAttack.manaCost;
        console.log(`${this.name} utilise ${this.specialAttack.name} sur ${target.name} !`);
        this.dealDamage(target);

        this.protectedNextTurn = true;
        console.log(`${this.name}inflige ${this.dmg} de degats a ${target.name} et sera protégé au prochain tour (-2 dégâts reçus), il lui reste ${this.currentMana} mana.`);
    }
}

export default Fighter