class Character {
    constructor(name, hpMax, dmg, manaMax, specialAttack) {
        this.name = name
        this.hpMax = hpMax;
        this.currentHp = hpMax;
        this.dmg = dmg;
        this.manaMax = manaMax;
        this.currentMana = manaMax;
        this.specialAttack = specialAttack;
        this.status = "Playing";
    }

    takeDamage(amount) {
        this.currentHp -= amount;
        if (this.currentHp < 0) this.currentHp = 0;

        if (this.currentHp === 0) {
            console.log(`${this.name} est mort.`);
            this.status = "Defeated";
        }
    }

    dealDamage(target) {
        if (!target.isAlive()) {
            console.log(`${target.name} est déjà mort. Inutile de l'attaquer.`);
            return;
        }
    
        target.takeDamage(this.dmg);
    
        if (!target.isAlive()) {
            console.log(`${this.name} a tué ${target.name} et regagne 20 points de mana !`);
            this.currentMana = Math.min(this.currentMana + 20, this.manaMax);
            target.status = "Defeated";
        }
    }
    
    isAlive() {
        return this.currentHp > 0;
    }

}

export default Character