<template>
<div style="background: #2F2F38;">
  <div class="title">
    <q-text>Escolha quais items deseja visualizar</q-text>
  </div>

  <span class="flex items-center justify-center row">
    <div class="q-pa-md" style="width: 320px">
      <q-select dark transition-show="flip-up"
        transition-hide="flip-down" outlined multiple v-model="selectedItem" :options="options" label="Visualização" />
    </div>

    <div class="q-pa-md boxx column">
      <div v-for="(i, index) in taxes" :key="index" class="boxx--cards">
          <span class="boxx--cards--title">Principais taxas {{fomatDay}}</span>
            <div class="boxx--cards--title--items">
              <span>Daily Factor {{i.daily_factor}}%</span>
              <span>Selic {{i.selic}} %</span>
              <span>Selic Diária {{i.selic_daily}}%</span>
              <span>CDI Diária {{i.cdi}}%</span>
              <span>CDI {{i.cdi_daily}}%</span>
            </div>
      </div>
    </div>

  </span>

  <span v-if="selectedItem.includes('Cambio')">
    <div class="title">
      <q-text>Principais cambios e cotações em relação ao Real - BRL</q-text>
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
                  <span>{{index === 'source' ? i : i.name}} - {{index === 'source' ? '' : index}}</span>
                </span>
              </div>
            </q-card-section>
            <q-separator ></q-separator>

            <q-card-section class="q-pt-lg" v-if="index === 'source' ? '' : true">
              <span style="border-left: 2px solid orange; height: 30px; padding-right: 5px"></span>
              <span style="font-weight: 500;" class="q-mt-md">Compra</span> {{format(i.buy, 'pt')}}<br />
              <span style="border-left: 2px solid gray; height: 30px; padding-right: 5px"></span>
              <span style="font-weight: 500" class="q-mt-md">Venda</span> {{format(i.sell, 'pt')}}<br />
              <span style="border-left: 2px solid blue; height: 30px; padding-right: 5px"></span>
              <span style="font-weight: 500" class="q-mt-md">Variação </span><span :style="i.variation > 0 ? 'color: green' : 'color: red'"> {{i.variation}}%</span><br />
            </q-card-section>
          </q-card>
        </Tilt>
      </div>
    </div>
  </span>

  <span v-if="selectedItem.includes('Bitcoin')">
    <div class="title">
      <q-text>Principais cambios e cotações - USD</q-text>
    </div>
    <div class="q-pa-md boxx">
      <div v-for="(i, index) in bitcoin" :key="index" class="boxx--cards">
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
                  {{i.name}}</span>
              </div>
            </q-card-section>
            <q-separator ></q-separator>

            <q-card-section class="q-pt-lg">
              <span style="border-left: 2px solid orange; height: 30px; padding-right: 5px"></span>
              <span style="font-weight: 500;" class="q-mt-md">Compra </span> {{format(i.buy || 0 , 'US')}}<br />
              <span style="border-left: 2px solid orange; height: 30px; padding-right: 5px"></span>
              <span style="font-weight: 500;" class="q-mt-md">Venda</span> {{format(i.sell || 0, 'US')}}<br />
              <span style="border-left: 2px solid gray; height: 30px; padding-right: 5px"></span>
              <span style="font-weight: 500" class="q-mt-md">Última negociação</span> {{format(i.last)}}<br />
              <span style="border-left: 2px solid blue; height: 30px; padding-right: 5px"></span>
              <span style="font-weight: 500" class="q-mt-md">Variação </span><span :style="i.variation > 0 ? 'color: green' : 'color: red'"> {{i.variation}}%</span><br />
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
              <span style="font-weight: 500;" class="q-mt-md">Compra</span> {{format(i.points, 'pt')}}<br />
              <span style="border-left: 2px solid blue; height: 30px; padding-right: 5px"></span>
              <span style="font-weight: 500" class="q-mt-md">Variação </span><span :style="i.variation > 0 ? 'color: green' : 'color: red'"> {{i.variation}}%</span><br />
            </q-card-section>
          </q-card>
        </Tilt>
      </div>
    </div>
  </span>
</div>
</template>

<script>
// import axios from 'axios'

import Tilt from 'vanilla-tilt-vue'
// import Moment from 'moment'
import { mapState } from 'vuex'
import { Notify } from 'quasar'

export default {
  created () {
    const hasAccount = localStorage.getItem('access')
    if (hasAccount === null) {
      this.$router.push({ path: '/' })
    }
    if (this.accessUser) {
      this.$router.push({ path: '/view' })
    }
    setTimeout(() => {
      localStorage.removeItem('access')
      this.$router.push({ path: '/' })
    }, 50000)
  },
  components: { Tilt },
  data () {
    return {
      selectedItem: ['Cambio', 'Cotação', 'Bitcoin'],
      options: ['Cambio', 'Cotação', 'Bitcoin']
    }
  },
  computed: {
    ...mapState('Coin', {
      currencies: 'currencies',
      stocks: 'stocks',
      taxes: 'taxes',
      bitcoin: 'bitcoin',
      accessUser: 'accessUser'
    }),
    fomatDay () {
      var data = new Date(),
        dia = data.getDate().toString().padStart(2, '0'),
        mes = (data.getMonth() + 1).toString().padStart(2, '0'),
        ano = data.getFullYear()
      return `${dia}/${mes}/${ano}`
    },
    currencieArray () {
      const newArray = delete this.currencies.source
      return newArray
    }
  },
  methods: {
    format (value, lenguage) {
      if (lenguage === 'pt') {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
      } else {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
      }
    }
  },
  watch: {
    'selectedItem' (val) {
      console.log('val', val)
      if (val.length === 0) {
        Notify.create({
          message: 'Para visualizar os dados escolha pelo menos uma opção',
          color: 'teal'
        })
      }
    }
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

    &--title {
      color: #f2f2f2;
      font-weight: bold;

      &--items {
        color: #f2f2f2;
        display: flex;
        flex-direction: column;
      }
    }
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
