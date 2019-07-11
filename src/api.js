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
  generateVault: async () => api.post('/bip39'),
  validatePhrase: async phrase => api.post('/bip39/validate-phrase', phrase),
  initVault: async phrase => api.post('/vault', phrase),
  listDIDs: async () => api.get('/vault/dids'),
  getDID: async didId => api.get(`/vault/dids/${didId}`),
  createDID: async () => api.post('/vault/dids'),
  renameDIDAlias: async (didId, alias) => api.put(`/vault/dids/${didId}/alias`, alias),
  changeDIDAvatar: async (didId, avatar) => api.put(`/vault/dids/${didId}/avatar`, avatar),
  // listClaims: async () => api.get('/claims'), TODO
  listClaims: async () => Promise.resolve({
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
  createClaim: async () => Promise.resolve(),
  listClaimSchemas: async () => Promise.resolve({
    data: [
      {
        id: 'McL9746fWtE9EXV5',
        alias: 'age-over',
        content: {
          type: 'object',
          properties: {
            age: {
              type: 'number',
              min: 0,
              max: 255,
              required: true,
              description: 'Eg.: 42. Pick a number between 0 and 255',
            },
          },
        },
      },
      {
        id: 'McL9746fWtE9EXVb',
        alias: 'email-address',
        content: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              /* eslint-disable no-useless-escape */
              regex: '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
              required: true,
              description: 'Eg.: john.doe@ecorp-usa.com',
            },
          },
        },
      },
      {
        id: 'McL9746fWtE9EXVa',
        alias: 'fullname',
        content: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              maxLength: 50,
              required: false,
              description: 'eg.: Mr.',
            },
            firstName: {
              type: 'string',
              maxLength: 50,
              required: true,
              description: 'eg.: John',
            },
            middlename: {
              type: 'string',
              maxLength: 50,
              required: false,
              description: 'eg.: Canary',
            },
            lastname: {
              type: 'string',
              maxLength: 50,
              required: true,
              description: 'eg.: Doe',
            },
          },
        },
      },
    ],
  }),
};
