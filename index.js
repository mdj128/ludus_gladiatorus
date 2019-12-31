
const p1 = { name: 'Spartacus', lvl: 1, hp: 30, str: 5 };
const p2 = { name: 'Gannicus', lvl: 1, hp: 30, str: 5 };

while (p1.hp > 0 && p2.hp > 0) {
  attackRound(p1, p2);
  if (p2.hp <= 0) {
    console.log(`${p1.name} has defeated ${p2.name}!`);
    break;
  }
  attackRound(p2, p1);
  if (p1.hp <= 0) {
    console.log(`${p2.name} has defeated ${p1.name}!`);
    break;
  }
}

function attackRound(p1, p2) {
  const d1 = calculateDamage(p1, p2);
  console.log(d1 === 0 ? `${p1.name} tried to hit ${p2.name}, but missed!` : `${p1.name} hit ${p2.name} for ${d1} damage!`);
  p2.hp -= d1;
}

function calculateDamage(attacker, defender) {
  let damage = Math.round(Math.random() * 10);
  if (damage < 5) {
    damage = 0;
  }
  return damage;
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
