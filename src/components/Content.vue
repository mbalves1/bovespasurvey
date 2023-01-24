<template>
<div style="background: #2F2F38;">
  <div class="title">
    <q-text>Escolha quais items deseja visualizar</q-text>
  </div>

  <span class="flex items-center justify-center">
    <div class="q-pa-md" style="width: 320px">
      <q-select dark transition-show="flip-up"
        transition-hide="flip-down" outlined multiple v-model="selectedItem" :options="options" label="Visualização" />
    </div>
  </span>

  <span v-if="selectedItem.includes('Cambio')">
    <div class="title">
      <q-text>Principais cambios e cotações</q-text>
    </div>
    <div class="q-pa-md boxx">
      <div v-for="(i, index) in currencies" :key="index" class="boxx--cards">
        <Tilt>
          <q-card
            class="boxx--cards--card text-black"
          >
            <q-card-section>
              <div class="text-h6 q-ma-sm flex">
                <span :style="i.variation > 0 ? 'color: green' : 'color: red'">
                  <span v-if="i.variation > 0">
                    <q-icon color="green" name="trending_up" />
                  </span>
                  <span v-else>
                    <q-icon color="red" name="trending_down" />
                  </span>
                  {{i.name}} - {{index}}</span>
              </div>
            </q-card-section>
            <q-separator ></q-separator>

            <q-card-section class="q-pt-lg">
              <span style="border-left: 2px solid orange; height: 30px; padding-right: 5px"></span>
              <span style="font-weight: 500;" class="q-mt-md">Compra</span> {{format(i.buy)}}<br />
              <span style="border-left: 2px solid gray; height: 30px; padding-right: 5px"></span>
              <span style="font-weight: 500" class="q-mt-md">Venda</span> {{format(i.sell)}}<br />
              <span style="border-left: 2px solid blue; height: 30px; padding-right: 5px"></span>
              <span style="font-weight: 500" class="q-mt-md">Variação </span><span :style="i.variation > 0 ? 'color: green' : 'color: red'"> {{i.variation}}</span><br />
            </q-card-section>
          </q-card>
        </Tilt>
      </div>
    </div>
  </span>

  <span v-if="selectedItem.includes('Cotação')">
    <div class="title">
      <q-text>Principais índices e cotações</q-text>
    </div>
    <div class="q-pa-md boxx">
      <div v-for="(i, index) in stocks" :key="index" class="boxx--cards">
        <Tilt>
          <q-card
            class="boxx--cards--card text-black"
          >
            <q-card-section>
              <div class="text-h6 q-ma-sm flex">
                <span :style="i.variation > 0 ? 'color: green' : 'color: red'">
                  <span v-if="i.variation > 0">
                    <q-icon color="green" name="trending_up" />
                  </span>
                  <span v-else>
                    <q-icon color="red" name="trending_down" />
                  </span>
                  {{index}}</span>
              </div>
            </q-card-section>
            <q-separator ></q-separator>

            <q-card-section class="q-pt-lg">
              <span style="border-left: 2px solid orange; height: 30px; padding-right: 5px"></span>
              <span style="font-weight: 500;" class="q-mt-md">Compra</span> {{i.points}}<br />
              <span style="border-left: 2px solid blue; height: 30px; padding-right: 5px"></span>
              <span style="font-weight: 500" class="q-mt-md">Variação </span><span :style="i.variation > 0 ? 'color: green' : 'color: red'"> {{i.variation}}</span><br />
            </q-card-section>
          </q-card>
        </Tilt>
      </div>
    </div>
  </span>
</div>
</template>

<script>
import Tilt from 'vanilla-tilt-vue'

import axios from 'axios'
import { mapMutations, mapState } from 'vuex'
import { Notify } from 'quasar'

export default {
  created () {
    this.getCoin()
    this.timer = setInterval(this.getCoin, 20000)
  },
  components: { Tilt },
  data () {
    return {
      selectedItem: ['Cambio', 'Cotação'],
      options: ['Cambio', 'Cotação']
    }
  },
  computed: {
    ...mapState('Coin', {
      currencies: 'currencies',
      stocks: 'stocks',
      taxes: 'taxes'
    })
  },
  methods: {
    ...mapMutations('Coin', {
      setCoin: 'SET_COIN'
    }),
    format (value) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    },
    getCoin () {
      axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdacxi%2Ccosmos%2Cterra-luna&vs_currencies=usd&include_24hr_vol=true&include_market_cap=true')
        .then((data) => {
          this.coins = data.data
          this.setCoin(data.data)
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    cancelAutoUpdate () {
      clearInterval(this.timer)
    }
  },
  watch: {
    'selectedItem' (val) {
      console.log('val', val)
      if (val.length === 0) {
        Notify.create({
          message: 'Para visualizar os dados escolha pelo menos uma opção'
        })
      }
    }
  },
  beforeUnmount () {
    this.cancelAutoUpdate()
  }
}
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: center;
  margin: 40px 0 20px 0;
  font-size: 32px;
  font-weight: 700;
  color: #f2f2f2;
}
.boxx {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin: 0 40px;
  &--cards {
    display: grid;
    width: 290px;
    gap: 20px;
  }
}

@media (max-width: 631px) {
  .title {
    display: flex;
    justify-content: center;
    margin: 40px 0 20px 0;
    font-size: 17px;
    font-weight: 700;
  }
  .boxx {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
