<template>
  <div class="projects">
    <header class="title">
      <h2>Projets</h2>
      <button class="btn btn-primary"><span class="material-icons">get_app</span>Télécharger le détail au format CSV</button>
    </header>
    <form class="input-group mb-3" @submit="addProject()">
      <input type="text" class="form-control" v-model="name" @keyup="filterProjects()" style="flex: 1" placeholder="Nom du projet">
      <input type="text" class="form-control" v-model="code" @keyup="filterProjects()" style="flex: 2" placeholder="Code projet">

      <div class="input-group-prepend">
        <button class="btn btn-secondary" type="submit">Ajouter</button>
      </div>
    </form>

    <div class="list-group">
      <a href="#" class="list-group-item list-group-item-action" @click="openProjectSummary(project.code)" v-for="project of projects" :key="project.code">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{project.name}}</h5>
          <div>
          <button class="icon-btn primary" @click.stop="fillInputWithProject(project.code)"><span class="material-icons">create</span></button>
          <button class="icon-btn danger" @click.stop="removeProject(project.code)"><span class="material-icons">delete</span></button>
          </div>
        </div>
        <p class="mb-1">{{project.days}} jours ({{project.hours}} heures)</p>
        <small>{{project.code}}</small>
      </a>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Projects',
  data(){
    return {
      name: '',
      code: ''
    }
  },
  computed: {
    ...mapGetters(["projects"])
  },
  components: { },
  methods: {
    openProjectSummary(code){
      this.$router.push({name: 'ProjectDetail', params: {projectCode: code}})
    },
    /**
     * Write project code in currently selected form field from page.
     */
    fillInputWithProject(code){
      alert(`fillInputWithProject ${code} not implemented`);
    },
    addProject(){
      this.$store.dispatch('addProject', {name: this.name, code: this.code})
      .then(()=>{this.name = ''; this.code = ''; this.filterProjects()})
    },
    removeProject(code){
      this.$store.dispatch('removeProject', code);
    },
    filterProjects(){
      this.$store.commit('filterProjects', {name: this.name, code: this.code});
    }
  }
}
</script>
