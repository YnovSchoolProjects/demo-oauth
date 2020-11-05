<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex>
        <v-row>
          <v-card tile class="col-6 offset-3" :elevation="6"> prout </v-card>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {}
</script>
