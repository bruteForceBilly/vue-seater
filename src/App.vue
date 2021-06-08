<template>
  <div id="app">
    <Test v-if="false"/>
    <Grid v-if="false"/>
    <Editor v-if="false"/>
  </div>
</template>

<script>
import Test from "@/components/Test.vue"
import Editor from "@/components/Grid.vue"
import Grid from "@/components/Grid.vue"

export default {
  name: "App",
  components: {
    Test,
    Grid,
    Editor
  },
};
</script>