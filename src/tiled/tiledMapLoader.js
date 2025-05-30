import * as tmx from 'tmx-parser';

export default function tileMapLoader(loader, resource) {
  return new Promise((res, rej) => {
    if (!resource.data) {
      rej(new Error('No data provided'));
      return;
    }

    // Parse the XML data if it's a string
    let xmlData = resource.data;
    if (typeof xmlData === 'string') {
      const parser = new DOMParser();
      xmlData = parser.parseFromString(xmlData, 'text/xml');
    }

    // Check if it's a valid TMX file
    if (!xmlData || !xmlData.getElementsByTagName('tileset')) {
      rej(new Error('Invalid TMX file'));
      return;
    }

    // Get directory from URL without using path module
    const url = new URL(resource.url, window.location.origin);
    const pathParts = url.pathname.split('/');
    pathParts.pop(); // Remove filename
    const route = pathParts.join('/');

    tmx.parse(resource.data, route, (err, map) => {
      if (err) {
        rej(err);
        return;
      }

      // No need to preload images in modern browsers - they can be loaded on demand
      resource.route = route;
      resource.data = map;
      res();
    });
  });
}
