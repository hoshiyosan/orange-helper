import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    projectsFilters: {name: '', code: ''},
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
    ],
    workingHours: [
      {
        project: 'ABF-CU-BUILD-ORANGE SA-OLP0127211A',
        date: new Date(),
        hours: 8
      },
      {
        project: 'ABF-CU-BUILD-ORANGE SA-OBS1764103R',
        date: new Date(),
        hours: 4
      },
      {
        project: 'ALL-GA-GEN9999',
        date: new Date(),
        hours: 4
      },
      {
        project: 'ABF-CU-BUILD-ORANGE SA-OLP0127211A',
        date: new Date(),
        hours: 8
      },
      {
        project: 'ABF-CU-BUILD-ORANGE SA-OLP0127211A',
        date: new Date(),
        hours: 8
      }
    ],
    selectedProject: null
  },
  getters: {
    projects: state => {
      let countHours = {};
      for(let workingHour of state.workingHours){
        console.log(workingHour.hours);
        if(countHours[workingHour.project] === undefined) countHours[workingHour.project] = 0;
        countHours[workingHour.project] += workingHour.hours;
      }
      let projects = [];
      for(let project of state.projects){
        projects.push({
          name: project.name,
          code: project.code,
          hours: countHours[project.code] || 0,
          days: (countHours[project.code] || 0)/8
        })
      }
      return projects.filter(project => project.name.toLocaleLowerCase().includes(state.projectsFilters.name) && project.code.toLocaleLowerCase().includes(state.projectsFilters.code));
    },
    workingHours: state => {
      return state.workingHours
    },
    selectedProject: state => {
      return state.selectedProject
    },
    selectedProjectImputations: state => {
      return state.workingHours.filter(imputation=>imputation.project === state.selectedProject.code)
    },
    countTotalHours: state => {
      return state.workingHours
      .filter(imputation=>imputation.project === state.selectedProject.code)
      .map(imputation=>imputation.hours)
      .reduce((count, value)=>count+value, 0)
    }
  },
  mutations: {
    filterProjects: (state, {name, code}) => {
      name = name || '';
      code = code || '';
      state.projectsFilters = {name: name.toLowerCase(), code: code.toLowerCase()};
    },
    addProject(state, project){
      state.projects.push(project);
    },
    removeProject(state, code){
      state.projects = state.projects.filter(project=>project.code !== code);
    },
    setSelectedProject(state, code){
      state.selectedProject = state.projects.filter(project=>project.code === code)[0];
      console.log(state.selectedProject);
    }
  },
  actions: {
    addProject({commit}, {name, code}){
      return new Promise(resolve=>{
        commit('addProject', {name, code});
        resolve();
      });
    },
    removeProject({commit}, code){
      return new Promise(resolve=>{
        commit('removeProject', code);
        resolve();
      });
    }
  }
})
