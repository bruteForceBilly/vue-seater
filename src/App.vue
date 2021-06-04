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
    };
  },
  methods: {
    draw(g) {
      g.clear();
      // g.lineStyle(1, 0x79848D);
      // g.beginFill(0xF0F3F9);
      // g.drawRect(1, 0, 8, 8);
    
      let rows = 144, cols = 144;
      let width = 8, height = 8;
      
      const total = rows * cols;
      
      let i = 0;

      while(i<total){
        // ((Math.floor(i/256)) * 8) + 32
        // (Math.floor(i/rows) * height) + margin
        let posX = Math.floor(i/rows) * height;
        let posY = (i % rows) * width;                      
          g.lineStyle(1, 0x79848D);
          g.beginFill(0xF0F3F9);
          // x y w h
          g.drawRect(posX, posY, width, height);
  
          i++;
      }
    }    
  },
};
</script>