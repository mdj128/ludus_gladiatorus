import _ from 'lodash';
import { getRandomInt } from './statHelpers';
import { generateGladiator } from './gladiatorGen';

// It is the year 50BC. 21 years ago, with discipline breaking down, Spartacus brought 
// the remaining of his army on the oncoming legions. In his last stand, the Battle of the Siler River the vast majority of his men 
// were killed on the battlefield. All ancient historians stated that Spartacus was also killed in the same battle. However, his body
// was never found...

// Back in Rome, and throughout the Empire, gladiator games continue to be extremely popular, and lucrative for those
// that choose to risk everything they have on running a Ludus. You've led a mediocre life as a merchant, but have always
// had a passion for the games, and although it was many decades ago your memories of Spartacus in the arena are still as vivid
// as if they had happened just yesterday. With no family or any legacy to leave behind, you yearn for more, some higher purpose in life. 
// As fate would have it, one day you see a papyrus scroll advertising an old abandoned Ludus for sale. Your life savings are just enough
// to make the purchase. Before you can change your mind, you track down the seller and make the purchase. This is what you were meant
// to be. this is when your life truly begins.

// As you look around the Ludus you've purchased, your gut sinks in realization that you may have just made the worst mistake of your life.
// Just then, you hear a pounding at the front gates. You rush and open them up, and in front of you stands a tall muscular man.
// "Dominus! Are you the owner of this Ludus?"
// "Yes.." you reply hesitantly.
// "I have travelled here in search of glory. None of the other Domini will take me. I have trained hard, this is what I was meant to be.
// will you take me as a gladiator?"
// You look the man over. You need gladiators. How were you even going to be able to do this?
// "Yes!" you sputter. "Yes, you may join. But you should know, you will be my first gladiator. And I will need your loyalty. Together
// we will do many great things."

// Enter starter gladiator creation mode: level 1, 12 stat points to spend. Can choose portrait, origin, etc.

// After creation finishes, enter dialog:
// Gladiator: "By the way, I didn't even ask, what is your name, Dominus?"
// Prompt to enter name, which will become house of [x] on the main Ludus screen

// Gladiator: "It's great to meet you. Thank you for believing in me. I've found some old equipment down here in the training
// storage room. Just tell me what to do. I am ready to fight for our house!"


// This file will contain methods and object specs from the Ludus (contains everything) all the way down to its gladiators, their stats, their items, etc.
// Every object in the hierarchy should contain basic properties only, no functions or circular references. That way,
// the ludus object can be serialized as json. Doing this all by hand right now, eventually we could use redux, react context,
// etc. Just trying to keep it simple as long as possible. Serialization could just go into local storage to start.

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
  name                : 'Batiatus', // displayed as House of [dominus]
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
  lvl             : 1, // this is actually never going to be here, just going to calculate based on how much exp and the level steps
  exp             : 0, // 
  str             : 3, // level 1 starts with 12 stat points.
  sta             : 3,
  dex             : 2,
  agi             : 4,
  int             : 5, // maybe affects levelling speed? not used anywhere yet
  weapon          : {},
  head            : {},
  chest           : {},
  legs            : {},
  restDays        : 0, // after a match, gladiator needs x number of days of rest before he can fight or train again
  morale          : 5, // maybe 1-10? drops after loss, increases after win. can also increase with wine/women/food/etc. TBD - needs factored into combat, maybe exp gain too
  dailyAction     : '', // what the gladiator is assigned to do today (rest, train, fight in a match)
};

const Armor = {
  type  : 'head', // legs, chest
  ac    : 1,
  name  : 'Cloth Hat',
  minLvl: 1,
};

const Weapon = {
  damage     : 5,
  name       : 'Wooden Sword',
  cost       : 5,
  sellValue  : 3,
  requiredLvl: 1, // might need to restrict weapons by min level? otherwise could be OP to hand a low level gladiator a super high level sword
};

// ways to gain exp: Fighting in the arena. A win gets you from the list below. A loss, maybe 1/2 or 1/3?
// note: there should be a penalty for winning against a significantly lower opponent, and a bonus for beating a higher level opponent

// exp gained for defeating a gladiator at each level, 1-50
// this is scaled to require 2 even con wins to go from level 1 to 2, all the way up to 14 even con wins to go from 49 to 50
// it's not exactly linear, but close (slightly steeper in earlier levels, more shallow in later levels)
// this pairs with the exponential exp required per level
export const expGained = [53, 70, 105, 106, 137, 168, 158, 184, 209, 235, 221, 242, 262, 286, 269, 290, 316, 339, 318, 336, 371, 392, 415, 391, 418, 446, 487, 507, 490, 513, 549, 591, 624, 593, 628, 674, 711, 744, 715, 755, 786, 840, 896, 880, 935, 991, 1048, 1108, 1120, 1167];
