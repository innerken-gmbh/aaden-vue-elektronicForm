<template>
  <div class="form" style="margin: auto;background: whitesmoke ;padding: 24px;max-width: 700px; ">
    <div>
      <h3>Erfassung Ihrer Kontaktdaten</h3>
      <ul>(Zur Kontaktnachverfolgung im Sinne der SARS-CoV-2-Infektionsschutzverordnung)</ul>
    </div>
    <div>
      <ul>Name:</ul>
      <input v-model="name" placeholder="Bitte Name eingeben.">
    </div>
    <div>
      <ul>Vorname:</ul>
      <input v-model="vorname" placeholder="Bitte Vorname eingeben.">
    </div>
    <div>
      <ul>Vollständige Anschrift:</ul>
      <input v-model="anschrift" placeholder="Bitte Anschrift eingeben.">
    </div>
    <div>
      <ul>Telefonnummer:</ul>
      <input v-model="tel" placeholder="Bitte Telefonnummer eingeben.">
    </div>
    <div>
      <ul>Zeitraum des Aufenthalts / ggf. Platz- oder Tischnummer:</ul>
      <input v-model="zeit" placeholder="Bitte Zeitraum eingeben.">
    </div>
    <button style="margin: 50px 0px 0px">submit</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{
    }
  },
  props: {
    msg: String,
    name: String,
    vorname: String,
    anschrift: String,
    tel: String,
    zeit: String
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
</style>
