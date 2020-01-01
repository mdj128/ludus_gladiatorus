

export const simulateBattle = (p1, p2, n) => {
  let p1wins = 0;
  const logs = [];
  for (let i = 0; i < n; i++) {
    p1.hp = getMaxHp(p1);
    p2.hp = getMaxHp(p2);
    logs.push(...fight(p1, p2));
    if (p1.hp > 0) {
      p1wins++;
    }
  }

  const p1WinPct = Math.round((p1wins / n) * 100);

  const result = {
    [p1.name]: p1WinPct,
    [p2.name]: 100 - p1WinPct,
    logs,
  };

  return result;
};

export const calculateDamage = (attacker, defender) => {
  // first roll for miss based on agi and dex
  const missPct = 0.1980 - 0.003790 * attacker.dex + 0.004323 * defender.agi;
  if (Math.random() <= missPct) {
    return 0;
  }

  const weaponMod	=	7.928 + 0.14210 * attacker.weapon;
  const strVsAcMod = 1.0070 + 0.011422 * attacker.str - 0.011120 * defender.ac;
  const base = randn_bm(0, 1, 0.75) * weaponMod; 

  // apply modifier based on regression model for strength
  const damage = base * strVsAcMod;

  return Math.round(damage);
};

export const getMaxHp = p => Math.round(25 + p.lvl * 5 + (1 + 0.1 * p.lvl) * p.sta);

function fight(p1, p2) {
  const log = [];
  while (p1.hp > 0 && p2.hp > 0) {
    const d1 = calculateDamage(p1, p2);
    log.push({ 'name': p1.name, 'dmg': d1 });
    p2.hp -= d1;
    if (p2.hp <= 0) {
      break;
    }
    const d2 = calculateDamage(p2, p1);
    log.push({ 'name': p2.name, 'dmg': d2 });
    p1.hp -= d2;
  }
  return log;
}

// Normal distribution with min, max, skew
// https://jsfiddle.net/ktq9jaoe/4/
function randn_bm(min, max, skew) {
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
  return num;
}
