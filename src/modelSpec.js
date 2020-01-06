import _ from 'lodash';
import { getRandomInt } from './statHelpers';
import { generateGladiator } from './gladiatorGen';

export const getNewLudus = () => {
  const ludus = { ...Ludus };
  return ludus;
};

export const generateCalendar = (ludus, numDays) => {
  const avgGladiatorLvl = ludus.gladiators.length > 0 ? _.sumBy(ludus.gladiators, 'lvl') / ludus.gladiators.length : 1;
  const minGladiatorLvl = ludus.gladiators.length > 0 ? _.minBy(ludus.gladiators, 'lvl') / ludus.gladiators.length : 1;
  const maxGladiatorLvl = ludus.gladiators.length > 0 ? _.maxBy(ludus.gladiators, 'lvl') / ludus.gladiators.length : 1;
  for (let i = 0; i < numDays; i++) {
    const day = { ... Day };
    day.id = ludus.days.length ? (ludus.days[ludus.days.length - 1].id + 1) % 7 : 1;
    const numEvents = getRandomInt(1, 4);
    for (let j = 0; j < numEvents; j++) {
      const event = { ...Event };
      const numMatches = getRandomInt(2, 5);
      
      // const lowEndMatch = generateMatch(ludus, lvl);

      for (let k = 0; k < numMatches; k++) {
        
      }
    }
  }
};

export const generateMatch = (ludus, minLvl, maxLvl) => {
  const match = { ...Match };
  match.opponent = generateGladiator(minLvl, maxLvl);
  match.winPayout = 10;

  // opponent       : {}, // Gladiator to fight against. Note: it might be fun to not auto-generate these every time, but keep a running collection of them that level up over time so that the player regularly sees them as they level up their ludus.
  // contender      : null, // Player assigned gladiator to fight
  // winPayout      : 10,
  // losePayout     : 5,
  // winExp         : 5,
  // loseExp        : 2,
  // sacrificePayout: 20, // You can choose to sacrifice a gladiator in a match, payout is high, but you lose a gladiator
  // prestigeGain   : 5, // If you win this is how much prestige you'll gain.

};

const Ludus = {
  name                : 'My Ludus', 
  prestige            : 1, // increase by winning matches, paying off politicians/dignitaries
  gladiators          : [], 
  capacity            : 5, // maybe max starts out at 5, and you can upgrade to hold more gladiators
  denarii             : 100,
  medLevel            : 1, // Affects daily cost, improves recovery speed
  trainingGroundsLevel: 1, // Affects daily cost, improves training speed
  doctore             : {}, // you can turn any of your gladiators into a doctore, improves training speed, morale, etc.
  dailyCost           : 1, // this will need to be based on a number of variables: servants, gladiators, levels of ludus categories
  nutritionLevel      : 1, // Meager, Simple, Standard, Fulfilling, Extravagant. Affects daily cost, improves morale, training, recovery, etc.
  inventory           : [], // extra items that are not equipped on anyone
  calendar            : {},
  market              : {},
};

const Calendar = {
  days        : [], // the first item in this list is always the current day. generate a week at a time? or a rolling 7 days forward? or just have 1 day at a time?
  currentMonth: 1, // 1-12, latin month names?
};

const Day = {
  id    : 1, // 1-7 days of the week, monday through sunday in latin? dies Lunae, Martis, Mercurii, Jovis, Venĕris, Saturni, Solis
  events: [],
};

// Each day on the calendar has a chance for gladiator events. These are generated at the beginning of each week.
// Each has an entry fee, once paid you can sign up as many of your gladiators as you want to
const Event = {
  type    : '', // tbd?
  matches : [], // list of open matches that can be signed up for
  level   : 1, // dictates level of generated opponent, entry fee, payout, etc.
  entryFee: 20,
};

const Match = {
  opponent       : {}, // Gladiator to fight against. Note: it might be fun to not auto-generate these every time, but keep a running collection of them that level up over time so that the player regularly sees them as they level up their ludus.
  contender      : null, // Player assigned gladiator to fight
  winPayout      : 10,
  losePayout     : 5,
  winExp         : 5,
  loseExp        : 2,
  sacrificePayout: 20, // You can choose to sacrifice a gladiator in a match, payout is high, but you lose a gladiator
  prestigeGain   : 5, // If you win this is how much prestige you'll gain.
};

const Market = {
  forge    : {}, // sells weapons
  armory   : {}, // sells armor
  carpenter: {}, // can buy upgrades to ludus
  bank     : {}, // can go here to take out loans
  auctions : [], // market for slaves/gladiators, maybe player can view all tiers, but only purchase based on their prestige level?
};

// How do the items
const Forge = {
  weapons: [],
  buyBack: [],
};

const Armory = {
  armor  : [],
  buyBack: [],
};

const Carpenter = {
  
};

const Auction = {
  tier  : 1, // 1-10? Can be named, e.g. 1 - Cheap Untrained Slaves, 10 - Advanced Fighters
  slaves: [], // list of gladiators/slaves for sale
};

const Gladiator = {
  name            : '',
  origin          : '',
  formerOccupation: '', // could be blacksmith, farmer, soldier, etc. impacts stats maybe?
  specialization  : '', // weapon specialization, gives bonus if they use the right one?
  lvl             : 1,
  exp             : 0, // Is lvl prop required if this determines it?
  str             : 5,
  sta             : 5,
  dex             : 5,
  agi             : 5,
  int             : 5, // maybe affects levelling speed?
  weapon          : {},
  head            : {},
  chest           : {},
  legs            : {},
  restDays        : 0, // after a match, gladiator needs x number of days of rest before he can fight again
  morale          : 5, // maybe 1-10? drops after loss. can increase with wine/women/food/etc.
  dailyAction     : '', // what the gladiator is assigned to do today (rest, train, fight in a match)
};

const Armor = {
  type  : 'head', // legs, chest
  ac    : 1,
  name  : 'Cloth Hat',
  minLvl: 1,
};

const Weapon = {
  damage   : 5,
  name     : 'Wooden Sword',
  cost     : 5,
  sellValue: 3,
  minLvl   : 1,
};

// total exp required at each level, 1-50. This is based on an exponential growth curve
export const levelSteps = [0, 105, 315, 631, 1056, 1605, 2277, 3066, 3988, 5035, 6211, 7539, 8990, 10563, 12277, 14160, 16189, 18403, 20774, 23315, 26004, 28974, 32108, 35425, 38946, 42705, 46721, 51104, 55666, 60568, 65696, 71183, 77088, 83329, 89857, 96768, 104184, 112000, 120185, 128761, 137815, 147245, 157325, 168075, 179515, 191665, 204545, 218175, 232575, 248255];

// exp gained for defeating a gladiator at each level, 1-50
// this is scaled to require 2 even con wins to go from level 1 to 2, all the way up to 14 even con wins to go from 49 to 50
export const expGained = [53, 70, 105, 106, 137, 168, 158, 184, 209, 235, 221, 242, 262, 286, 269, 290, 316, 339, 318, 336, 371, 392, 415, 391, 418, 446, 487, 507, 490, 513, 549, 591, 624, 593, 628, 674, 711, 744, 715, 755, 786, 840, 896, 880, 935, 991, 1048, 1108, 1120, 1167];
