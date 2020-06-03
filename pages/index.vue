<template>
  <div>
    <b-container>
      <b-row>
        <b-col class="text-center">
          <p>Step 1. Take a look a look at these pictures below.</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="text-center" v-if="!nounsLoaded">
            <p class="text-small">Loading...up the word puzzle</p>
            <b-spinner variant="success" label="Spinning"></b-spinner>
          </div>
          <img v-for="(img, index) in imgs" v-bind:key="index" style="width: 50px;" :src="img" />
        </b-col>
      </b-row>
      <b-row>
          <b-col cols="12" class="text-center">
            <p>Step 2. Take a guess at which movie you think it is.</p>
          </b-col>
          <span v-for="item in items" v-bind:key="item.imdbID">
            <b-col><img :src="item.Poster" class="movie-poster"/></b-col>
          </span>
      </b-row>
      <b-row>
        <b-col cols="12" class="text-center">
          <p>Step 3. Click the button below to see the answear.</p>
        </b-col>
        <b-col class="text-center">
          <div class="show-cta">
            <b-button @click="showTitle()">Reveal Movie Title</b-button>
            <div v-if="revealTitle" class="reveal-text">{{  title }}</div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios'
import imdbs from '@/setup.js'

export default {
  components: {
    Logo
  },
   data(){
    return {
      count: {},
      revealTitle: false,
      nounsLoaded: false,
      title: {},
      items: {},
      imgs: {}
    }
  },
  async mounted () {
    console.log(process.env.OMDBS_API_KEY)
    let self = this,
        getOmdbs = imdbs.map(async (id, idx) => {
          let api = await axios.get('http://www.omdbapi.com/', { params: { apikey: '1e7c1b1c', i: id, r: 'json'} })
          return api.data
        }),
        omdbsResults = await Promise.all(getOmdbs)

    self.count = Math.floor(( Math.random() * 10) + 1)
    self.items = omdbsResults
    
    let words = self.items[ self.count ].Plot.split(" "),
        wordMap = words.map(async (wdata, idx) => {
          let api = await axios.post(`/api`, { noun: wdata })
          self.title = self.items[self.count].Title
          return api.data.icon_url
        }),
        nounResults = await Promise.all(wordMap)
    
    self.imgs = nounResults.filter(Boolean)
    if (self.imgs.length > 1){
      self.nounsLoaded = true 
    }
    
  },
  methods: {
    showTitle(){
      let self = this
      self.revealTitle = true
    }
  }
}
</script>

<style>
@import '@/assets/css/main.css';
</style>
