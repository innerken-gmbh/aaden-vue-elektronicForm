<template>
  <div class="form" style="margin: auto;background: whitesmoke ;padding: 24px;max-width: 700px; ">
    <div>
      <h3>Erfassung Ihrer Kontaktdaten</h3>
      <ul>(Zur Kontaktnachverfolgung im Sinne der SARS-CoV-2-Infektionsschutzverordnung)</ul>
    </div>
    <div>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field :disabled="dataChecked" v-model="formMess.name"
                            placeholder="Bitte Name eingeben."
                            label="Name:"
                            clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field :disabled="dataChecked" v-model="formMess.vorname"
                            placeholder="Bitte Vorname eingeben."
                            label="Vorname:"
                            clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field :disabled="dataChecked" v-model="formMess.anschrift"
                            placeholder="Postleitzahl, Stadt, Straße"
                            label="Anschrift:"
                            clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field :disabled="dataChecked" v-model="formMess.tel"
                            placeholder="Bitte Telefonnummer eingeben."
                            label="Telefonnummer"
                            clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field :disabled="dataChecked" v-model="formMess.zeit"
                            placeholder="TT.MM.YYYY"
                            label="Zeitraum des Aufenthalts/ggf. Tischnummer:"
                            clearable
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
    <v-btn depressed outlined block color="primary" @click="inspect" v-if="!dataChecked"
    >submit</v-btn>
    <p style="font-size: 0.75rem; margin: 10px 0 0; color: gray;
    border-left-style: solid; border-left-color: lightgray; border-left-width:10px"
    v-if="!dataChecked">
      Diese Daten sind ausschließlich für die Zwecke des Infektionsschutzes aufzubewahren,
      dürfen zu keinem anderen Zwecke verwendet werden und sind spätesten einen Monat
      nach dem letzten Kontakt zu löschen bzw. zu vernichten.
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{
      formMess:{
        name:'',
        vorname: '',
        anschrift: '',
        tel: '',
        zeit: '',
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
        }
      ],
      dataChecked: false
    }
  },
  props: {
    msg: String,
  },
  methods:{
    have_empty: function (arr) {
      for (let key in arr) {
        console.log(arr[key].inspect)
        if (arr[key].inspect && arr[key].reg) {
          let reg = new RegExp(arr[key].reg)
          const red_end = reg.test(arr[key].inspect);
          if (!red_end) {
            alert('Bitte korrekt ' + arr[key].msg + ' eingeben.')
            return false
          }
        } else if (!arr[key].inspect) {
          alert('Bitte ' + arr[key].msg + ' eingeben.')
          return false
        }
      }
      alert('Vielen Dank für Ihren Unterstüzung!')
      this.dataChecked = true
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
  }
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
