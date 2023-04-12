import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import * as character from "./js/character.js";

//User Interface Logic

window.onload = function () {
  document.getElementById("wizard").onclick = function () {
    const newState = character.stateControlCharacter(character.incAttack);
    document.getElementById("wizard-attack").innerText = `Character Stats: ${newState.attack}`;
  };

  document.getElementById("show-state").onclick = function () {
    const currentState = character.stateControlCharacter();
    document.getElementById("wizard-attack").innerText = `Attack: ${currentState.attack}`;
  };
};

window.addEventListener("load", function () {
  document
    .querySelector("form")
    .addEventListener("submit");
  // stateControlCharacter();
});