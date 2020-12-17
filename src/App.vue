<template>
  <div id="app">
    <navigation style="position: fixed; z-index: 999; left: 0; right: 0"/>
    <main style="padding-top: 45px;">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  components: { Navigation }
}
</script>

<style>
header.title{
    display: flex; 
    justify-content: space-between; 
    align-items: center;
    margin: 1em 2em;
    border-left: solid 8px orangered;
    padding-left: 1em;
}

header.title h2{
  margin-block-end: 0.2em;
}

.icon-btn{
  background-color: transparent;
  border-radius: 2em;
  padding: 0.5em;
  border: 0;
}
.icon-btn:focus { outline: none;}

.icon-btn.danger{
  color: red;
}
.icon-btn.danger:hover{
  background-color: rgba(255,0,0,0.1)
}

.icon-btn.primary{
  color: blue;
}
.icon-btn.primary:hover{
  background-color: rgba(0,0,255, 0.1)
}
</style>