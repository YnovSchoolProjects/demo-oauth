<template>
  <v-app-bar app color="primary">
    <div class="d-flex align-center">
      <v-btn :to="{ name: 'home' }" class="ml-5" tile x-large icon color="primary">
        <v-img
          class="shrink mr-2"
          contain
          src="../../assets/logo_white_sm.png"
          transition="scale-transition"
          width="60"
        />
      </v-btn>
    </div>

    <v-spacer />

    <div class="d-flex align-right" v-if="isUserLogged">
      <v-btn :to="{ name: 'projects' }" text color="accent" class="ma-2">Projets</v-btn>
      <v-btn :to="{ name: 'medias' }" text color="accent" class="ma-2">Médias</v-btn>
      <v-btn :to="{ name: 'logout' }" text color="accent" class="ma-2">Déconnexion</v-btn>
    </div>
    <div class="d-flex align-right" v-else>
      <v-btn :to="{ name: 'login' }" text color="accent">Connexion</v-btn>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  get isUserLogged() {
    return this.$store.getters['auth/isUserLogged'];
  }
}
</script>
