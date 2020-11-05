<template>
  <v-container class="fill-height" fluid data-testid="login:container">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Connexion</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <ValidationObserver ref="observer">
              <ValidationProvider rules="required" name="username" v-slot="{ errors }">
                <v-text-field
                  v-model="username"
                  @keydown.enter="handleLogin"
                  :error-messages="errors"
                  label="Email"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                />
              </ValidationProvider>
              <ValidationProvider rules="required" name="password" v-slot="{ errors }">
                <v-text-field
                  v-model="password"
                  @keydown.enter="handleLogin"
                  :error-messages="errors"
                  label="Mot de passe"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                />
              </ValidationProvider>
            </ValidationObserver>
          </v-card-text>
          <v-card-actions>
            <v-btn :to="{ name: 'landing' }">
              <v-icon left>mdi-chevron-left</v-icon>
              Back
            </v-btn>
            <v-spacer />
            <v-btn color="primary" @click="handleLogin">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import MessageBus from '@/services/message-bus';
import { Component, Vue } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class Login extends Vue {
  private username: string | null = null;
  private password: string | null = null;

  $refs!: {
    observer: InstanceType<typeof ValidationObserver>;
  };

  async handleLogin() {
    if (await this.$refs.observer.validate()) {
      const result = await this.$store.dispatch('auth/login', { username: this.username, password: this.password });

      if (result.status) {
        await this.$router.push({ name: 'home' });
      } else {
        MessageBus.$emit('toast', { color: 'danger', message: result.message });
      }
    }
  }
}
</script>
