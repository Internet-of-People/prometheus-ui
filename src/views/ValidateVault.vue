<template>
  <div>
    <b-alert show variant="warning">
      Please enter the words you wrote down in the previous step.
    </b-alert>
    <b-row class="clear mt-4" v-if="!onVaultRestore" >
      <b-col>
        <b-form-checkbox class="cursor-pointer" name="check-button"
          v-model="validateEachWord"
          @click="validateEachWord = !validateEachWord" switch>
          VERIFY EACH WORD
        </b-form-checkbox>
      </b-col>
    </b-row>
    <MnemonicWords v-if="validateEachWord" :words="inputWords" class="clear mt-4" />
    <b-row v-else class="clear mt-4">
      <b-col v-for="(pos, index) in selectedWordsPos" :key="index">
        <b-input-group size="sm" class="mb-2">
          <b-input-group-addon>
            <b-input-group-text class="justify-content-end">
              {{ pos + 1}}
            </b-input-group-text>
          </b-input-group-addon>
          <b-form-input trim
            :ref="index" v-model="selectedWords[index]"
            @focus="fetchHintText(pos)" />
        </b-input-group>
      </b-col>
    </b-row>
    <b-row v-if="!validateEachWord">
      <b-col cols="5" sm="3" md="4" lg="4"
        v-for="(word, index) in hintWords" :key="index"
        @click="validateSelectedWord(word)" >
        <b-input-group class="mb-2">
          <b-button block size="sm"
            variant="outline-primary">
            {{ word }}
          </b-button>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="clear mt-4">
      <b-col>
        <b-alert :show="showPhraseError" variant="danger">
          The provided phrase was invalid.
        </b-alert>
        <b-alert :show="showVaultInitError" variant="danger">
          <strong>Something went wrong during vault initialization.</strong><br>
          Response from API: {{ apiError }}
        </b-alert>
        <b-button @click="goBack" variant="light" class="mr-4">BACK</b-button>
        <b-button ref="createVault" @click="createVault" variant="primary" :disabled="loading">
          CREATE VAULT
          <b-spinner small v-if="loading" />
          <fa icon="angle-right" v-if="!loading" />
        </b-button>
        <b-button variant="outline-primary" @click="demoFill" class="float-right">demo</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '@/api';
import { MnemonicWords } from '@/components';

export default {
  name: 'ValidateVault',
  components: {
    MnemonicWords,
  },
  computed: {
    ...mapGetters(['words']),
  },
  data() {
    return {
      inputWords: [],
      showPhraseError: false,
      showVaultInitError: false,
      loading: false,
      apiError: '',
      selectedWordsPos: [],
      selectedWords: [],
      validateEachWord: false,
      onVaultRestore: false,
      hintWords: [],
      currentPos: 0,
    };
  },
  beforeMount() {
    if (this.words.length) {
      this.selectedWordsPos = [];
      this.selectedWordsPos = this.generateUniqueIndexes();
    } else {
      this.validateEachWord = true;
      this.onVaultRestore = true;
    }
  },
  created() {
    for (let i = 0; i < 24; i += 1) {
      this.inputWords.push('');
    }
  },
  methods: {
    demoFill() {
      this.inputWords = [
        'include',
        'pear',
        'escape',
        'sail',
        'spy',
        'orange',
        'cute',
        'despair',
        'witness',
        'trouble',
        'sleep',
        'torch',
        'wire',
        'burst',
        'unable',
        'brass',
        'expose',
        'fiction',
        'drift',
        'clock',
        'duck',
        'oxygen',
        'aerobic',
        'already',
      ];
      this.selectedWordsPos.every(elem => this.selectedWords.push(this.inputWords[elem]));
    },
    fetchHintText(pos) {
      if (this.words.length) {
        this.currentPos = pos;
        const correctWord = this.words[pos];
        const hintArray = this.getRandom(this.words, 7, correctWord);
        hintArray.push(correctWord);
        hintArray.sort(() => 0.5 - Math.random());
        this.hintWords = hintArray;
      }
    },
    validateSelectedWord(word) {
      const correctWord = this.words[this.currentPos];
      if (word === correctWord) {
        const index = this.selectedWordsPos.indexOf(this.currentPos);
        this.selectedWords[index] = word;
        if (this.selectedWords.length < 3) {
          this.$refs[index + 1][0].$el.focus();
        } else {
          this.$refs[index][0].$el.focus();
          this.$refs.createVault.focus();
        }
      }
    },
    getRandom(arr, n, word) {
      const result = new Array(n);
      let len = arr.length;
      const taken = new Array(len);
      taken.push(word);
      if (n > len) throw new RangeError('getRandom: more elements taken than available');
      while (n >= 0) {
        const x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        len -= 1;
        taken[x] = len in taken ? taken[len] : len;
        n -= 1;
      }
      return result;
    },
    generateUniqueIndexes() {
      const arr = [];
      while (arr.length < 3) {
        const r = Math.floor(Math.random() * 24);
        if (arr.indexOf(r) === -1) arr.push(r);
      }
      return arr.sort((a, b) => a - b);
    },
    goBack() {
      this.$store.dispatch('clearWords');
      this.$router.push({ name: 'intro' });
    },
    async createVault() {
      const reset = () => {
        this.showPhraseError = false;
        this.showVaultInitError = false;
        this.loading = true;
        this.apiError = '';
      };

      reset();

      // in case of 3 word validation on front end
      if (!this.validateEachWord) {
        const isValid = this.selectedWordsPos
          .every((pos, index) => this.words[pos] === this.selectedWords[index]);
        if (!isValid) {
          this.showPhraseError = true;
          this.loading = false;
          return;
        }
      }

      const phrase = this.validateEachWord
        ? this.inputWords.map(word => word.trim())
        : this.words.map(word => word.trim());

      try {
        const response = await api.validatePhrase(phrase);

        if (!response.data) {
          this.showPhraseError = true;
          this.loading = false;
          return;
        }

        await api.initVault(phrase);
        await this.$store.dispatch('listDIDs');
        await this.$store.dispatch('listClaimSchemas');
        this.$store.dispatch('clearWords');
        this.$router.push({ name: 'vaultCreated' });
      } catch (err) {
        this.apiError = `HTTP ${err.response.status} - ${err.response.data}`;
        this.showVaultInitError = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import './ValidateVault.scss';
</style>
