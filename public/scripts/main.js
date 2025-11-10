import Player from './player.js';
import Weapon from './weapon.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = new Player();
let sword = new Weapon('Schwert', 25);
let bow = new Weapon('Bogen', 15);
player.equipWeapon(sword);

document.getElementById('weapon1').addEventListener('click', () => {
    player.equipWeapon(sword);
});
document.getElementById('weapon2').addEventListener('click', () => {
    player.equipWeapon(bow);
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.draw(ctx);
    requestAnimationFrame(gameLoop);
}

gameLoop();
