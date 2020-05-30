import { modFox, modScene } from "./ui";
import {
    RAINCHANCE,
    SCENE,
    DAYLENGTH,
    NIGHTLENGTH,
    getNextHungerTime,
    getNextDieTime,
    getNextPoopTime,
} from "./constants";

const gameState = {
    current: "INIT",
    clock: 1,
    wakeTime: -1,
    sleepTime: -1,
    hungryTime: -1,
    dieTime: -1,
    timeToStartCelebrating: -1,
    timeToEndCelebrating: -1,
    tick() {
        this.clock++;
        console.log("clock", this.clock);
        if (this.clock === this.wakeTime) this.woke();
        else if (this.clock === this.sleepTime) this.sleep();
        else if (this.clock === this.hungryTime) this.getHungry();
        else if (this.clock === this.dieTime) this.die();
        return this.clock;
    },
    startGame() {
        console.log("hatching");
        this.current = "HATCHING";
        this.wakeTime = this.clock + 3;
        modFox("egg");
        modScene("day");
    },
    woke() {
        this.current = "IDLING";
        this.wakeTime = -1;
        modFox("idling");
        this.scene = Math.random() > RAINCHANCE ? 0 : 1;
        modScene(SCENE[this.scene]);
        this.sleepTime = this.clock + DAYLENGTH;
        this.hungryTime = getNextHungerTime(this.clock);
    },
    sleep() {
        this.state = "SLEEP";
        modFox("sleep");
        modScene("night");
        this.wakeTime = this.clock + NIGHTLENGTH;
    },
    getHungry() {
        this.current = "HUNGRY";
        this.dieTime = getNextDieTime(this.clock);
        this.hungryTime = -1;
        modFox("hungry");
    },
    die() {
        console.log("die");
    },
    handleUserAction(icon) {
        if (
            ["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"].includes(
                this.current
            )
        )
            return;

        if (this.current === "INIT" || this.current === "DEAD") {
            this.startGame();
            return;
        }

        switch (icon) {
            case "weather":
                this.changeWeather();
                break;
            case "poop":
                this.cleanUpPoop();
                break;
            case "fish":
                this.feed();
                break;
        }
    },

    changeWeather() {
        console.log("changeWeacher");
    },
    cleanUpPoop() {
        console.log("cleanup");
    },
    feed() {
        if (this.current !== "HUNGRY") return;

        this.current = "FEEDING";
        this.dieTime = -1;
        this.poopTime = getNextPoopTime(this.clock);
        modFox("eating");
        this.timeToStartCelebrating = this.clock;
    },
};

export const handleUserAction = gameState.handleUserAction.bind(gameState);
export default gameState;
