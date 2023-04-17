import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import * as character from "./js/character.js";
import { handleShop, closeShop } from './js/store';
import skeleton from './assets/images/skeleton.png';
import butcher from './assets/images/butcher.png';
import Mephisto from './assets/images/mephisto.png';
import adria from './assets/images/Adria.png';
import Baal from './assets/images/baal.png';

//User Interface Logic
let currCharacter;
let currMonster;

const toggleCharacterAssets = (curChar) => {
  document.getElementById('heroName').innerHTML = curChar().name;
  document.getElementById('heroLevel').innerHTML = curChar().level;
  document.getElementById('heroHealth').innerHTML = curChar().health;
  document.getElementById('heroAttack').innerHTML = curChar().attack;
  document.getElementById('heroMagic').innerHTML = curChar().magic;
  document.getElementById('heroMana').innerHTML = curChar().mana;
  document.getElementById('heroExp').innerHTML = curChar().exp;
  document.getElementById('heroGold').innerHTML = curChar().gold;
};

const toggleMonsterAssets = (curChar) => {
  document.getElementById('monsterName').innerHTML = curChar().name;
  document.getElementById('monsterHealth').innerHTML = curChar().health;
};

const deadCharacterAssets = () => {
  document.getElementById("dead").innerText = `YOU HAVE DIED!`;
  document.getElementById("heroHealth").innerHTML <= 0;
  document.getElementById('moves').setAttribute('class', 'hidden');
  document.getElementById('choice').setAttribute('class', 'hidden');
  document.getElementById('reset').removeAttribute('class', 'hidden');
};

const deadMonsterAssets = () => {
  document.getElementById('monsterName').setAttribute('style', 'color: red;');
  document.getElementById('monsterName').innerText = "DEFEATED";
  document.getElementById("atkDamage").innerHTML = null;
  document.getElementById("monsterHealth").innerHTML = null;
  document.getElementById("monsterAtkDamage").innerHTML = null;
  document.getElementById("choice").removeAttribute('class', 'hidden');
  document.getElementById('moves').setAttribute('class', 'hidden');
};

const handleWizard = (event) => {
  event.preventDefault();
  currCharacter = character.storeState("Wizard");
  character.createWizard(currCharacter);
  document.getElementById('charImg').setAttribute("src", "assets/images/Wizard.png");
  document.getElementById('charSelect').setAttribute('class', 'hidden');
  document.getElementById('charInfo').removeAttribute('class', 'hidden');
  document.getElementById('locations').removeAttribute('class', 'hidden');
  toggleCharacterAssets(currCharacter);
};

const handleWarrior = (event) => {
  event.preventDefault();
  currCharacter = character.storeState("Warrior");
  character.createWarrior(currCharacter);
  document.getElementById('charImg').setAttribute("src", "assets/images/War.png");
  document.getElementById('charSelect').setAttribute('class', 'hidden');
  document.getElementById('charInfo').removeAttribute('class', 'hidden');
  document.getElementById('locations').removeAttribute('class', 'hidden');
  toggleCharacterAssets(currCharacter);
};

const handleMonk = (event) => {
  event.preventDefault();
  currCharacter = character.storeState("Monk");
  character.createMonk(currCharacter);
  document.getElementById('charImg').setAttribute("src", "assets/images/Monk.png");
  document.getElementById('charSelect').setAttribute('class', 'hidden');
  document.getElementById('charInfo').removeAttribute('class', 'hidden');
  document.getElementById('locations').removeAttribute('class', 'hidden');
  toggleCharacterAssets(currCharacter);
};

const theSkeletonKing = () => {
  currMonster = character.storeState("Skeleton king");
  character.createSkeletonKing(currMonster);
  document.getElementById('monsterImg').setAttribute("src", "assets/images/skeleton.png");
  document.getElementById('locations').removeAttribute('class', 'hidden');
  toggleMonsterAssets(currMonster);
};

const theButcher = () => {
  currMonster = character.storeState("The Butcher");
  character.createTheButcher(currMonster);
  document.getElementById('monsterImg').setAttribute("src", "assets/images/butcher.png");
  document.getElementById('locations').removeAttribute('class', 'hidden');
  toggleMonsterAssets(currMonster);
};

const mephisto = () => {
  currMonster = character.storeState("Mephisto");
  character.createMephisto(currMonster);
  document.getElementById('monsterImg').setAttribute("src", "assets/images/mephisto.png");
  document.getElementById('locations').removeAttribute('class', 'hidden');
  toggleMonsterAssets(currMonster);
};

const queenAdria = () => {
  currMonster = character.storeState("Queen Adria");
  character.createQueenAdria(currMonster);
  document.getElementById('monsterImg').setAttribute("src", "assets/images/Adria.png");
  document.getElementById('locations').removeAttribute('class', 'hidden');
  toggleMonsterAssets(currMonster);
};

const baal = () => {
  currMonster = character.storeState("Baal");
  character.createBaal(currMonster);
  document.getElementById('monsterImg').setAttribute("src", "assets/images/baal.png");
  document.getElementById('locations').removeAttribute('class', 'hidden');
  toggleMonsterAssets(currMonster);
};

const handleFight = (event) => {
  event.preventDefault();
  document.getElementById("fight").classList.add("hidden");
  document.getElementById("shop").classList.add("hidden");
  document.getElementById("choice").classList.remove("hidden");
  document.getElementById("engage").classList.remove("hidden");
  document.getElementById("leave").classList.remove("hidden");
};

const handleEngage = (event) => {
  event.preventDefault();
  const randomizer = character.chance();
  if (randomizer <= 20) {
    theSkeletonKing();
  } else if (randomizer <= 40) {
    theButcher();
  } else if (randomizer <= 60) {
    mephisto();
  } else if (randomizer <= 80) {
    queenAdria();
  } else {
    baal();
  }
  document.getElementById('monster-card').removeAttribute('class', 'hidden');
  document.getElementById('choice').setAttribute('class', 'hidden');
  document.getElementById('moves').removeAttribute('class', 'hidden');
};

const handleLeave = (event) => {
  event.preventDefault();
  document.getElementById("locations").removeAttribute('class', 'hidden');
  document.getElementById('choice').setAttribute('class', 'hidden');
};

const handleAttack = (event) => {
  event.preventDefault();
  const charAtkDamage = character.attack(currCharacter);
  if (charAtkDamage) {
    currMonster(character.decHealth(charAtkDamage));
    document.getElementById("monsterAtkDamage").innerHTML = `HIT for -${charAtkDamage}`;
    toggleMonsterAssets(currMonster);

    if (!character.isDead(currMonster)) {
      const monsterAtkDamage = character.attack(currMonster);
      currCharacter(character.decHealth(monsterAtkDamage));
      document.getElementById("atkDamage").innerHTML = `HIT for -${monsterAtkDamage}`;
      toggleCharacterAssets(currCharacter);
    } else {
      character.gainExp(currCharacter, currMonster);
      character.gainGold(currCharacter);
      character.lvlUp(currCharacter);
      toggleCharacterAssets(currCharacter);
      deadMonsterAssets();
    }
  } if (character.isDead(currCharacter)) {
    deadCharacterAssets();
  }
};


const handleMagic = (event) => {
  event.preventDefault();
  const charMagicDamage = character.magic(currCharacter);
  if (charMagicDamage) {
    currMonster(character.decHealth(charMagicDamage));
    document.getElementById("monsterAtkDamage").innerHTML = `MAGICAL HIT for -${charMagicDamage}`;
    toggleMonsterAssets(currMonster);

    if (!character.isDead(currMonster)) {
      const monsterAtkDamage = character.attack(currMonster);
      currCharacter(character.decHealth(monsterAtkDamage));
      document.getElementById("atkDamage").innerHTML = `HIT for -${monsterAtkDamage}`;
      toggleCharacterAssets(currCharacter);
    } else {
      character.gainExp(currCharacter, currMonster);
      character.gainGold(currCharacter);
      character.lvlUp(currCharacter);
      toggleCharacterAssets(currCharacter);
      deadMonsterAssets();
    }
  } else {
    document.getElementById("dead").innerText = 'NOT ENOUGH MANA!';
  }
};

const handleRestart = () => {
  window.location.reload();
};

addEventListener('load', function () {
  document.getElementById('wizard').addEventListener('click', handleWizard);
  document.getElementById('warrior').addEventListener('click', handleWarrior);
  document.getElementById('monk').addEventListener('click', handleMonk);
  document.getElementById('fight').addEventListener('click', handleFight);
  document.getElementById('shop').addEventListener('click', handleShop);
  document.getElementById('close-shop').addEventListener('click', closeShop);
  document.getElementById('engage').addEventListener('click', handleEngage);
  document.getElementById('leave').addEventListener('click', handleLeave);
  document.getElementById('attack').addEventListener('click', handleAttack);
  document.getElementById('magic').addEventListener('click', handleMagic);
  // document.getElementById('heal').addEventListener('click', handleHeal);
  document.getElementById('restart').addEventListener('click', handleRestart);
});