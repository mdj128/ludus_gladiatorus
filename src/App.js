import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import './App.css';
import { simulateBattle, getMaxHp } from './battle';
import { generateGladiator } from './gladiatorGen';

import GladiatorView from './components/Gladiator';
import PixiContainer from './pixi/PixiContainer';

function StatSlider(props) {
  const { name, val, update } = props;
  return (
    <tr>
      <td>{name}</td>
      <input
        type="range"
        min="0"
        max="50"
        value={val}
        onClick={e => update(name, e.target.value)}
        onChange={e => update(name, e.target.value)}
      />
      <td>{val}</td>
    </tr>
  );
}

function DamageDistributionChart(props) {
  const { name, data } = props;
  const options = {
    chart: {
      height   : 300,
      width    : 450,
      animation: false,
    },
    title: {
      text: `${name} damage distribution`,
    },
    series: [
      {
        name: 'Percent chance',
        data,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

function App() {
  const [p1, setp1] = useState({
    name  : 'Spartacus',
    lvl   : 1,
    sta   : 2,
    str   : 3,
    dex   : 2,
    agi   : 3,
    weapon: 5,
    ac    : 5,
  });
  const [p2, setp2] = useState({
    name  : 'Gannicus',
    lvl   : 1,
    sta   : 2,
    str   : 3,
    dex   : 2,
    agi   : 3,
    weapon: 5,
    ac    : 5,
  });

  const [randomGladiator, setRandomGladiator] = useState(
    generateGladiator(1, 50)
  );
  const [gladMin, setGladMin] = useState(1);
  const [gladMax, setGladMax] = useState(50);

  const updateRandomGladiator = () => {
    setRandomGladiator(generateGladiator(gladMin, gladMax));
  };

  const [p1DmgData, setp1DmgData] = useState([]);
  const [p2DmgData, setp2DmgData] = useState([]);

  const [battleResult, setBattleResult] = useState({});

  useEffect(() => {
    const result = simulateBattle(p1, p2, 10000);
    setBattleResult(result);
    const p1Dmg = [];
    const p2Dmg = [];
    result.logs.forEach(l => {
      if (l.name === p1.name) {
        p1Dmg.push(l.dmg);
      } else {
        p2Dmg.push(l.dmg);
      }
    });
    setp1DmgData(getHcData(p1Dmg));
    setp2DmgData(getHcData(p2Dmg));
  }, [p1, p2]);

  const updatep1 = (name, value) => {
    setp1({ ...p1, [name]: value, lvl: getLevel(p1) });
  };

  const updatep2 = (name, value) => {
    setp2({ ...p2, [name]: value, lvl: getLevel(p2) });
  };

  const getHcData = rawValues => {
    rawValues.sort((a, b) => a - b);

    const data = {};
    const min = rawValues[0];
    const max = rawValues[rawValues.length - 1];

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
      hc_data.push({ x: parseFloat(key), y: val / rawValues.length });
    }
    return hc_data;
  };

  // level 1 starts with 10 stat points and gains 3 per level.
  // given the current player's stats, this will return what level they would need to be to have those.
  const getLevel = p => {
    return Math.ceil(
      1 +
        (Number(p.sta) + Number(p.str) + Number(p.dex) + Number(p.agi) - 10) / 3
    );
  };

  return (
    <div>
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
            <tr>
              <td>{`hp: ${getMaxHp(p1)}`}</td>
            </tr>
            <tr>
              <td>{`lvl: ${getLevel(p1)}`}</td>
            </tr>
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
            <tr>
              <td>{`hp: ${getMaxHp(p2)}`}</td>
            </tr>
            <tr>
              <td>{`lvl: ${getLevel(p2)}`}</td>
            </tr>
          </td>
        </tr>
        <tr>
          <td>
            <div>{`${p1.name} win: ${battleResult[p1.name]}%`}</div>
            <div>{`${p2.name} win: ${battleResult[p2.name]}%`}</div>
          </td>
        </tr>
        <tr>
          <td>
            <DamageDistributionChart name={p1.name} data={p1DmgData} />
          </td>
          <td>
            <DamageDistributionChart name={p2.name} data={p2DmgData} />
          </td>
        </tr>
      </table>
      <div>
        <button onClick={updateRandomGladiator}>New Gladiator</button>
        <input onChange={e => setGladMin(e.target.value)} value={gladMin} />
        <input onChange={e => setGladMax(e.target.value)} value={gladMax} />
      </div>
      <GladiatorView {...randomGladiator} />
      <PixiContainer />
    </div>
  );
}

export default App;
