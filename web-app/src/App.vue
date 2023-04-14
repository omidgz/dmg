<template>
    <ItemsList/>
</template>

<script>
import ItemsList from './components/ItemsList.vue'

export default {
  name: 'App',
  components: {
    ItemsList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
