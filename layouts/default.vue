<template>
  <div>
    <header>
      <b-container>
        <b-row>
          <b-col cols="2"><logo /></b-col>
          <b-col>
            <h1>PictoPlots</h1>
            <p>PictoPlots is a fun movie trivia game with picture icons.</p>
          </b-col>
        </b-row>
      </b-container>
    </header>
    <nuxt />
  </div>
</template>
<script>
import Logo from '~/components/Logo.vue'
export default {
  name: 'default',
  components: {
    Logo
  }
}
</script>
