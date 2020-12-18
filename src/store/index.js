import Vue from 'vue'
import Vuex from 'vuex'
import CSV from '@/libs/csv'

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
    workingHours: [],
    selectedProject: null
  },
  getters: {
    projects: state => {
      let countHours = {};
      for(let imputation of state.workingHours){
        console.log(imputation.hours);
        if(countHours[imputation.code] === undefined) countHours[imputation.code] = 0;
        countHours[imputation.code] += imputation.hours;
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
      return state.workingHours.filter(imputation=>imputation.code === state.selectedProject.code)
    },
    countTotalHours: state => {
      return state.workingHours
      .filter(imputation=>imputation.code === state.selectedProject.code)
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
    },
    setImputations(state, imputations){
      state.workingHours = imputations;
      console.log('setImputations', state.workingHours);
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
    },
    reloadImputations({commit}){
      console.log('reload imputations')
      return new Promise(resolve=>{
        chrome.storage.sync.get(['imputations'], (result) => {
          const imputations = (result.imputations || []).map(imputation=>{
              console.log("imputation date");
              imputation.date = new Date(imputation.date);
              return imputation
          });
          commit('setImputations', imputations);
          resolve();
        });
      });
    },
    downloadFullReport({state}){
      // workout project names
      let projectName = {};
      for(let project of state.projects){
        projectName[project.code] = project.name
      }
      const csv = new CSV("project", "hours", "date", "code");
      for(let imputation of state.workingHours){
        csv.addRow(
          projectName[imputation["code"]] || 'unknown',
          imputation["hours"],
          imputation["date"],
          imputation["code"]);
      }
      csv.download("imputations.csv");
    },
    downloadSelectedProjectReport({state, getters}){
      const csv = new CSV("project", "hours", "date", "code");
      for(let imputation of getters.selectedProjectImputations){
        csv.addRow(
          state.selectedProject.name,
          imputation["hours"],
          imputation["date"],
          imputation["code"]);
      }
      csv.download(`imputations_${state.selectedProject.name.toLocaleLowerCase()}.csv`);
    }
  }
})
