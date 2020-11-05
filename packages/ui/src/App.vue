<template>
  <v-app>
    <Navigation v-if="$store.getters['auth/isUserLogged']"/>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navigation from '@/views/admin/Navigation.vue';
import LoginShortcutTrigger from '@/components/LoginShortcutTrigger.vue';

@Component({
  components: { Navigation },
})
export default class App extends Vue {}
</script>
