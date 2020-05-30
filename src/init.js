import game, { handleUserAction } from "./gameState";
import { TICKRATE } from "./constants";
import initButton from "./buttons";

async function init() {
    console.log("starting game");
    initButton(handleUserAction);
    let nextTimeToTick = Date.now();

    function nextAnimationFrame() {
        const now = Date.now();

        if (nextTimeToTick <= now) {
            game.tick();
            nextTimeToTick = now + TICKRATE;
        }

        requestAnimationFrame(nextAnimationFrame);
    }

    requestAnimationFrame(nextAnimationFrame);
}

init();
