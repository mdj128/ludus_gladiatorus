import React, { useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import './App.css';
import { simulateBattle, calculateDamage } from './battle';

function StatSlider(props) {
  const { name, val, update } = props;
  return (
    <tr>
      <td>{name}</td>
      <input type="range" min="1" max="50" value={val} onClick={e => update(name, e.target.value)} 
        onChange={e => update(name, e.target.value)} />
      <td>{val}</td>
    </tr>
  );
}

function App() {
  const [p1, setp1] = useState({ name: 'Spartacus', lvl: 10, sta: 5, str: 5, dex: 5, agi: 5, weapon: 5, ac: 5 });
  const [p2, setp2] = useState({ name: 'Gannicus', lvl: 10, sta: 5, str: 5, dex: 5, agi: 5, weapon: 5, ac: 5 });

  const [p1WinPct, setp1WinPct] = useState(simulateBattle(p1, p2));

  const updatep1 = (name, value) => {
    setp1({ ...p1, [name]: value });
    setp1WinPct(simulateBattle(p1, p2));
  };

  const updatep2 = (name, value) => {
    setp2({ ...p2, [name]: value });
    setp1WinPct(simulateBattle(p1, p2));
  };

  const updateDmg = () => {
    const n = 10000;
    const rawValues = [];
    for (let i = 0; i < n; i++) {
      rawValues.push(calculateDamage(p1, p2));
    }
    rawValues.sort((a, b) => a - b);

    const data = {};
    const min = rawValues[0];
    const max = rawValues[n - 1];

    // Seed data with a bunch of 0s
    for (let i = min; i < max; i++) {
      data[i] = 0;
    }
    
    rawValues.forEach(v => {
      data[v]++;
    });

    // Count number of samples at each increment
    let hc_data = [];
    for (const [key, val] of Object.entries(data)) {
      hc_data.push({ 'x': parseFloat(key), 'y': val / n });
    }

    setDmgData(hc_data);
  };

  const [dmgData, setDmgData] = useState([1, 2, 3]);

  const options = { 
    title: {
      text: 'Normal Distribution',
    },
    yAxis: {
      title: {
        text: 'Percentage chance',
      },
    },
    plotOptions: {
    },
    series: [{
      name: 'Percent chance',
      data: dmgData,
    }] };


  
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
      <div>
        <button onClick={updateDmg}>Damage Avg</button>
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
}

export default App;
