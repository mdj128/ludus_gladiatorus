import React, { useState } from 'react';
import './App.css';
import { simulateBattle } from './battle';

function StatSlider(props) {
  const { name, val, update } = props;
  return (
    <tr>
    <td>{name}</td>
    <input type="range" min="1" max="50" value={val} onChange={e => update(name, e.target.value)}  />
    <td>{val}</td>
  </tr>
  );
}

function App() {
  const [p1, setp1] = useState({ name: 'Spartacus', lvl: 10, sta: 5, str: 5, dex: 5, agi: 5, weapon: 5, ac: 5 });
  const [p2, setp2] = useState({ name: 'Gannicus', lvl: 10, sta: 5, str: 5, dex: 5, agi: 5, weapon: 5, ac: 5 });

  const [p1WinPct, setp1WinPct] = useState(simulateBattle(p1, p2));

  const updatep1 = (name, value) => {
    setp1({...p1, [name]: value });
    setp1WinPct(simulateBattle(p1, p2));
  };

  const updatep2 = (name, value) => {
    setp2({...p2, [name]: value });
    setp1WinPct(simulateBattle(p1, p2));
  };
  
  // level 1 starts with 20 stat points and gains 5 per level.
  // given the current player's stats, this will return what level they would need to be to have those.
  const getLevel = p => {
    return 1 + (Number(p.sta) + Number(p.str) + Number(p.dex) + Number(p.agi) - 20) / 5;
  };

  return (
    <div className="App">
      <table>
        <tr>
          <td>
          <tr>
            <td colSpan="3">{p1.name}</td>
          </tr>
          <StatSlider name="str" val={p1.str} update={updatep1} />
          <StatSlider name="dex" val={p1.dex} update={updatep1} />
          <StatSlider name="agi" val={p1.agi} update={updatep1} />
          <StatSlider name="sta" val={p1.sta} update={updatep1} />
          <StatSlider name="ac" val={p1.ac} update={updatep1} />
          <StatSlider name="weapon" val={p1.weapon} update={updatep1} />
          <tr><td>{`hp: ${100 + p1.lvl * p1.sta}`}</td></tr>
          <tr><td>{`lvl: ${getLevel(p1)}`}</td></tr>
          </td>
          <td>
          <tr>
          <td colSpan="3">{p2.name}</td>
          </tr>
          <StatSlider name="str" val={p2.str} update={updatep2} />
          <StatSlider name="dex" val={p2.dex} update={updatep2} />
          <StatSlider name="agi" val={p2.agi} update={updatep2} />
          <StatSlider name="sta" val={p2.sta} update={updatep2} />
          <StatSlider name="ac" val={p2.ac} update={updatep2} />
          <StatSlider name="weapon" val={p2.weapon} update={updatep2} />
          <tr><td>{`hp: ${100 + p2.lvl * p2.sta}`}</td></tr>
          <tr><td>{`lvl: ${getLevel(p2)}`}</td></tr>
          </td>
        </tr>
        </table>
        <div>{`${p1.name} will win: ${p1WinPct}% of the time.`}</div>
    </div>
  );
}

export default App;
