import React from 'react';
import { Container, Sprite } from '@pixi/react';

export default ({ layer, route }) => <Container alpha={layer.opacity}>
  {layer.image && layer.image.source && <Sprite 
    source={`${route}/${layer.image.source}`}
  />}
</Container>;
