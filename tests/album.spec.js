/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { getAlbum, getAlbumTracks } from '../src/album';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Album', () => {
  let stubedFetch;
  let promise;
  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });
  afterEach(() => {
    stubedFetch.restore();
  });
  describe('Smoke Tests', () => {
    it('should exist the getAlbum method', () => {
      expect(getAlbum).to.exist;
    });
    it('should exist the getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });
  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');
      const album2 = getAlbum('4aawyAB9vmqN3uQ7FjRGTk');
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk');
    });
    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });
  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const albums = getAlbums('4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk');
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTk');
    });
    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const albums = getAlbums('4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk');
      expect(albums.resolveValue).to.be.eql({ album: 'name' });
    });
    describe('getAlbumTracks', () => {
      it('should call fetch method', () => {
        const tracks = getAlbumTracks();
        expect(stubedFetch).to.have.been.calledOnce;
      });
      it('should call fetch with the correct URL', () => {
        const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
        expect(stubedFetch).to.have.been
          .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');
      });
      it('should return the correct data from Promise', () => {
        promise.resolves({ album: 'name' });
        const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
        expect(tracks.resolveValue).to.be.eql({ album: 'name' });
      });
  });
});
