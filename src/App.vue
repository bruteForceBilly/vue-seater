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
      width: 320,
      height: 320,
      backgroundColor: 0xFFFFFF,
      resolution: 1,
    };
  },
  methods: {
    draw(g) {
      g.clear();
      g.lineStyle(1, 0x79848D);
      g.beginFill(0xF0F3F9);
      g.drawRect(1, 0, 8, 8);
    }
  },
};
</script>