<template>
  <div class="form" style="margin: auto;background: whitesmoke ;padding: 24px;max-width: 700px; ">
    <div>
      <h3>Erfassung Ihrer Kontaktdaten</h3>
      <ul>(Zur Kontaktnachverfolgung im Sinne der SARS-CoV-2-Infektionsschutzverordnung)</ul>
    </div>
    <div>
      <ul>Name:</ul>
      <input v-model="formMess.name" placeholder="Bitte Name eingeben.">
    </div>
    <div>
      <ul>Vorname:</ul>
      <input v-model="formMess.vorname" placeholder="Bitte Vorname eingeben.">
    </div>
    <div>
      <ul>Vollständige Anschrift:</ul>
      <input v-model="formMess.anschrift" placeholder="Postleitzahl, Stadt">
    </div>
    <div>
      <ul>Telefonnummer:</ul>
      <input v-model="formMess.tel" placeholder="Bitte Telefonnummer eingeben.">
    </div>
    <div>
      <ul>Zeitraum des Aufenthalts / ggf. Platz- oder Tischnummer:</ul>
      <input v-model="formMess.zeit" placeholder="TT.MM.YYYY">
    </div>
    <button style="margin: 30px 0px 0px" @click="inspect">submit</button>
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
      ]
    }
  },
  props: {
    msg: String,
  },
  methods:{
    have_empty(arr) {
      for ( let key in arr) {
        console.log(arr[key].inspect)
        if(arr[key].inspect && arr[key].reg){
          let reg = new RegExp(arr[key].reg)
          const red_end = reg.test(arr[key].inspect);
          if( !red_end ){
            alert('Bitte korrekt ' + arr[key].msg + ' eingeben.')
            return false
          }
        }else if(!arr[key].inspect){
          alert('Bitte ' + arr[key].msg + ' eingeben.')
          return false
        }
      }
      alert('Vielen Dank für Ihren Unterstüzung!')
      return true
    },
    inspect(){
      this.assignData();
      const end = this.have_empty(this.checkdata);
      if(!end) return console.log('submit');
    },
    assignData(){
      const arrForm = [];
      for( let key in this.formMess){
        arrForm.push(key);
      }
      for(let i = 0;i<this.checkdata.length;i++){
        // const key = arrForm[i];
        this.checkdata[i].inspect = this.formMess[arrForm[i]];
      }
    }
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
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input{
  border-width: 1px;
  margin: auto;
  max-width: 700px;
  height: 30px;
}
button{
  height: 30px;
  font-size: 15px;
}
</style>
