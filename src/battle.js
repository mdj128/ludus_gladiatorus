import { randn_bm } from './statHelpers';

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

  const weaponMod	=	8 + 0.3 * attacker.weapon;
  const strVsAcMod = 1 + 0.03 * attacker.str - 0.03 * defender.ac;
  const base = randn_bm(0, 1, 2) * weaponMod; 

  // apply modifier based on regression model for strength
  const damage = base * strVsAcMod;

  return Math.round(damage);
};

// formula for max hp is based on lvl and sta
export const getMaxHp = p => Math.round(25 + p.lvl * 5 + (1 + 0.1 * p.lvl) * p.sta);

function fight(p1, p2) {
  // give each fighter a 50/50 chance to have the first swing
  if (Math.random() > 0.5) {
    [p1, p2] = [p2, p1];
  }
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

