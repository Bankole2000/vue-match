<template>
  <div class="footer mt-12">
    <v-footer
    light
    padless
  >
    <v-card

      tile
      class="light darken-1 white--text text-center"
    >
      <v-card-text>
        <v-btn
          v-for="(icon,i) in icons"
          :key="i"
          class="mx-4 primary--text"
          icon
          text
        >
          <a :href="(icon.link)" target="_blank" rel="noreferrer"
        class="secondary--text text-darken-3">
            <v-icon size="24px">{{ icon.i }}</v-icon>
            <span style="font-size: 0px;">{{ icon.title }}</span>
          </a>
        </v-btn>
      </v-card-text>

      <v-card-text class="secondary--text text-darken-5 pt-0 px-12">
        <span class="primary--text">Match Maker</span> is a simple Memory Game built
        with <span class="primary--text"><i class="mdi mdi-vuejs"></i> VueJS</span> and
        <span class="primary--text"><i class="mdi mdi-vuetify"></i> Vuetify</span> for practice
        and demonstration purposes.
        <a href="http://bankole2000.github.io/portfolio" target="_blank" rel="noreferrer">
        <span class="primary--text font-weight-bold">The Developer</span></a> is currently
        available for projects, collaborations, training and/or remote employment.
        Feel free to <a href="tel:+2348069166906">
          <span class="primary--text"><i class="mdi mdi-phone-in-talk"></i> Call</span></a> or
          <a href="mailto:techybanky@gmail.com">
          <span class="primary--text"><i class="mdi mdi-email"></i> Send an email</span></a>.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="secondary--text text-darken-5">
        &copy; {{ new Date().getFullYear() }} —
        <a href="https://bankole2000.github.io/portfolio"
        rel="noreferrer"><strong>Bankole Esan</strong></a>
      </v-card-text>
    </v-card>
  </v-footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      icons: [
        { i: 'mdi mdi-facebook', link: 'https://facebook.com/esan.bankole', title: 'facebook link' },
        { i: 'mdi mdi-twitter', link: 'https://twitter.com/bankolealexesan', title: 'twitter link' },
        { i: 'mdi mdi-linkedin', link: 'https://www.linkedin.com/in/bankoleesan', title: 'linkedIn link' },
        { i: 'mdi mdi-discord', link: 'https://discord.gg/HeAVxtM', title: 'discord link' },
        { i: 'mdi mdi-github', link: 'https://github.com/bankole2000', title: 'github link' },
      ],
    };
  },
};
</script>

<style>
  a {
    text-decoration: none;
  }
</style>
