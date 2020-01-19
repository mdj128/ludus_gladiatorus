import React, { useRef, useState, useEffect } from 'react';

import { Stage } from '@inlet/react-pixi';

import './pixi.scss';
import TiledMapContainer from '../tiled/TiledMapContainer';

const tiledPath = 'static/tiled/Qeynos.tmx';

export default () => {
  const mapRef = useRef(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [scale, setScale] = useState(1);

  const onMouseMove = e => {
    // Mouse 1 is down
    if (e.buttons === 1) {
      setOffsetX(offsetX + e.movementX);
      setOffsetY(offsetY + e.movementY);
    }
  };

  const onWheel = e => {
    e.stopPropagation();
    setScale(Math.min(Math.max(0.125, (scale + (e.deltaY * -0.01))), 4));
  };

  useEffect(() => {
    console.log(mapRef);
  }, [mapRef]);
  return <div 
    onWheel={onWheel}
    onMouseMove={onMouseMove}
    className="pixi-container">
    <Stage options={{ backgroundColor: 0xeef1f5 }}>
      <TiledMapContainer ref={mapRef} tiledPath={tiledPath} scale={scale} x={offsetX} y={offsetY} />
    </Stage>
  </div>;
};
