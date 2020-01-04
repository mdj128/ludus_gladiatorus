import React, { useState, useEffect } from 'react';

function Gladiator(props) {
  const { name, lvl, sta, str, dex, agi, weapon, ac } = props;

  return (
    <div>
      <table>
        <tr>
          <td>{name}</td>
        </tr>
        <tr>
          <td>Level:</td>
          <td>{lvl}</td>
        </tr>
        <tr>
          <td>Strength:</td>
          <td>{str}</td>
        </tr>
        <tr>
          <td>Dexterity:</td>
          <td>{dex}</td>
        </tr>
        <tr>
          <td>Agility:</td>
          <td>{agi}</td>
        </tr>
        <tr>
          <td>Stamina:</td>
          <td>{sta}</td>
        </tr>
      </table>
    </div>
  );
}

export default Gladiator;
