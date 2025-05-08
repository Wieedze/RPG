import Character from './Character.js'

class SpecialAttack {
    constructor(name, dmg, manaCost) {
        this.name = name;
        this.dmg = dmg;
        this.manaCost = manaCost;
    }
}

class Assassin extends Character {
    constructor(name){
        super(name, 10, 5, 20 , new SpecialAttack("Shadow Hit", 7, 20))
        this.protectedNextTurn = false
    }
    useSpecialAttack(target) {
        if (this.currentMana < this.specialAttack.manaCost) {
            console.log(`${this.name} n’a pas assez de mana pour utiliser ${this.specialAttack.name}`);
            return;
        }
    
        this.currentMana -= this.specialAttack.manaCost;
        console.log(`${this.name} utilise ${this.specialAttack.name} sur ${target.name}, il lui reste ${this.currentMana} mana.`);
    
        this.dealDamage(target);
    
        this.protectedNextTurn = true;
        console.log(`${this.name} sera protégé des dégâts au prochain tour.`);
    
        if (target.isAlive()) {
            this.takeDamage(this.specialAttack.dmg);
            console.log(`${this.name} perd 7 PV suite au contre-coup de son attaque.`);
            if (this.currentHp < 0) this.currentHp = 0;
        }
    }
    
}

export default Assassin