export const TICKRATE = 3100;
export const ICONS = ["fish", "poop", "weather"];
export const RAINCHANCE = 0.9;
export const SCENE = ["day", "rain "];
export const DAYLENGTH = 60;
export const NIGHTLENGTH = 4;

export const getNextHungerTime = (clock) =>
    Math.floor(Math.random() * 3) + 5 + clock;

export const getNextDieTime = (clock) =>
    Math.floor(Math.random() * 2) + 3 + clock;

export const getNextPoopTime = (clock) =>
    Math.floor(Math.random() * 3) + 4 + clock;
