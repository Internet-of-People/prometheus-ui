<template>
  <div>
    <div class='profile' v-for="(profile, index) in profiles" :key="index">
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
          {{device.name}}
          <div class='float-right'><i class='apps'  :title="device.desc" :class="device.icon"></i> </div>
        </div>
      </div>
      <div class='profile-actions profile-applications'>
        <div class='large-fontsize heading'>Applications</div>
        <div class='app-block' v-for="(app,key) in profile.applications.apps" :key="key">
          <i class='apps' :title="app.name" :class="app.icon"></i>
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
    <div class='profile-influencer'>
      <div class='profile-header'>
        <div class='float-left'>
            <div class='large-fontsize'>{{influencer.profile.name}}</div>
            <div class='micro-fontsize'>Contact No: {{influencer.profile.contactNo}}</div>
            <div class='micro-fontsize'>{{influencer.profile.address}}</div>
        </div>
        <div class='float-right'>
          <i :class="influencer.profile.icon"></i>
        </div>
      </div>
      <div class='profile-actions profile-devices'>
        <div class='large-fontsize heading'>Devices Registered: {{influencer.devices.length}}</div>
        <div class='app-block' v-for="(device,key) in influencer.devices" :key="key">
          {{device.name}}: {{device.desc}}
          <div class='float-right'><i class='apps' :class="device.icon"></i> </div>
        </div>
      </div>
      <div class='profile-actions profile-applications'>
        <div class='large-fontsize heading'>Applications</div>
        <div class='app-block' v-for="(app,key) in influencer.applications.apps" :key="key">
          <i class='apps' :title="app.name" :class="app.icon"></i>
        </div>
      </div>
      <div class='profile-actions profile-applications'>
        <div class='large-fontsize heading'>Views on Live Streams</div>
        <highcharts id="container1" :options="chartOptions"></highcharts>
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
  ]
var chartOptions = {
  chart: {
      type: 'spline',
      animation: {
          duration: 10
      },
      marginRight: 10,
      events: {
          load: function () {

              // set up the updating of the chart each second
              var series1 = this.series[0];
              var series2 = this.series[1];
              var series3 = this.series[2];

              setInterval(function () {
                  var x = (new Date()).getTime(), // current time
                      y1 = Math.random() * 600000,
                      y2 = Math.random() * 500000,
                      y3 = Math.random() * 550000;
                  series1.addPoint([x, y1], true, true);
                  series2.addPoint([x, y2], true, true);
                  series3.addPoint([x, y3], true, true);
              }, 5000);
          }
      }
  },

  time: {
      useUTC: false
  },

  title: {
      text: ''
  },
  xAxis: {
      type: 'datetime',
      tickPixelInterval: 150
  },
  yAxis: {
      title: {
          text: 'Views'
      },
      plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
      }]
  },
  tooltip: {
      headerFormat: '<b>{series.name}</b><br/>',
      pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.0f}'
  },

  legend: {
    enabled: false
  },
  exporting: {
    enabled: false
  },
  credits: {
    enabled: false
  },

  series: [{
    name: 'Instagram',
    data: (function () {
        // generate an array of random data
        var data = [],
            time = (new Date()).getTime(),
            i;

        for (i = -19; i <= 0; i += 1) {
            data.push({
                x: time + i * 5000,
                y: Math.random()* 500000
            });
        }
        return data;
    }()),
    color: '#D85760',
    marker: {
      symbol: 'circle',
      radius: 1
    }
  },
  {
    name: 'YouTube',
    data: (function () {
        // generate an array of random data
        var data = [],
            time = (new Date()).getTime(),
            i;

        for (i = -19; i <= 0; i += 1) {
            data.push({
                x: time + i * 5000,
                y: Math.random()* 500000
            });
        }
        return data;
    }()),
    color: '#ABD054',
    marker: {
      symbol: 'circle',
      radius: 1
    }
  },
  {
    name: 'Periscope',
    data: (function () {
        // generate an array of random data
        var data = [],
            time = (new Date()).getTime(),
            i;

        for (i = -19; i <= 0; i += 1) {
            data.push({
                x: time + i * 5000,
                y: Math.random()* 500000
            });
        }
        return data;
    }()),
    color: '#ff9900',
    marker: {
      symbol: 'circle',
      radius: 1
    }
  }]
}

var influencerProfile = {
  "profile" : {
      "type": "profile",
      "name": "Olivia Fanning",
      "icon": "fab fa-instagram",
      "desc": "Personal device",
      "address": "Body positive instagram model",
      "keyCount": 3,
      "contactNo": "02 739 28 382"
    },
  "action" : {
    "lastLogin":"Today 09:54:37 CEST",
    "lastProfile":"Silon Musk",
    "lastProfilePhoto": "fas fa-user-astronaut"
    },
  "devices" : [
    {
      "type": "device",
      "name": "iPhone",
      "icon": "fab fa-apple",
      "desc": "Main phone"
    },
    {
    "type": "device",
    "name": "Macbook",
    "icon": "fas fa-laptop-code",
    "desc": "Editing Videos"
    },
    {
    "type": "device",
    "name": "Polariod",
    "icon": "fas fa-camera-retro",
    "desc": "For collages"
    }],
  "applications" : {
    "apps":[
      {
        name:"Phone",
        icon:"fab fa-snapchat-ghost"
      },
      {
        name:"Instagram",
        icon:"fab fa-instagram"
      },
      {
        name:"Viber",
        icon:"fab fa-viber"
      },
      {
        name:"Whatsapp",
        icon:"fab fa-periscope"
      }
      ]
    }
  }

export default {
  name: 'ProfileInfluencer',
  data() {
    return {
      profiles: profiles,
      chartOptions: chartOptions,
      influencer: influencerProfile,
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