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

export const stateControlCharacter = storeState();


const incrementState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value,
    });
  };
};

export const incLevel = incrementState("level")(1);
export const incMaxHealth = incrementState("maxHealth")(20);
export const incHealth = incrementState("health")(10);
export const incAttack = incrementState("attack")(5);
export const incMagic = incrementState("magic")(5);
export const incMaxMana = incrementState("maxMana")(20);
export const incMana = incrementState("mana")(5);
export const incExp = incrementState("exp")(5);
export const incAttackPercent = incrementState("atkPercent")(10);
export const incMagicPercent = incrementState("magPercent")(15);

const decrementState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) - value,
    });
  };
};

export const decHealth = decrementState("health")(-5);
export const decAttack = decrementState("attack")(-5);
export const decMagic = decrementState("magic")(-10);
export const decMaxMana = decrementState("maxMana")(-5);
export const decMana = decrementState("mana")(-1);
export const decExp = decrementState("exp")(-2);

//Character Function Factory

export const createWizard = (character) => {
  // let state = {
  character(incLevel(1));
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

export const createWorrior = (character) => {
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
  character(incHealth(15));
  character(incAttack(2));
  character(incExp(10));
  character(incAttackPercent(50));
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
  }
};
