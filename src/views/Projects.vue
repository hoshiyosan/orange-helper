<template>
  <div class="projects">
    <form class="input-group mb-3">
      <input type="text" class="form-control" style="flex: 1" placeholder="Nom du projet">
      <input type="text" class="form-control" style="flex: 2" placeholder="Code projet">

      <div class="input-group-prepend">
        <button class="btn btn-secondary" type="submit">Ajouter</button>
      </div>
    </form>

    <div class="list-group">
      <a href="#" class="list-group-item list-group-item-action" @click="selectProject()" v-for="project of projects" :key="project.code">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{project.name}}</h5>
          <button class="icon-btn danger" @click.stop="deleteProject()"><span class="material-icons">delete</span></button>
        </div>
        <small>{{project.code}}</small>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Projects',
  data(){
    return {
      projects: [
        {
          name: 'Moon',
          code: 'ABF-CU-BUILD-ORANGE SA-OLP0127211A'
        },
        {
          name: 'BNPP',
          code: 'ABF-CU-BUILD-ORANGE SA-OBS1764103R'
        },
        {
          name: 'Attente projet',
          code: 'ABF-MU-EN ATTENTE DE PROJET'
        },
        {
          name: 'Congés',
          code: 'ALL-GA-GEN9999'
        }
      ]
    }
  },
  components: { },
  methods: {
    selectProject(){
      alert('selectProject not implemented');
    },
    deleteProject(){
      alert('deleteProject not implemented');
    }
  }
}
</script>
