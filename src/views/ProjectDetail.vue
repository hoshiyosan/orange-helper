<template>
    <div v-if="selectedProject">
        <header class="title">
            <div>
                <h2>Projet: {{selectedProject.name}}</h2>
                <i>{{selectedProject.code}}</i>
            </div>
            <button class="btn btn-primary"><span class="material-icons">get_app</span>Télécharger au format CSV</button>
        </header>
        
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Jour</th>
                        <th>Heures</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="imputation in selectedProjectImputations" :key="imputation.date">
                        <td>{{imputation.date}}</td>
                        <td>{{imputation.hours}}</td>
                    </tr>
                    <tr>
                        <th>Total sur période</th>
                        <th>{{countTotalHours}}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters(['selectedProject', 'selectedProjectImputations', 'countTotalHours'])
    },
    mounted(){
        if(!this.$route.params.projectCode) this.$router.push({name: "Projects"});
        this.$store.commit('setSelectedProject', this.$route.params.projectCode);
    }
}
</script>

<style>
th{
    font-weight: bold !important;
}
</style>