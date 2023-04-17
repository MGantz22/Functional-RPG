//Business Logic
export const storeState = (name) => {
  let currentState = { name: name };
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  };
};

export const stateControl = storeState();


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
export const incGold = incrementState("gold");
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
export const decMana = decrementState("mana");
export const decExp = decrementState("exp");
export const decGold = decrementState("gold");

//Character Function Factory
export const createWizard = (character) => {
  character(incLevel(1));
  character(incMaxHealth(20));
  character(incHealth(20));
  character(incAttack(5));
  character(incMagic(10));
  character(incMaxMana(25));
  character(incMana(25));
  character(incExp(0));
  character(incGold(0));
  character(incAttackPercent(50));
  character(incMagicPercent(80));
};


export const createWarrior = (character) => {
  character(incLevel(1));
  character(incMaxHealth(28));
  character(incHealth(28));
  character(incAttack(10));
  character(incMagic(3));
  character(incMaxMana(10));
  character(incMana(10));
  character(incExp(0));
  character(incGold(0));
  character(incAttackPercent(80));
  character(incMagicPercent(40));
};

export const createMonk = (character) => {
  character(incLevel(1));
  character(incMaxHealth(25));
  character(incHealth(25));
  character(incAttack(8));
  character(incMagic(8));
  character(incMaxMana(17));
  character(incMana(17));
  character(incExp(0));
  character(incGold(0));
  character(incAttackPercent(75));
  character(incMagicPercent(65));
};

export const createSkeletonKing = (character) => {
  character(incHealth(20));
  character(incAttack(3));
  character(incExp(10));
  character(incAttackPercent(50));
};

export const createTheButcher = (character) => {
  character(incHealth(25));
  character(incAttack(5));
  character(incExp(15));
  character(incAttackPercent(50));
};

export const createMephisto = (character) => {
  character(incHealth(22));
  character(incAttack(5));
  character(incExp(20));
  character(incAttackPercent(60));
};

export const createQueenAdria = (character) => {
  character(incHealth(28));
  character(incAttack(4));
  character(incExp(30));
  character(incAttackPercent(60));
};

export const createBaal = (character) => {
  character(incHealth(40));
  character(incAttack(9));
  character(incExp(40));
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
    document.getElementById("monsterAtkDamage").innerHTML = `NOT ENOUGH MANA!`;
  }
};

export const gainExp = (character, monster) => {
  character(incExp(monster().exp));
  return monster().exp;
};

export const gainGold = (character) => {
  const gold = Math.floor(Math.random() * 5);
  character(incGold(gold));
  return gold;
};

export const lvlUp = (character) => {
  if (character().exp >= 60) {
    character(decExp(60));
    character(incLevel(1));
    character(incMaxHealth(5));
    character(incHealth(character().maxHealth - character().health));
    character(incAttack(2));
    character(incMagic(2));
    character(incMaxMana(3));
    character(incMana(character().maxMana - character().mana));
  }
};

export const isDead = (character) => {
  return character().health <= 0;
};