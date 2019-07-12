import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

const api = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  crossDomain: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  generateVault: () => api.post('/bip39'),
  validatePhrase: phrase => api.post('/bip39/validate-phrase', phrase),
  initVault: phrase => api.post('/vault', phrase),
  listDIDs: () => api.get('/vault/dids'),
  getDID: didId => api.get(`/vault/dids/${didId}`),
  createDID: () => api.post('/vault/dids'),
  renameDIDAlias: (didId, alias) => api.put(`/vault/dids/${didId}/alias`, alias),
  changeDIDAvatar: (didId, avatar) => api.put(`/vault/dids/${didId}/avatar`, avatar),
  // listClaims: () => api.get('/claims'), TODO
  listClaims: () => Promise.resolve({
    data: [{
      did: {
        id: 'IezbeWGSY2dqcUBqT8K7R14xr',
        alias: 'Trinity',
      },
      id: 'McL9746fWtE9EXV5',
      alias: 'age-of',
      properties: {
        age: 42,
      },
      witnesses: [
        { did: { id: 'eWGSY2dqcUBqT8K7', alias: 'someone 1' }, signed: true },
        { did: { id: '746fWtE9EXV5q23d', alias: 'someone 2' }, signed: true },
      ],
    },
    {
      did: {
        id: 'IezbeWGSY2dqcUBqT8K7R143r',
        alias: 'Neo',
      },
      id: 'McL9746fWtE9EXV2',
      alias: 'fullname',
      properties: {
        firstname: 'Thomas',
        title: 'Mr.',
        lastname: 'Anderson',
      },
      witnesses: [
        { did: { id: 'eWGSY2dqcUBqT8K7', alias: 'someone 1' }, signed: false },
        { did: { id: '746fWtE9EXV5q23d', alias: 'someone 2' }, signed: true },
      ],
    },
    ],
  }),
  createClaim: () => Promise.resolve(),
  listClaimSchemas: () => api.get('/claim-schemas'),
};
