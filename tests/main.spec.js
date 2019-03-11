/* eslint-disable no-unused-vars */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/main';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke Tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {
    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      context('passing one type', () => {
        const artists = search('Drake', 'artist');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Drake&type=artist');

        const albums = search('Drake', 'album');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Drake&type=album');
      });

      context('passing more than one type', () => {
        const artistsAndAlbum = search('Drake', ['artist', 'album']);
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Drake&type=artist,album');
      });
    });

    it('should return the JSON Data from the Promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('Drake', 'artist');

      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Drake');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artist1 = searchArtists('Drake');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Drake&type=artist');

      const artist2 = searchArtists('LinkinPark');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=LinkinPark&type=artist');
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch funcion', () => {
      const albums = searchAlbums('Scorpion');
      expect(fetchedStub).to.have.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album1 = searchAlbums('Scorpion');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Scorpion&type=album');

      const album2 = searchAlbums('MoreLife');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=MoreLife&type=album');
    });
  });

  describe('searchTracks', () => {
    it('should call fetch funcion', () => {
      const tracks = searchAlbums('Scorpion');
      expect(fetchedStub).to.have.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const track1 = searchTracks('Scorpion');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Scorpion&type=track');

      const track2 = searchTracks('MoreLife');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=MoreLife&type=track');
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch funcion', () => {
      const playlists = searchAlbums('Scorpion');
      expect(fetchedStub).to.have.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const playlist1 = searchPlaylists('Scorpion');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Scorpion&type=playlist');

      const playlist2 = searchPlaylists('MoreLife');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=MoreLife&type=playlist');
    });
  });
});
