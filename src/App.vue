<template>
  <div id="app">
     <renderer>
      <container
        :x="200" :y="400" @pointerdown="scaleObject"
      >
        <sprite :x="0" :y="0" imagePath="./assets/vue-logo.png"/>
      </container>
    </renderer>
    <!-- <p-application
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
import Renderer from './components/PIXIRenderer.vue'
import Sprite from './components/PIXISprite.vue'
import Container from './components/PIXIContainer.vue'

//import { PApplication, PContainer, PGraphics } from "vue-pixi-wrapper";
//import * as PIXI from 'pixi.js';

export default {
  name: "App",
  components: {
    Renderer,
    Sprite,
    Container
    // PApplication,
    // PContainer,
    // PGraphics
  },
  data() {
    return {
      width: 1440,
      height: 1440,
      backgroundColor: 0xFFFFFF,
      resolution: 1,
    };
  },
  methods: {

    scaleObject(container) {
      container.scale.x *= 1.25;
      container.scale.y *= 1.25;
    },

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