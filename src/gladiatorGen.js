import { getRandomInt, randn_bm, knuthShuffle } from './statHelpers';
import _ from 'lodash';

const originCountries = ['Rome', 'Gaul', 'Germania', 'Greece', 'Brittania', 'Egypt', 'Hispania', 'Numidia'];

const occupations = ['Farmer', 'Blacksmith', 'Tailor', 'Soldier', 'Sailor', 'Slave', 'Construction Worker', 'Pleb', 'Artist'];

// Generates a random gladiator within the given bounds
export const generateGladiator = (minLvl, maxLvl) => {
  const gladiator = {};
  gladiator.origin = getRandomOrigin();
  gladiator.name = getRandomName(gladiator.origin);
  gladiator.formerOccupation = getRandomOccupation();
  const level = getRandomInt(minLvl, maxLvl);
  gladiator.exp = levelSteps[level - 1];

  // level 1 gladiator starts with 12 stat points and gains 3 per level
  const totalStatPoints = 12 + (level - 1) * 3;

  // use normal distribution with skew to get mid points at 1/4 total, 1/3 remainder, 1/2 remainder
  const stat1 = Math.round(randn_bm(0, totalStatPoints, 2));
  const stat2 = Math.round(randn_bm(0, totalStatPoints - stat1, 1.5));
  const stat3 = Math.round(randn_bm(0, totalStatPoints - stat1 - stat2, 1));
  const stat4 = totalStatPoints - stat1 - stat2 - stat3;
  
  // randomly shuffle the generated stats
  let [str, sta, dex, agi] = knuthShuffle([stat1, stat2, stat3, stat4]);

  // TODO: Want to weight stats based on origin, e.g. str and sta are top stats for germania (barbarian)?
  gladiator.str = str;
  gladiator.sta = sta;
  gladiator.dex = dex;
  gladiator.agi = agi;
  gladiator.morale = 5;
  gladiator.restDays = 0;
  return gladiator;
};

export function getGladiatorLevel(exp) {
  return _.findIndex(levelSteps, x => x >= exp) + 1;
}

function getRandomName(origin) {
  // TODO: generate appropriate name given the origin
  return barbarian(1)[0];
}

function getRandomOrigin() {
  return originCountries[getRandomInt(0, originCountries.length - 1)];
}

function getRandomOccupation() {
  return occupations[getRandomInt(0, occupations.length - 1)];
}

let nm1 = ['ae', 'au', 'ei', 'a', 'e', 'i', 'o', 'u', 'a', 'e', 'i', 'o', 'u', 'a', 'e', 'i', 'o', 'u']; 
let nm2 = ['', '', '', 'b', 'bl', 'br', 'bh', 'd', 'dr', 'dh', 'f', 'fr', 'g', 'gh', 'gr', 'gl', 'h', 'hy', 'hr', 'j', 'k', 'kh', 'kr', 'l', 'll', 'm', 'n', 'p', 'pr', 'r', 'rh', 's', 'sk', 'sg', 'sm', 'sn', 'st', 't', 'th', 'thr', 'ty', 'v', 'y']; 
let nm3 = ['bl', 'br', 'd', 'db', 'dbr', 'dd', 'ddg', 'dg', 'dl', 'dm', 'dr', 'dv', 'f', 'fd', 'fgr', 'fk', 'fl', 'fn', 'fr', 'fst', 'fv', 'g', 'gb', 'gd', 'gf', 'gg', 'ggv', 'gl', 'gn', 'gr', 'gss', 'gv', 'k', 'kk', 'l', 'lb', 'lc', 'ld', 'ldr', 'lf', 'lfr', 'lg', 'lgr', 'lk', 'll', 'llg', 'llk', 'llv', 'lm', 'ln', 'lp', 'lr', 'ls', 'lsk', 'lsn', 'lst', 'lsv', 'lt', 'lv', 'm', 'md', 'mk', 'ml', 'mm', 'ms', 'n', 'nb', 'nd', 'ndr', 'ng', 'nl', 'nn', 'nng', 'nr', 'nsk', 'nt', 'nv', 'nw', 'p', 'pl', 'pp', 'pr', 'r', 'rb', 'rd', 'rdg', 'rf', 'rg', 'rgr', 'rk', 'rkm', 'rl', 'rls', 'rm', 'rn', 'rng', 'rngr', 'rnh', 'rnk', 'rns', 'rnv', 'rr', 'rst', 'rt', 'rth', 'rtm', 'rv', 's', 'sb', 'sbr', 'sg', 'sgr', 'sk', 'sl', 'sm', 'sn', 'sr', 'ssk', 'st', 'stm', 'str', 'sv', 't', 'tg', 'th', 'thg', 'thn', 'thr', 'thv', 'tm', 'tr', 'tt', 'ttf', 'tv', 'v', 'yv', 'z', 'zg', 'zl', 'zn']; 
let nm4 = ['d', 'dr', 'f', 'g', 'kr', 'k', 'l', 'ld', 'lf', 'lk', 'll', 'lr', 'm', 'mm', 'n', 'nd', 'nn', 'r', 'rd', 'rn', 'rr', 's', 'th', 't']; 
let nm5 = ['', '', '', 'b', 'br', 'bh', 'ch', 'd', 'dh', 'f', 'fr', 'g', 'gh', 'gr', 'gw', 'gl', 'h', 'j', 'k', 'kh', 'm', 'n', 'r', 'rh', 's', 'sh', 'st', 'sv', 't', 'th', 'thr', 'tr', 'v', 'w']; 
let nm6 = ['ae', 'ea', 'ie', 'ei', 'io', 'a', 'e', 'i', 'o', 'u', 'a', 'e', 'i', 'o', 'u', 'a', 'e', 'i', 'o', 'u', 'a', 'e', 'i', 'o', 'u', 'a', 'e', 'i', 'o', 'u']; 
let nm7 = ['bj', 'c', 'd', 'dd', 'df', 'dl', 'dr', 'f', 'ff', 'fl', 'fn', 'fr', 'fth', 'g', 'gd', 'gm', 'gn', 'gnh', 'gr', 'h', 'hh', 'k', 'l', 'ld', 'lf', 'lfh', 'lg', 'lgr', 'lh', 'lk', 'll', 'lm', 'lr', 'ls', 'lv', 'm', 'mm', 'n', 'nd', 'ndr', 'ng', 'ngr', 'ngv', 'nh', 'nl', 'nn', 'nnh', 'nr', 'ns', 'nt', 'nv', 'r', 'rd', 'rf', 'rg', 'rgh', 'rgr', 'rh', 'rk', 'rl', 'rm', 'rn', 'rnd', 'rng', 'rr', 'rst', 'rt', 'rth', 'rtr', 'rv', 's', 'sb', 'sd', 'sg', 'sh', 'sl', 'st', 'stn', 'str', 'sv', 't', 'thr', 'tk', 'tr', 'tt', 'tth', 'v', 'y', 'yj', 'ym', 'yn']; 
let nm8 = ['', '', '', '', 'f', 'g', 'h', 'l', 'n', 'nn', 's', 'sh', 'th', 'y']; 
let br = ''; 

export function barbarian(tp) {
  let name = '';
  let names = [];
  let rnd, rnd2, rnd3, rnd4, rnd5, rnd6, rnd7;
  for (let i = 0; i < 10; i++) {
    if (tp === 1) {
      rnd = Math.floor(Math.random() * nm5.length); rnd2 = Math.floor(Math.random() * nm6.length); rnd3 = Math.floor(Math.random() * nm8.length); if (i < 3) {
        while (rnd < 5) {
          rnd = Math.floor(Math.random() * nm5.length);
        }
        name = nm5[rnd] + nm6[rnd2] + nm8[rnd3];
      } else if (i < 8) {
        rnd4 = Math.floor(Math.random() * nm6.length); if (rnd2 < 5) {
          while (rnd4 < 5) {
            rnd4 = Math.floor(Math.random() * nm6.length);
          }
        }
        rnd5 = Math.floor(Math.random() * nm7.length); 
        name = nm5[rnd] + nm6[rnd2] + nm7[rnd5] + nm6[rnd4] + nm8[rnd3];
      } else {
        rnd4 = Math.floor(Math.random() * nm6.length); if (rnd2 < 5) {
          while (rnd4 < 5) {
            rnd4 = Math.floor(Math.random() * nm6.length);
          }
        }
        rnd5 = Math.floor(Math.random() * nm7.length); rnd6 = Math.floor(Math.random() * nm6.length); if (rnd2 < 5 || rnd4 < 5) {
          while (rnd6 < 5) {
            rnd6 = Math.floor(Math.random() * nm6.length);
          }
        }
        rnd7 = Math.floor(Math.random() * nm7.length); 
        name = nm5[rnd] + nm6[rnd2] + nm7[rnd5] + nm6[rnd4] + nm7[rnd7] + nm6[rnd6];
      }
    } else {
      rnd = Math.floor(Math.random() * nm2.length); rnd2 = Math.floor(Math.random() * nm1.length); rnd3 = Math.floor(Math.random() * nm4.length); 
      if (i < 3) {
        name = nm2[rnd] + nm1[rnd2] + nm4[rnd3];
      } else if (i < 8) {
        rnd4 = Math.floor(Math.random() * nm1.length); if (rnd < 3) {
          while (rnd4 < 3) {
            rnd4 = Math.floor(Math.random() * nm1.length);
          }
        }
        rnd5 = Math.floor(Math.random() * nm3.length); 
        name = nm2[rnd] + nm1[rnd2] + nm3[rnd5] + nm1[rnd4] + nm4[rnd3];
      } else {
        rnd4 = Math.floor(Math.random() * nm1.length); if (rnd < 3) {
          while (rnd4 < 3) {
            rnd4 = Math.floor(Math.random() * nm1.length);
          }
        }
        rnd5 = Math.floor(Math.random() * nm3.length); rnd6 = Math.floor(Math.random() * nm1.length); if (rnd < 3 || rnd4 < 3) {
          while (rnd6 < 3) {
            rnd6 = Math.floor(Math.random() * nm1.length);
          }
        }
        rnd7 = Math.floor(Math.random() * nm3.length); 
        name = nm2[rnd] + nm1[rnd2] + nm3[rnd5] + nm1[rnd4] + nm3[rnd7] + nm1[rnd6] + nm4[rnd3];
      }
    }
    names.push(name);
  }
  return names;
}

// total exp required at each level, 1-50. This is based on an exponential growth curve
export const levelSteps = [0, 105, 315, 631, 1056, 1605, 2277, 3066, 3988, 5035, 6211, 7539, 8990, 10563, 12277, 14160, 16189, 18403, 20774, 23315, 26004, 28974, 32108, 35425, 38946, 42705, 46721, 51104, 55666, 60568, 65696, 71183, 77088, 83329, 89857, 96768, 104184, 112000, 120185, 128761, 137815, 147245, 157325, 168075, 179515, 191665, 204545, 218175, 232575, 248255];

// Could include a little bio about where the gladiator was originally from.
const germaniaCities = ['Xanten', 'Neuss', 'Cologne', 'Bonn', 'Andernach', 'Koblenz', 'Trier', 'Mainz', 'Worms', 'Speyer', 'Augsburg', 'Allgäu'];
const romanCities = ['Roma', 'Ariminum', 'Belum', 'Placentia', 'Mod', 'Salernum', 'Bononia', 'Forum Livii', 'Regium Lepidi', 'Aquileia', 'Massa', 'Pistoria', 'Florentia', 'Pons Drusi'];
const frenchCities = ['Calais', 'Paris', 'Bordeaux', 'Metz', 'Toulon', 'Bourges', 'Avignon', 'Marseille', 'Argentoratum', 'Divodurum', 'Vesontio'];
/*

*/
