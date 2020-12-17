<template>
 <nav role="navigation" class="navbar navbar-dark navbar-expand-md supra">
    <div class="container">
        <img class="logo" src="https://boosted.orange.com/docs/4.5/dist/img/orange_logo.svg">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item"><router-link class="nav-link" active-class="active" aria-current="page" to="/projects">Projets</router-link></li>
            <li class="nav-item"><router-link class="nav-link" active-class="active" aria-current="page" to="/imputations">Imputations</router-link></li>
        </ul>
    </div>
</nav>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.logo{
  margin-right: 2em;
  width: 25px;
  height: 25px;
}
.supra{
  display: flex;
}
.navbar-nav{
  flex-direction: row;
}
</style>