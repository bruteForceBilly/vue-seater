<template>
  <div id="app">
    <Test v-if="false"/>
    <Grid />
  </div>
</template>

<script>
import Test from "@/components/Test.vue"
import Grid from "@/components/Grid.vue"

export default {
  name: "App",
  components: {
    Test,
    Grid
  },
};
</script>