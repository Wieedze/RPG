import Character from './Character.js'

class SpecialAttack {
    constructor(name, dmg, manaCost) {
        this.name = name;
        this.dmg = dmg;
        this.manaCost = manaCost;
    }
}



class Berzerker extends Character {
    constructor(name){
        super(name, 16, 4, 0, new SpecialAttack("Rage", 1, 0))
    }
    useSpecialAttack(target) {
        if (this.currentHp <= 1) {
            console.log(`${this.name} ne peut pas utiliser Rage, il ne lui reste plus assez de vie.`);
    
            const actionChoice = prompt("Veux-tu attaquer normalement ? (oui/non) : ").toLowerCase();
    
            if (actionChoice === 'oui') {
                this.dealDamage(target);  
                console.log(`${this.name} attaque normalement.`);
            } else {
                console.log(`${this.name} a choisi de ne pas attaquer.`);
            }
            return;
        }
    
        console.log(`${this.name} utilise ${this.specialAttack.name} `);
        this.currentHp -= 1;
        this.dmg += 1;
    
        console.log(`${this.name} perd 1 point de vie, il lui reste ${this.currentHp} HP.`);
        console.log(`${this.name} devient plus fort, ses dégâts sont maintenant de ${this.dmg}.`);
    }
    

}

export default Berzerker