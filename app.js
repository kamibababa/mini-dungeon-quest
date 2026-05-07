const state = {
  depth: 1,
  hp: 20,
  gold: 0
};

const depthEl = document.getElementById("depth");
const hpEl = document.getElementById("hp");
const goldEl = document.getElementById("gold");
const eventEl = document.getElementById("event");

const events = [
  "You found a hidden coin stash.",
  "A skeleton scratches you.",
  "You discover an old healing fountain.",
  "A goblin drops a pouch of gold.",
  "A trap springs from the floor.",
  "You slip past monsters silently."
];

function render() {
  depthEl.textContent = String(state.depth);
  hpEl.textContent = String(state.hp);
  goldEl.textContent = String(state.gold);
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function explore() {
  if (state.hp <= 0) {
    eventEl.textContent = "You are defeated. Press New Run.";
    return;
  }

  const roll = randomInt(events.length);
  state.depth += 1;

  if (roll === 0 || roll === 3) {
    state.gold += 3 + randomInt(8);
  } else if (roll === 1 || roll === 4) {
    state.hp -= 2 + randomInt(5);
  } else {
    state.hp = Math.min(20, state.hp + 2 + randomInt(3));
  }

  if (state.hp <= 0) {
    state.hp = 0;
    eventEl.textContent = "A final blow lands. Run ended.";
  } else {
    eventEl.textContent = events[roll];
  }

  render();
}

function rest() {
  if (state.hp <= 0) {
    eventEl.textContent = "You cannot rest while defeated.";
    return;
  }

  state.hp = Math.min(20, state.hp + 4);
  eventEl.textContent = "You camp briefly and recover 4 HP.";
  render();
}

function reset() {
  state.depth = 1;
  state.hp = 20;
  state.gold = 0;
  eventEl.textContent = "A new adventure begins.";
  render();
}

document.getElementById("exploreBtn").addEventListener("click", explore);
document.getElementById("restBtn").addEventListener("click", rest);
document.getElementById("resetBtn").addEventListener("click", reset);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

render();
