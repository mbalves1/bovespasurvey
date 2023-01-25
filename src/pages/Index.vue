<template>
  <div>
    <Header></Header>
    <div class="slider">
      <div class="slide-track" style="z-index: 10">
        <div class="slide" v-for="(i, index) in array" :key="i">
          <div class="q-pa-md carousel d-flex column items-center">
            <span :style="i.variation > 0 ? 'color: green' : 'color: red'">{{index === 'source' ? '' : index}}</span>
            <span :style="i.variation > 0 ? 'color: green' : 'color: red'">
              {{i.variation === $NaN ? '' : `${i.variation}%`}}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- <q-page class="flex flex-center"> -->
    <div class="container" style="height: 100vh">
      <!-- <component :is="routeComponent"></component> -->
      <Content></Content>
    </div>
    <!-- </q-page> -->
</div>
</template>

<script>
import { defineComponent } from 'vue'

// Componnet
import Header from 'src/components/Header.vue'
import Content from 'src/components/Content.vue'

// mixins
import get from 'src/mixins/get.js'

// Lib
import { mapActions, mapState } from 'vuex'

export default defineComponent({
  components: { Header, Content },
  mixins: [get],
  name: 'PageIndex',
  created () {
    this.getData()
  },
  computed: {
    ...mapState('Coin', {
      bitcoin: 'bitcoin',
      currencies: 'currencies',
      stocks: 'stocks',
      taxes: 'taxes'
    }),
    array () {
      const newArray = { ...this.bitcoin, ...this.currencies, ...this.stocks }
      return newArray
    }
  },
  methods: {
    ...mapActions('Coin', {
      getData: 'getData'
    })
  }
})
</script>
<style lang="scss" scoped>
.carousel {
  font-size: 12px;
  font-weight: 700;
  padding-top: 20px;
  span {
    color: #343a40;
  }
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 350px;
}
/* body {
  align-items: center;
  background: #e3e3e3;
  display: flex;
  height: 100vh;
  justify-content: center;
} */
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100px * 5));
  }
}
.slider {
  // background: #3e3e49;
  // box-shadow: 0 10px 20px -5px #3e3e49;
  height: 55px;
  margin: auto;
  overflow: hidden;
  position: relative;
  width: 500px;
  margin-bottom: 20px;
}
.slider::before, .slider::after {
  background: linear-gradient(to right, var(--bs-light-gray) 0%, rgba(255, 255, 255, 0) 1%);
  content: "";
  height: 100px;
  position: absolute;
  width: 50px;
  z-index: 2;
}
.slider::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
.slider::before {
  left: 0;
  top: 0;
}
.slider .slide-track {
  animation: scroll 20s linear infinite;
  display: flex;
  width: calc(100px * 5);
  max-width: 500px;
}
.slider .slide {
  height: 100px;
  width: 100px;
  padding-left: 20px;
}

@media (max-width: 768px) {
  .slider {
    width: 768px;
  }
}

@media (max-width: 425px) {
  .slider {
    width: 100%;
  }
}

@media (max-width: 375px) {
  .slider {
    width: 100%;
  }
}
</style>
