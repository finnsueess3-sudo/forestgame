export default class Player {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.hp = 100;
        this.weapon = null;
    }

    equipWeapon(weapon) {
        this.weapon = weapon;
        console.log(`Bewaffnet mit: ${weapon.name}`);
    }

    update() {
        // Platzhalter: einfache Bewegung über Pfeiltasten
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp': this.y -= 5; break;
                case 'ArrowDown': this.y += 5; break;
                case 'ArrowLeft': this.x -= 5; break;
                case 'ArrowRight': this.x += 5; break;
            }
        });
    }

    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, 50, 50);

        // HP-Anzeige aktualisieren
        const hpFill = document.getElementById('hp-fill');
        const hpText = document.getElementById('hp-text');
        hpFill.style.width = `${this.hp}%`;
        hpText.innerText = `${this.hp} / 100`;
    }
}
