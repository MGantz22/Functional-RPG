import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import * as character from "./js/character.js";

//User Interface Logic
let currCharacter;

const toggleCharacterAssets = (curChar) => {
  document.getElementById('heroName').innerHTML = curChar().name;
  document.getElementById('heroLevel').innerHTML = curChar().
}

const handleWizard = (event) => {
  event.preventDefault();
  currCharacter = character.storeState("Wizard");
  character.createWizard(currCharacter);
};


window.onload = function () {
  document.getElementById("wizardState").onclick = function () {
    const currentState = character.stateControlWizard();
    const wizardAttack = character.stateControlWizard(character.incAttack);
    const wizardHealth = character.stateControlWizard(character.incHealth);
    const warriorHealthDecrease = character.stateControlWizard(character.decHealth)(character.magic);
    const wizardMana = character.stateControlWizard(character.decMana)(character.magic);
    document.getElementById("wizard-attackstat").innerText = `${wizardAttack.attack}`;
    document.getElementById("wizard-health").innerText = `${wizardHealthDecrease.health}`;
    // document.getElementById("wizard-magic").innerText = `${wizardAttack.attack}`;
    document.getElementById("wizard-mana").innerText = `${wizardMana.mana}`;
    console.log("wizardState");

  };

  // document.getElementById("show-state").onclick = function () {
  //   const currentState = character.stateControlWizard();
  //   document.getElementById("wizardState").innerText = `Wizard: ${currentState.attack}`;
  // };
};

window.addEventListener("load", function () {
  document
    .querySelector("form")
    .addEventListener("submit");
  stateControlWizard();
});