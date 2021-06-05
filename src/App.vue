<template>
  <div id="app">
    <Test />
     <!-- <renderer>
      <container
        :x="0" :y="0" @tick="tickInfo" @pointerdown="scaleObject"
      >
      <message :x="0" :y="0" text="Hello"/>
      </container>
    </renderer> -->
    <!-- 
      <sprite :x="0" :y="0" imagePath="./assets/vue-logo.png"/>

      
      <p-application
      :width="width"
      :height="height"
      :backgroundColor="backgroundColor"
      :resolution="resolution"
      :skipHello="true"
    >
      <p-container>
        <p-graphics 
        :draw="draw" 
        v-for="n in 1" 
        :key="n"
        />
      </p-container>
    </p-application> -->
  </div>
</template>

<script>
import Test from "@/components/Test.vue"
//import { PApplication, PContainer, PGraphics } from "vue-pixi-wrapper";
//import * as PIXI from 'pixi.js';

export default {
  name: "App",
  components: {
    // PApplication,
    // PContainer,
    // PGraphics
    Test
  },
  methods: {

    // draw(g) {
 
    //   // g.clear();    
    //   // g.lineStyle(1, 0x79848D);
    //   // g.beginFill(0xF0F3F9);
    //   // // x y w h
    //   // g.drawRect(g.x, g.y, g.width, g.height);
    //   // g.endFill();
    // }    
  },
  mounted () {
      // const total = this.rows * this.cols;
      // let i = 0;
      //   while(i<total){
      //   // ((Math.floor(i/256)) * 8) + 32
      //   // (Math.floor(i/rows) * height) + margin
      //   this.posX = Math.floor(i/this.rows) * this.height;
      //   this.posY = (i % this.rows) * this.width;                              
      //   this.draw()
      //   i++;
      // }
      
  },
};
</script>