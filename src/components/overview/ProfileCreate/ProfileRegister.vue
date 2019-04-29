<template>
  <div class=''>
      <div class='keyvault-title'>Register Profile</div>
      <div class='form-content'>
        <div>
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
        </div>
        <div class='form-block'>
          <div class='form-label'>NAME</div>
          <input type="text" class='value-component' placeholder="Enter Name" v-model="name" required>
        </div> 
        <div class='form-block'>
          <div class='form-label'>TYPE</div>
          <div>
            <div class='dropdown' @click="toggleOption()">{{type}}</div>
            <div class='dropdown absolute-dropdown' v-for="profileType in profileTypes" :key="profileType" @click="type=profileType" v-bind:class="{ hide: hideOptions }">
              {{profileType}}
            </div>
          </div>
        </div>
        <div class='form-block'>
          <div class='form-label' @click="toggleInput()">KEY GENERATOR <i class="fas fa-plus-circle"></i></div>
          <div class='value-component'>
            {{keys[Math.floor((Math.random()*2) + 1)]}}
          </div>
        </div>
        <div class='form-block'>
          <div class='secondary-btn' @click="saveProfile()"><i class="fas fa-save"></i> Save</div>
        </div>
      </div>
    </div> 
</template>

<script>
var icons = [{ icon: 'fa fa-music' }, { icon: 'fa fa-heart' }, { icon: 'fas fa-user-nurse' }, { icon: 'fas fa-hiking' }, { icon: 'fas fa-user-ninja' }, { icon: 'fa fa-th-list' }, { icon: 'fa fa-signal' }, { icon: 'fa fa-home' },  { icon: 'fas fa-chalkboard-teacher' }, { icon: 'fas fa-user-astronaut' }, { icon: 'fab fa-galactic-senate' }, { icon: 'fa fa-barcode' }, { icon: 'fas fa-child' }, { icon: 'fa fa-tags' }, { icon: 'fa fa-book' }, { icon: 'fa fa-bookmark' }, { icon: 'fas fa-user-md' }, { icon: 'fa fa-camera' }, { icon: 'fas fa-skiing-nordic' }, { icon: 'fas fa-swimmer' }, { icon: 'fas fa-user-secret' }, { icon: 'fas fa-user-injured' }, { icon: 'fas fa-running' }, { icon: 'fas fa-blind' }, { icon: 'fas fa-person-booth' }, { icon: 'fas fa-skating' }]
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
      registeredKeys: ['IezbeWGSY2dqcUBqT8K7R14xr','IezkXs7Xd8SDWLaGKUAjEf53W'],
      hideAddKey: true,
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
      set: function () {
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
    },
    saveProfile () {
      var param = {
        "name": this.name,
        "type": this.type,
        "icon": this.avatar,
        "desc": "Occupation",
        "keyCount": this.registeredKeys.length
      }
      this.$store.dispatch('saveKeyVault', param)
      this.$router.push('/profile/student')
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

.icon-picker-list .fas {
	font-size: 24px;
	margin-bottom: 10px;
	margin-top: 5px;
}

.icon-picker-list .fab {
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
  border: 1px solid #f2f2f2;
  width: 280px;
  padding: 8px 12px;
  cursor: pointer;
}

.value-component{
  width: 280px;
  padding: 8px 12px;
  cursor: pointer;
  outline: none;
  border: 1px solid #f2f2f2;
}

.form-label{
  width: 140px;
  padding: 8px 0px;
}

.absolute-dropdown{
  position: relative;
}

.form-content{
  padding: 20px;
}

.form-block{
  display: inline-flex;
  width: 100%;
  padding: 12px 20px;
}
</style>
