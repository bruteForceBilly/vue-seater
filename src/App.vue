<template>
  <div id="app">
     <v-stage :config="configKonva">
      <v-layer ref="stage__bg">
        <v-rect :config="{
          x: 0,
          y: 0,
          width: 320,
          height: 320,
          fill: '#FAFAD2',
          }"
        />
      </v-layer>
      <v-layer ref="section">
        <v-rect ref="section__bg" :config="{
          x: 32,
          y: 32,
          width: 256,
          height: 256,
          fill: '#BDB76B',
          }"
        />
        <v-group ref="seats">
          <v-rect v-for="(seat, i) in seats" :key="seat.id" :config="{
            id: seat.id,
            x: ((Math.floor(i/256)) * 8) + 32,
            y: ((i % 256) * 8) + 32,
            width: 8,
            height: 8,
            fill: '#BDB76B',
            stroke: '#FAFAD2',
            strokeWidth: 1
          }"
          />
        </v-group>
         

      </v-layer>
    </v-stage>
  </div>
</template>

<script>


export default {
  name: "App",
  data() {
    return {
      seats: [],
      configKonva: {
        width: 320,
        height: 320,
      },
    };
  },
  created(){
    for (let i = 1; i < 65536; i++) { 
      this.seats.push({ id: i.toString()})
    }
  },
  mounted() {
    const stageBg = this.$refs.stage__bg.getNode();
    stageBg.moveToBottom();
    stageBg.cache();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0
}
</style>
