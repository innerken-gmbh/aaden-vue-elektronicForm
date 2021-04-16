<template>
  <div style="margin: auto;background: white;padding: 24px 24px 0;max-width: 700px;">
    <div >
      <v-img
          :src="pic.src"
          :aspect-ratio="2328/691"
      ></v-img>
    </div>
    <div class="title" style="margin-bottom: 20px;">
      <h3>Erfassung Ihrer Kontaktdaten</h3>
      <h5>(Zur Kontaktnachverfolgung im Sinne der SARS-CoV-2-Infektionsschutzverordnung)</h5>
    </div>
    <div class="form" style="background-color: whitesmoke;border-top-left-radius: 24px;border-top-right-radius: 24px;padding-bottom: 0;max-width: 652px; position: relative;margin-bottom: 5px">
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field :disabled="dataChecked" v-model="formMess.firstName"
                            placeholder="Bitte Name eingeben."
                            label="Name:"
                            clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field :disabled="dataChecked" v-model="formMess.lastName"
                            placeholder="Bitte Vorname eingeben."
                            label="Vorname:"
                            clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field :disabled="dataChecked" v-model="formMess.address"
                            placeholder="Postleitzahl, Stadt, Straße"
                            label="Anschrift:"
                            clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field :disabled="dataChecked" v-model="formMess.phone"
                            placeholder="Bitte Telefonnummer eingeben."
                            label="Telefonnummer:"
                            clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field :disabled="dataChecked" v-model="formMess.eatTime"
                            placeholder="Bitte Zeit eingeben."
                            label="Zeitraum des Aufenthalts:"
                            hint="Stunde:Minute, z.B. 15:30"
                            clearable
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <div style="padding-right: 10px;padding-left: 10px">
        <v-btn
            depressed
            outlined
            block
            color="gray"
            @click="inspect"
            v-if="!dataChecked"
            :loading="loadingDialog"
        ><v-icon color="gray lighten-1" left>{{icons.mdiFileDocumentEditOutline}}</v-icon>submit</v-btn>
      </div>
      <p style="font-size: 0.75rem; margin: 10px 0 0; color: gray; border-left-style: solid; border-left-color: lightgray; border-left-width:10px"
         v-if="!dataChecked">
        Diese Daten sind ausschließlich für die Zwecke des Infektionsschutzes aufzubewahren,
        dürfen zu keinem anderen Zwecke verwendet werden und sind spätesten einen Monat
        nach dem letzten Kontakt zu löschen bzw. zu vernichten.
      </p>
      <v-snackbar
          v-model="showAlert"
          :multi-line="snackbarProps.multiLine"
          :timeout="snackbarProps.timeout"
          relative
          color="gray"
          text
          rounded="pill"
      >{{alertMsg}}
        <template v-slot:action="{attrs}">
          <v-btn
              color="red"
              text
              v-bind="attrs"
              @click="showAlert=false"
          >Close</v-btn>
        </template>
      </v-snackbar>
      <v-alert
          v-model="successAlert"
          border="left"
          color="green lighten-1"
          dismissible
          elevation="2"
          prominent
          type="success"
      >
        {{successMsg}} <v-icon color="white">{{icons.mdiEmoticonOutline}}</v-icon>
      </v-alert>
      <v-dialog
          v-model="loadingDialog"
          hide-overlay
          persistent
          width="300"
      >
        <v-card
          color="grey"
          dark
        >
          <v-card-text>
            Hochladen im Gange...
            <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import hillo from "hillo";
import logo from '/src/assets/aadenLogo.png';
import { mdiEmoticonOutline } from '@mdi/js';
import { mdiFileDocumentEditOutline } from '@mdi/js';

export default {
  name: 'HelloWorld',
  data(){
    return{
      formMess:{
        firstName: '',
        lastName:'',
        address: '',
        phone: '',
        eatTime: '',
      },
      checkdata:[
        {
          inspect: "",
          msg: 'Name',
        },
        {
          inspect: "",
          msg: 'Vorname',
        },
        {
          inspect: "",
          msg: 'Anschrift',
        },
        {
          inspect: "",
          msg: 'Telefon',
        },
        {
          inspect: "",
          msg: 'Zeit',
          reg: '[0-9]{2}:[0-9]{2}',
          msg2: "wie 15:30"
        }
      ],
      pic:{
        name: 'aadenLogo',
        src: logo,
      },
      dataChecked: false,
      showAlert: false,
      alertMsg:"",
      snackbarProps: {
        multiLine: false,
        timeout: 2000,
      },
      successAlert : false,
      successMsg:"",
      icons: {
        mdiEmoticonOutline,
        mdiFileDocumentEditOutline
      },
      loadingDialog: false,
    }
  },
  props: {
  },
  methods:{
    have_empty: function (arr) {
      for (let key in arr) {
        console.log(arr[key].inspect)
        if (arr[key].inspect && arr[key].reg) {
          let reg = new RegExp(arr[key].reg)
          const red_end = reg.test(arr[key].inspect);
          if (!red_end) {
            // alert('Bitte korrekt ' + arr[key].msg + ' eingeben.' + arr[key].msg2)
            this.showAlert = true
            this.alertMsg = 'Bitte korrekt ' + arr[key].msg + ' eingeben.' + arr[key].msg2
            return false
          }
        } else if (!arr[key].inspect) {
          // alert('Bitte ' + arr[key].msg + ' eingeben.')
          this.showAlert = true
          this.alertMsg = 'Bitte ' + arr[key].msg + ' eingeben.'
          return false
        }
      }
      // alert('Vielen Dank für Ihren Unterstüzung!')
      this.successMsg = 'Vielen Dank für Ihren Unterstüzung!'
      this.dataChecked = true
      this.loadingDialog = true
      this.loadingDialog()
      this.getNewDate();
      console.log(this.formMess,'formMass')
      hillo.post('Route.php?op=coronaAdd',this.formMess)
      return true
    },
    inspect(){
      this.assignData();
      const end = this.have_empty(this.checkdata);
      if(!end) return
        console.log('submit')
    },
    assignData(){
      const arrForm = [];
      for( let key in this.formMess){
        arrForm.push(key);
      }
      for(let i = 0;i<this.checkdata.length;i++){
        this.checkdata[i].inspect = this.formMess[arrForm[i]];
      }
    },
    getNewDate(){
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      this.formMess.eatTime = year + seperator1 + month + seperator1 + strDate + " " + this.formMess.eatTime
    },
  },
  watch: {
    loadingDialog(val) {
      if (!val) return
        setTimeout(() => (this.loadingDialog = false,this.successAlert = true), 2000)
    },
  },
  mounted() {
    document.body.style.backgroundColor= "white"
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  text-align: left;
}
h3 {
  margin: 10px 0 0;
  text-align: left;
}
h5 {
  margin: 10px 0 0;
  text-align: left;
  font-weight: normal;
  font-size: medium;
}
ul {
  list-style-type: none;
  margin: 10px 0 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
