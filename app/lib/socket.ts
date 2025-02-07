'use client'
import { io } from "socket.io-client";

export const socket = io('http://localhost:3333');

socket.on('connect', function () {
    console.log('Connected');
        socket.emit('syncDecksAndCards', {
            decks: [],
            cards: []
        });

});
socket.on('disconnect', function () {
    console.log('Disconnected');
});
socket.on('events', function (data) {
    console.log('event', data);
});
socket.on('exception', function (data) {
    console.log('event', data);
});