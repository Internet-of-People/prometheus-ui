<template>
  <b-modal
    id="modal-did-created"
    title="Your Persona has been Created!"
    no-close-on-esc
  >
    <div class="did-created">
      <b-img :src="avatar" alt="avatar image" class="did-avatar" />
      <div class="did-label">{{ label }}</div>
    </div>

    <template v-slot:modal-footer="{ cancel }">
      <b-button size="sm" class="text-uppercase" variant="outline-primary" @click="cancel()">
        Close
      </b-button>
      <b-button
        size="sm"
        class="text-uppercase"
        variant="primary"
        @click="onSetCreatedToActive"
      >
        Set to Active
      </b-button>
    </template>
  </b-modal>
</template>
<script>
import EventBus from '@/eventbus';

export default {
  data() {
    return {
      avatar: '',
      label: '',
      id: '',
    };
  },
  mounted() {
    EventBus.$on('open-did-created-modal', (createdDid) => {
      this.avatar = createdDid.avatar;
      this.label = createdDid.label;
      this.id = createdDid.id;
      this.$bvModal.show('modal-did-created');
    });
  },
  methods: {
    async onSetCreatedToActive() {
      await this.$store.dispatch('setActiveDID', this.id);
      this.$bvModal.hide('modal-did-created');
      this.$router.push({ name: 'viewDID', params: { did: this.id } });
    },
  },
};
</script>
<style scoped lang="scss">
@import './DidCreatedModal.scss';
</style>
