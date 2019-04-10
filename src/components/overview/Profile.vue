<template>
  <div>
    <div class='profile' v-for="(profile, key) in profiles" :key="key">
      <div class='profile-header'>
        <div class='float-left'>
            <div class='large-fontsize'>{{profile.profile.name}}</div>
            <div class='micro-fontsize'>Contact No: {{profile.profile.contactNo}}</div>
            <div class='micro-fontsize'>P.O Box: {{profile.profile.address}}</div>
        </div>
        <div class='float-right'>
          <i :class="profile.profile.icon" :title="profile.profile.icon" ></i>
        </div>
      </div>
      <div class='profile-actions profile-devices'>
        <div class='large-fontsize heading'>Devices Registered: {{profile.devices.length}}</div>
        <div class='app-block' v-for="(device,key) in profile.devices" :key="key">
          {{device.name}}: {{device.desc}}
          <div class='float-right'><i class='apps' :class="device.icon"></i> </div>
        </div>
      </div>
      <div class='profile-actions profile-applications'>
        <div class='large-fontsize heading'>Applications</div>
        <div class='app-block' v-for="(app,key) in profile.applications.apps" :key="key">
          <i class='apps' :class="app.icon"></i>
        </div>
      </div>
      <div class='profile-actions'>
        <div class='large-fontsize heading'>Interactions</div>
        <div class='card float-left'>
            <div class='profile-card-title large-fontsize'>Last Login <i class="fas fa-sign-in-alt"></i></div>
            <div> {{profile.action.lastLogin}}</div>
            <div class='cursor-pointer more-details micro-fontsize'>More <i class="fas fa-angle-double-down"></i></div>
        </div>
        <div class='card float-left'>
            <div class='profile-card-title large-fontsize'>Recent Contacts <i class="fas fa-address-book"></i></div>
            <div> {{profile.action.lastProfile}} <i :class="profile.action.lastProfilePhoto"></i></div>
            <div class='cursor-pointer more-details micro-fontsize'>More <i class="fas fa-angle-double-down"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var profiles = [
  {"profile" : {
      "type": "profile",
      "category": "Person",
      "name": "Dealer Lady",
      "icon": "fas fa-bong",
      "address": "223, 2nd Street, Maine",
      "keyCount": 4,
      "contactNo": "02 739 28 382"
    },
  "action" : {
    "lastLogin":"Today 09:54:37 CEST",
    "lastProfile":"Silon Musk",
    "lastProfilePhoto": "fas fa-user-astronaut"
    },
  "applications" : {
    "apps":[
      {
        name:"Telegram",
        icon:"fab fa-telegram"
      },
      {
        name:"Skype",
        icon:"fab fa-skype"
      },
      {
        name:"Whatsapp",
        icon:"fab fa-whatsapp"
      },
      {
        name:"Phone",
        icon:"fas fa-phone"
      },
       {
        name:"HackerRank",
        icon:"fab fa-hackerrank"
      }
      ]
    },
    "devices" : [
    {
      "type": "device",
      "name": "Tablet",
      "icon": "fa fa-tablet-alt",
      "desc": "Train entertainment"
    },
    {
    "type": "device",
    "name": "Macbook",
    "icon": "fas fa-laptop-code",
    "desc": "Personal work"
    },
    {
    "type": "device",
    "name": "Smart Blenders",
    "icon": "fas fa-blender-phone",
    "desc": "Making Smoothees"
    },
    {
    "type": "device",
    "name": "Snow Armoury",
    "icon": "fas fa-snowplow",
    "desc": "Winter armory"
    },
    {
    "type": "device",
    "name": "Desktop",
    "icon": "fas fa-desktop",
    "desc": "Netflix device"
    }
    ]
  }
  // ,
  //   {"profile" : {
  //     "type": "device",
  //     "name": "Ipad",
  //     "icon": "fa fa-tablet-alt",
  //     "desc": "Personal device",
  //     "address": "223, 2nd Street, Maine",
  //     "keyCount": 3,
  //     "contactNo": "02 739 28 382"
  //   },
  // "action" : {
  //   "lastLogin":"Today 09:54:37 CEST",
  //   "lastProfile":"Silon Musk",
  //   "lastProfilePhoto": "fas fa-user-astronaut"
  //   }
  // }
  ]
export default {
  name: 'Profile',
  data() {
    return {
      profiles: profiles
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card{
  height: 110px;
  margin: 20px 20px 20px 0px;
  padding: 16px 16px 0;
  text-align: center;
}

.more-details{
  margin: 28px 0 0;
}

.heading{
  font-weight: 100;
  padding: 12px 0;
}

.app-block{
  display: inline-block;
}

</style>