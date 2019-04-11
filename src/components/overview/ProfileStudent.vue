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
            <div class='large-fontsize'>{{student.profile.name}}</div>
            <div class='micro-fontsize'>Contact No: {{student.profile.contactNo}}</div>
            <div class='micro-fontsize'>{{student.profile.address}}</div>
        </div>
        <div class='float-right'>
          <i :class="student.profile.icon"></i>
        </div>
      </div>
      <div class='profile-actions profile-devices'>
        <div class='large-fontsize heading'>Devices Registered: {{student.devices.length}}</div>
        <div class='app-block' v-for="(device,key) in student.devices" :key="key">
          {{device.name}}: {{device.desc}}
          <div class='float-right'><i class='apps' :class="device.icon"></i> </div>
        </div>
      </div>
      <div class='profile-actions profile-applications'>
        <div class='large-fontsize heading'>Applications</div>
        <div class='app-block' v-for="(app,key) in student.applications.apps" :key="key">
          <i class='apps' :title="app.name" :class="app.icon"></i>
        </div>
      </div>
      <div class='profile-actions profile-applications'>
        <div class='large-fontsize cursor-pointer heading'>Claims</div>
        <div class="header-claims" v-for="(val,index) in fetchKey(student.claims[0])" :key="index">{{val}}</div>
        <div class="claim-student" v-for="(claim,index_i) in student.claims" :key="index_i">
          <div class="all-details" v-for="(val,index) in fetchKey(claim)" :key="index">{{" "+claim[val] + "  "}}</div>
        </div>
      </div>
      <div class='profile-actions profile-applications'>
        <div class='large-fontsize heading'>Performance per Semester by Class Average</div>
        <highcharts id="container1" :options="chartOptions"></highcharts>
      </div>
    </div>
    
  </div>
</template>

<script>
var profiles = [
  {"profile" : {
      "type": "profile",
      "name": "Tutor Ontheside",
      "icon": "fas fa-chalkboard-teacher",
      "desc": "Freelance tutor available for hire",
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
        type: 'areaspline',
        threshold: null
    },
    title: {
        text: ''
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    xAxis: {
        categories: [
            'SEM I',
            'SEM II',
            'SEM III',
            'SEM IV',
            'SEM V',
            'SEM VI',
            'SEM VII',
            'SEM VIII',
        ],
    },
    yAxis: {
        title: {
            text: 'Net Percentage'
        },
        threshold: null
    },
    tooltip: {
        shared: true,
        valueSuffix: ' units'
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            threshold: null,
            fillOpacity: 0.5
        }
    },
    series: [{
        name: 'Sam\'s Average',
        data: [81, 82, 91, 75, 73, 60, 82, 80],
        color: '#ABD054',
      marker: {
        symbol: 'circle',
        radius: 1
      }
    }, {
        name: 'Class Average',
        data: [71, 93, 94, 73, 83, 75, 84, 90]
    }]
}

var studentProfile = {
  "profile" : {
      "type": "profile",
      "name": "Studious Sameul",
      "icon": "fas fa-user-graduate",
      "desc": "Graduate student",
      "keyCount": 2,
      "address": "Computer Science Major with a Cryptography minor",
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
      "name": "Desktop",
      "icon": "fas fa-laptop-code",
      "desc": "Main development machine"
    },
    {
    "type": "device",
    "name": "Polariod",
    "icon": "fas fa-camera-retro",
    "desc": "For collages"
    }],
    "claims" : [
    {
      type: "Educational", 
      summary: "Graduate", 
      claimer: "Nauyarit University", date: "25 May 2018", 
      passingYear: "2018", 
      claim: "graduate"
    },
    {
      type: "Educational", 
      summary: "4.0 GPA", 
      claimer: "Nauyarit University", date: "12 Jan 2018", 
      passingYear: "2018", 
      claim: "percentage"
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
  name: 'ProfileStudent',
  data() {
    return {
      profiles: profiles,
      chartOptions: chartOptions,
      student: studentProfile,
    }
  },
  methods: {
    fetchKey: function (obj) {
     return Object.keys(obj)
    }
  }
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

.claim-student{
  display: inline-flex;
}

.all-details{
  /* margin-left: 12px; */
  width: 120px;
}

.header-claims{
  display: inline-flex;
  width: 120px;
  font-weight: 100;
  padding: 0 0 12px 0;
}
</style>