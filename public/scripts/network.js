import Player from './player.js';

import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

// Socket.IO Verbindung zum Server
export const socket = io();

// Alle Spieler, inkl. lokalem Player
export const players = {};

// Eigener Player
export let localPlayer = new Player();

// Beim Laden: eigenen Player registrieren
socket.on('currentPlayers', (serverPlayers) => {
    for (const id in serverPlayers) {
        if (id === socket.id) {
            localPlayer.x = serverPlayers[id].x;
            localPlayer.y = serverPlayers[id].y;
            players[id] = localPlayer;
        } else {
            const p = new Player();
            p.x = serverPlayers[id].x;
            p.y = serverPlayers[id].y;
            players[id] = p;
        }
    }
});

// Neuer Spieler
socket.on('newPlayer', ({ id, data }) => {
    const p = new Player();
    p.x = data.x;
    p.y = data.y;
    players[id] = p;
});

// Spielerbewegung von anderen
socket.on('playerMoved', ({ id, data }) => {
    if (players[id]) {
        players[id].x = data.x;
        players[id].y = data.y;
    }
});

// Spieler-Angriff von anderen
socket.on('playerAttack', ({ id, weapon }) => {
    console.log(`Spieler ${id} greift mit ${weapon} an`);
});

// Spieler getrennt
socket.on('playerDisconnected', (id) => {
    delete players[id];
});

// Eigene Bewegung senden
export function sendMovement(x, y) {
    socket.emit('playerMove', { x, y });
}

// Eigene Angriffe senden
export function sendAttack(weapon) {
    socket.emit('attack', { weapon });
}
