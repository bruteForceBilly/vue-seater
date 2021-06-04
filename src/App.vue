<template>
  <div id="app">
    <p-application
      :width="width"
      :height="height"
      :backgroundColor="backgroundColor"
      :resolution="resolution"
      :skipHello="true"
    >
      <p-container>
        <p-graphics :draw="draw"/>
      </p-container>
    </p-application>
  </div>
</template>

<script>
import { PApplication, PContainer, PGraphics } from "vue-pixi-wrapper";
import * as PixiJSGrid from 'pixijs-grid'
import * as PIXI from 'pixi.js';

export default {
  name: "App",
  components: {
    PApplication,
    PContainer,
    PGraphics
  },
  data() {
    return {
      width: 1440,
      height: 1440,
      backgroundColor: 0xFFFFFF,
      resolution: 1,
      posX: 0,
      posY: 0,
      rows: 12,
      cols: 12,
      seatWidth: 32,
      seathHeight: 32
    };
  },
  methods: {
    draw(g) {
      g.clear();    
      g.lineStyle(1, 0x79848D);
      g.beginFill(0xF0F3F9);
      // x y w h
      g.hitArea = new PIXI.Rectangle(this.posX, this.posY, this.width, this.height);
      g.drawRect(this.posX, this.posY, this.width, this.height);

      g.interactive = true;
      g.mouseover = () => {
        console.log("mouse over")
      }

      g.mouseout = () => {
        console.log("mouse leave")
      }

    }    
  },
  mounted () {
      const total = this.rows * this.cols;
      let i = 0;
        while(i<total){
        // ((Math.floor(i/256)) * 8) + 32
        // (Math.floor(i/rows) * height) + margin
        this.posX = Math.floor(i/this.rows) * this.height;
        this.posY = (i % this.rows) * this.width;                              
        this.draw()
        i++;
      }
      
  },
};
</script>