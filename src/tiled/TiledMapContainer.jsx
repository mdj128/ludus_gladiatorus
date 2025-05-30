import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
  useRef,
} from 'react';

import { Container, Graphics, useApp, useTick } from '@pixi/react';
import tileMapLoader from './tiledMapLoader';
import TileSet from './TileSet';
import TileLayer from './TileLayer';
import ImageLayer from './ImageLayer';

export default forwardRef(({ tiledPath, containerProps, children, onTick }, ref) => {
  const app = useApp();
  const [renderedOutput, setRenderedOutput] = useState(null);
  const [map, setMap] = useState(null);
  const containerRef = useRef(null);

  if (onTick) {
    useTick(onTick);
  }
  
  useImperativeHandle(ref, () => ({
    map,
    container: containerRef.current,
    
  }));
  useEffect(() => {
    const loadMap = async () => {
      try {
        const response = await fetch(tiledPath);
        const text = await response.text();
        const resource = { data: text, url: tiledPath };
        
        await tileMapLoader(null, resource);
        const { route, data } = resource;
        setMap(data);
        const tileSets = data.tileSets.map(
          tileSet => new TileSet(route, tileSet)
        );

        const output = (
          <React.Fragment>
            <Graphics
              draw={background => {
                background.clear();
                background.rect(
                  0,
                  0,
                  (data.width || 0) * (data.tileWidth || 0),
                  (data.height || 0) * (data.tileHeight || 0)
                );
                background.fill({color: 0xff0000, alpha: 0});
              }}
            />

            {data.layers.map(layerData =>
              layerData.type === 'tile' ? (
                <TileLayer key={layerData.id || layerData.name} layer={layerData} tileSets={tileSets} />
              ) : layerData.type === 'image' ? (
                <ImageLayer key={layerData.id || layerData.name} layer={layerData} route={route} />
              ) : null
            )}
          </React.Fragment>
        );

        setRenderedOutput(output);
      } catch (error) {
        console.error('Failed to load tiled map:', error);
      }
    };
    
    loadMap();
  }, [tiledPath]);
  // TODO check out z index for children and come up with strategy to have overlap
  return (
    <Container {...containerProps} ref={containerRef}>
      {renderedOutput}
      {children}
    </Container>
  );
});
