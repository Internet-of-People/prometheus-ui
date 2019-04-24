<template>
  <div>
      <div class='keyvault-title'>Register Profile</div>
      <div>Select Avatar</div>
      <div class='avatar' @click="toggleSelector()">
        <i :class="avatar"/>
      </div>
      <div class='modal-dialog' v-bind:class="{ hide: hideSelector }">
        <div class='modal-content'>
          <div class='modal-body'>
              <ul class='icon-picker-list'>
                <li v-for='(row, index) in icons' :key='index' @click="avatar=row.icon">
                  <a>
                    <i :class="row.icon"/>
                  </a>
                </li>
              </ul>
          </div>
        </div>
      </div>
      <div>Name</div>
      <input type="text" placeholder="Enter Name" v-model="name" required>
      <div>
        <div>Select Profile Type</div>
        <div class='dropdown' @click="toggleOption()">{{type}}</div>
        <div class='dropdown absolute-dropdown' v-for="profileType in profileTypes" :key="profileType" @click="type=profileType" v-bind:class="{ hide: hideOptions }">
          {{profileType}}
        </div>
      </div>
      <div @click="toggleInput()">Register Key<i class="fas fa-plus-circle"></i></div>
      <div v-bind:class="{ hide: hideAddKey }">
        <input type="text" v-model="newkey" placeholder="Key" required>
        <i @click="keys=newkey" class="fas fa-check"></i>
      </div>
      <div v-for="key in keys" :key="key">
        <i class="fas fa-key"></i>{{key}}
      </div>
      <div @click="saveProfile()">Save</div>
  </div>
</template>

<script>
var icons = [{ icon: 'fa fa-music' }, { icon: 'fa fa-heart' }, { icon: 'fa fa-star' }, { icon: 'fa fa-user' }, { icon: 'fa fa-film' }, { icon: 'fa fa-th-large' }, { icon: 'fa fa-th' }, { icon: 'fa fa-th-list' }, { icon: 'fa fa-check' }, { icon: 'fa fa-times' }, { icon: 'fa fa-search-plus' }, { icon: 'fa fa-search-minus' }, { icon: 'fa fa-power-off' }, { icon: 'fa fa-signal' }, { icon: 'fa fa-cog' }, { icon: 'fa fa-trash-o' }, { icon: 'fa fa-home' },  { icon: 'fa fa-volume-down' }, { icon: 'fa fa-volume-up' }, { icon: 'fa fa-qrcode' }, { icon: 'fa fa-barcode' }, { icon: 'fa fa-tag' }, { icon: 'fa fa-tags' }, { icon: 'fa fa-book' }, { icon: 'fa fa-bookmark' }, { icon: 'fa fa-print' }, { icon: 'fa fa-camera' }, { icon: 'fa fa-font' }, { icon: 'fa fa-bold' }, { icon: 'fa fa-italic' }, { icon: 'fa fa-text-height' }, { icon: 'fa fa-text-width' }, { icon: 'fa fa-align-left' }, { icon: 'fa fa-align-center' }, { icon: 'fa fa-align-right' }, { icon: 'fa fa-align-justify' }, { icon: 'fa fa-list' }, { icon: 'fa fa-outdent' }, { icon: 'fa fa-indent' }, { icon: 'fa fa-video-camera' }, { icon: 'fa fa-picture-o' }, { icon: 'fa fa-pencil' }, { icon: 'fa fa-map-marker' }, { icon: 'fa fa-adjust' }, { icon: 'fa fa-tint' }, { icon: 'fa fa-pencil-square-o' }, { icon: 'fa fa-share-square-o' }, { icon: 'fa fa-check-square-o' }, { icon: 'fa fa-arrows' }, { icon: 'fa fa-step-backward' }, { icon: 'fa fa-fast-backward' }, { icon: 'fa fa-backward' }, { icon: 'fa fa-play' }, { icon: 'fa fa-pause' }, { icon: 'fa fa-stop' }, { icon: 'fa fa-forward' }, { icon: 'fa fa-fast-forward' }, { icon: 'fa fa-step-forward' }, { icon: 'fa fa-eject' }, { icon: 'fa fa-chevron-left' }, { icon: 'fa fa-chevron-right' }]

var currentIcon = 'fa fa-user'

var profileTypes = ['profile', 'device', 'group', 'wallet']

export default {
  name: 'ProfileRegister',
  data() {
    return {
      icons: icons,
      currentIcon: currentIcon,
      hideSelector: true,
      profileTypes: profileTypes,
      currentType: 'profile',
      hideOptions: true,
      registeredKeys: ['adal;sdk;aslkda;sldka;sldk;','alskdjlaskjdlaksjdlas'],
      hideAddKey: true,
      newkey: '',
      name: ''
    }
  },
  computed: {
    avatar: {
      get: function () {
        return this.currentIcon
      },
      // setter
      set: function (newValue) {
        this.currentIcon = newValue
        this.toggleSelector()
      }
    },
    type: {
      get: function () {
        return this.currentType
      },
      // setter
      set: function (newValue) {
        this.currentType = newValue
        this.toggleOption()
      }
    },
    keys: {
      get: function () {
        return this.registeredKeys
      },
      // setter
      set: function (newValue) {
        this.registeredKeys.push(newValue)
        this.newkey = ''
        this.toggleInput()
      }
    }
  },
  methods: {
    toggleSelector () {
      this.hideSelector = !this.hideSelector
    },
    toggleOption () {
      this.hideOptions = !this.hideOptions
    },
    toggleInput () {
      this.hideAddKey = !this.hideAddKey
      this.newkey = ''
    },
    saveProfile () {
      var param = {
        "name": this.name,
        "type": this.type,
        "icon": this.avatar,
        "desc": "Personal device",
        "keyCount": this.registeredKeys.length
      }
      this.$store.dispatch('saveKeyVault', param)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

.modal-dialog {
  width: 400px;
  box-shadow: 0px 0 1px 2px #f2f2f2;
  position: absolute;
  padding: 16px;
  background-color: white;
  display: inline-block;
}

.icon-picker-list {
	display: flex;
	flex-flow: row wrap;
	list-style: none;
	padding-left: 0;
}

.icon-picker-list li {
	display: flex;
  float: left;
  width: 60px;
}

.icon-picker-list a {
  background-color: #f9f9f9;
  border: 1px solid #fff;
  color: black;
  display: block;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  font-size: 12px;
  line-height: 1.4;
  min-height: 47px;
  padding: 4px;
  text-align: center;
  user-select: none;
}

.icon-picker-list a:hover,
.icon-picker-list a.active{
	background-color: #40975D;
	color: #fff;
	cursor: pointer;
	text-decoration: none;
}

.icon-picker-list .fa {
	font-size: 24px;
	margin-bottom: 10px;
	margin-top: 5px;
}

.icon-picker-list .name-class {
	display: block;
	text-align: center;
	word-wrap: break-word;
}

.avatar{
  padding: 32px;
  height: 100px;
  width: 100px;
  background-color: #f2f2f2;
  border-radius: 50%;
  display: inline-block;
}

.avatar i{
  font-size: 36px;
  color: #40975D;
}

.dropdown{
  box-shadow: 0px 0 1px 2px #f2f2f2;
  width: 200px;
  padding: 8px 12px;
  cursor: pointer;
}

.absolute-dropdown{
  position: relative;
}
</style>
