import React, { useState, useEffect } from 'react';
import { getGladiatorLevel } from '../gladiatorGen';

function GladiatorView(props) {
  const { name, origin, exp, sta, str, dex, agi, restDays, morale } = props;

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td colSpan="2">{name}</td>
          </tr>
          <tr>
            <td>Origin:</td>
            <td>{origin}</td>
          </tr>
          <tr>
            <td>Level:</td>
            <td>{getGladiatorLevel(exp)}</td>
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
        </tbody>
      </table>
    </div>
  );
}

export default GladiatorView;
