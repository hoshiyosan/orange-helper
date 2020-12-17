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
.icon-btn{
  background-color: transparent;
  border-radius: 2em;
  padding: 0.5em;
  border: 0;
}

.icon-btn.danger:hover{
  background-color: rgba(255,0,0,0.1)
}

.icon-btn:focus { outline: none;}

.icon-btn.danger{
  color: red;
}
</style>