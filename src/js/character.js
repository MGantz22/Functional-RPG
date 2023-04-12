//Business Logic

export const storeState = (name) => {
  let currentState = { name: name };
  return (stateChangeFunction = (state) => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
};

// export const stateControl = storeState();

export const stateControlWizard = storeState();


const incrementState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value,
    });
  };
};

export const incLevel = incrementState("level");
export const incMaxHealth = incrementState("maxHealth");
export const incHealth = incrementState("health");
export const incAttack = incrementState("attack");
export const incMagic = incrementState("magic");
export const incMaxMana = incrementState("maxMana");
export const incMana = incrementState("mana");
export const incExp = incrementState("exp");
export const incAttackPercent = incrementState("atkPercent");
export const incMagicPercent = incrementState("magPercent");

const decrementState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) - value,
    });
  };
};

export const decHealth = decrementState("health");
export const decAttack = decrementState("attack");
export const decMagic = decrementState("magic");
export const decMaxMana = decrementState("maxMana");
export const decMana = decrementState("mana");
export const decExp = decrementState("exp");

//Character Function Factory
// character();
export const wizard = (character) => {
  const character = incLevel(1);
  character(incMaxHealth(20));
  character(incHealth(20));
  character(incAttack(10));
  character(incMagic(2));
  character(incMaxMana(5));
  character(incMana(5));
  character(incExp(0));
  character(incAttackPercent(40));
  character(incMagicPercent(80));
};
// return {...state, ...createWizard(stateControl(state))};
// };

export const stateControlWarrior = storeState();

export const createWarrior = (character) => {
  character(incLevel(1));
  character(incMaxHealth(15));
  character(incHealth(15));
  character(incAttack(2));
  character(incMagic(10));
  character(incMaxMana(20));
  character(incMana(20));
  character(incExp(0));
  character(incAttackPercent(40));
  character(incMagicPercent(80));
};

export const createSkeletonKing = (character) => {
  character(incHealth(12));
  character(incAttack(2));
  character(incExp(10));
  character(incAttackPercent(50));
};

export const createTheButcher = (character) => {
  character(incHealth(13));
  character(incAttack(2));
  character(incExp(20));
  character(incAttackPercent(60));
};

export const createMephisto = (character) => {
  character(incHealth(15));
  character(incAttack(2));
  character(incExp(30));
  character(incAttackPercent(60));
};

export const createQueenAdria = (character) => {
  character(incHealth(20));
  character(incAttack(2));
  character(incExp(40));
  character(incAttackPercent(60));
};

export const createBaal = (character) => {
  character(incHealth(25));
  character(incAttack(5));
  character(incExp(50));
  character(incAttackPercent(60));
};

export const chance = () => {
  return Math.floor(Math.random() * 100) + 1;
};

export const attack = (character) => {
  if (chance() <= character().atkPercent) {
    return character().attack;
  } else {
    return character().attack / 2;
  }
};

export const magic = (character) => {
  if (character().magic >= 4) {
    character(decMana(4));
    if (chance() <= character().magPercent) {
      return character().magic;
    } else {
      return character().magic / 2;
    }
  } else {
    document.getElementById("errorAtk").innerHTML = `NOT ENOUGH MANA!`;
  }
};

export const lvlup = (character) => {
  if (character().exp >= 50) {
    character(decExp(50));
    character(incLevel(1));
    character(incMaxHealth(5));
    character(incHealth(character().maxHealth - character().health));
    character(incAttack(2));
    character(incMagic(2));
    character(incMaxMana(3));
    character(incMana(character().maxMana- character().mana));
  }
}

export const isDead = (character) => {
  return character().health <= 0;
};
