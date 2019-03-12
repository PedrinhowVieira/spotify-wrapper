/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { searchAlbums } from '../src/main';

global.fetch = require('node-fetch');

const albums = searchAlbums('Drake');

albums.then(data => data.albums.items.map(item => console.log(item.name)));
