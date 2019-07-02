<template>
    <div class="card">
        <div class="inner-card-block">
            <img :src="did.avatar" />
            <div class="float-right">
            <h3>{{did.alias}}</h3>
            <div class="card-info">ID:{{did.id}}</div>
            </div>
        </div>
        <div class="inner-card-block">
            <div class="card-info">
                <div>Key</div>
                <div>Claims</div>
            </div>
            <b-button class="float-right" @click="showDID" variant="primary">
                VIEW
                <fa icon="angle-right" />
            </b-button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    did: {
      alias: String,
      id: String,
      avatar: String,
      status: String,
    },
    showDID: Function,
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/dids.scss';
</style>
