import React, { useState, useEffect } from 'react';

function LudusView(props) {
  return (
    <div>{JSON.stringify(props, null, 2)}</div>
  );
}

export default LudusView;
