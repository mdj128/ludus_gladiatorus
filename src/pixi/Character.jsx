import React, { useState, useEffect, useRef } from 'react';
// import SpriteAnimated from './SpriteAnimated';
import { Texture, SCALE_MODES, Rectangle } from 'pixi.js';
import { Sprite } from '@pixi/react';

// Extend this later to be more configurable
// Also want to use SpriteAnimated here -- figure out why that isn't working
export default ({ x, y, imageUrl }) => {
  const [texture, setTexture] = useState(null);
  const spriteRef = useRef(null);
  useEffect(() => {
    const baseTexture = Texture.from(imageUrl);
    baseTexture.source.scaleMode = SCALE_MODES.NEAREST;
    setTexture(new Texture({
      source: baseTexture.source,
      frame: new Rectangle(0, 0, 40, 50)
    }));

  }, [imageUrl]);

  useEffect(() => {
    if (spriteRef && spriteRef.current) {
      spriteRef.current.on('click', (...args) => {
        // We can do stuff when any element is clicked
        // including our own character.
      });
    }
    
  }, [spriteRef, spriteRef.current]);

  return texture && <Sprite 
    interactive={true}
    ref={spriteRef}
    texture={texture}
    x={x}
    y={y}
    anchor={0.5}
  />;
}
;
