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
  getActiveDID: () => api.get('/vault/dids/_'),
  getDIDClaims: () => api.get('/vault/dids/_/claims'),
  createDID: () => api.post('/vault/dids', JSON.stringify('')),
  setActiveDIDID: id => api.put('/vault/default-did', JSON.stringify(id)),
  getActiveDIDID: () => api.get('/vault/default-did'),
  renameDIDLabel: label => api.put('/vault/dids/_/label', JSON.stringify(label)),
  changeDIDAvatar: avatar => api.put('/vault/dids/_/avatar', avatar),

  listClaims: () => api.get('/vault/claims'),
  createClaim: content => api.post('/vault/dids/_/claims', content),
  listClaimSchemas: () => api.get('/claim-schemas'),

  // SIGNING
  getClaimWitnessMessage: claimId => api.get(`/vault/dids/_/claims/${claimId}/witness-request`),
  signClaim: payload => api.post('/vault/dids/_/sign-claim', payload),
  importClaimWitnessMessage: (claimId, signature) => api.put(`/vault/dids/_/claims/${claimId}/witness-signature`, signature),
};
