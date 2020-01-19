import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from 'react';

import { Container, Graphics, useApp } from '@inlet/react-pixi';
import tileMapLoader from './tiledMapLoader';
import TileSet from './TileSet';
import TileLayer from './TileLayer';
import ImageLayer from './ImageLayer';

export default forwardRef(({ tiledPath, x, y, scale }, ref) => {
  const app = useApp();
  const [renderedOutput, setRenderedOutput] = useState(null);
  const [map, setMap] = useState(null);
  useImperativeHandle(ref, () => ({
    map,
  }));
  useEffect(() => {
    app.loader
      .add(tiledPath)
      .load(async (loader, { [tiledPath]: resource }) => {
        await tileMapLoader(loader, resource);
        const { route, data } = resource;
        setMap(data);
        const tileSets = data.tileSets.map(
          tileSet => new TileSet(route, tileSet)
        );

        const output = (
          <React.Fragment>
            <Graphics
              draw={background => {
                background.beginFill(0xff0000, 0);
                background.drawRect(
                  0,
                  0,
                  (data.width || 0) * (data.tileWidth || 0),
                  (data.height || 0) * (data.tileHeight || 0)
                );
                background.endFill();
              }}
            />

            {data.layers.map(layerData =>
              layerData.type === 'tile' ? (
                <TileLayer layer={layerData} tileSets={tileSets} />
              ) : layerData.type === 'image' ? (
                <ImageLayer layer={layerData} route={route} />
              ) : null
            )}
          </React.Fragment>
        );

        setRenderedOutput(output);
      });
  }, [tiledPath]);

  return (
    <Container scale={scale} x={x} y={y} ref={ref}>
      {renderedOutput}
    </Container>
  );
});
