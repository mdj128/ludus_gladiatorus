
const p1 = { name: 'Spartacus', lvl: 10, maxhp: 300, hp: 300, str: 20, dex: 10, agi: 15, weapon: 10, ac: 10 };
const p2 = { name: 'Gannicus', lvl: 10, maxhp: 300, hp: 300, str: 5, dex: 5, agi: 10, weapon: 10, ac: 30 };

export const simulateBattle = (p1, p2) => {
  
let p1wins = 0;

for (let i = 0; i < 10000; i++) {
  p1.hp = 100 + p1.lvl * p1.sta;
  p2.hp = 100 + p2.lvl * p2.sta;
  fight(p1, p2);
  if (p1.hp > 0) {
    p1wins++; 
  }
  p1.hp = 100 + p1.lvl * p1.sta;
  p2.hp = 100 + p2.lvl * p2.sta;
}

return Math.round((p1wins / 10000) * 100);
};

function fight(p1, p2) {
  while (p1.hp > 0 && p2.hp > 0) {
    attackRound(p1, p2);
    if (p2.hp <= 0) {
      // console.log(`${p1.name} has defeated ${p2.name}!`);
      break;
    }
    attackRound(p2, p1);
    if (p1.hp <= 0) {
      // console.log(`${p2.name} has defeated ${p1.name}!`);
      break;
    }
  }
};

function attackRound(p1, p2) {
  const d1 = calculateDamage(p1, p2);
  // console.log(d1 === 0 ? `${p1.name} tried to hit ${p2.name}, but missed!` : `${p1.name} hit ${p2.name} for ${d1} damage!`);
  p2.hp -= d1;
}

function calculateDamage(attacker, defender) {
  // first roll for miss based on agi and dex
  const missPct = 0.1980 - 0.003790 * attacker.dex + 0.004323 * defender.agi;
  if (Math.random() <= missPct) {
    return 0;
  }

  const weaponMod	=	7.928 + 0.14210 * attacker.weapon;
  const strVsAcMod = 1.0070 + 0.011422 * attacker.str - 0.011120 * defender.ac;
  const base = Math.random() * weaponMod; 

  // apply modifier based on regression model for strength
  const damage = base * strVsAcMod;

  return Math.round(damage);
}

// Normal distribution with min, max, skew
// https://jsfiddle.net/ktq9jaoe/4/
function randn_bm(min, max, skew, whole = true) {
  let u = 0, v = 0;
  while (u === 0) {
    u = Math.random();
  } // Converting [0,1) to (0,1)
  while (v === 0) {
    v = Math.random();
  }
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) {
    num = randn_bm(min, max, skew);
  } // resample between 0 and 1 if out of range
  num = Math.pow(num, skew); // Skew
  num *= max - min; // Stretch to fill range
  num += min; // offset to min
  return whole ? Math.round(num) : num;
}
