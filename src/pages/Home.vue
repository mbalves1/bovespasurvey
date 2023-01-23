<template>
  <div class="flex flex-center container theme--dark">
    <div class="container--card">
      <div class="container--card--logo">
        <img src="https://d1in87wuzwnqr6.cloudfront.net/wp-content/uploads/2022/10/LOGO.svg" alt="" srcset="">
      </div>

      <div>
        <div v-if="create">
          <p class="q-mt-lg" color="white">ENTRE NA SUA CONTA</p>
          <q-input dark class="" outlined v-model="emailClient" label="Digite seu e-mail" color="white" />

          <q-input dark v-model="passwordClient" class="q-mt-lg" outlined :type="isPwd ? 'password' : 'text'" color="white" label="Digite seu acesso">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="d-flex column justify-center items-center q-mt-lg">
            <q-btn class="q-my-md" @click="login" type="submit" :color="passwordClient === '' ? 'grey-9' : 'light-green'" label="Acessar" rounded style="width:125px" :disabled="passwordClient !== '' ? false : true"/>

            <q-btn @click="create = false" color="secondary" rounded style="width:125px">CADASTRAR</q-btn>
          </div>
        </div>

        <div v-if="!create">
          <p class="my-7" color="white">ENTRE NA SUA CONTA</p>
          <q-input dark class="" outlined v-model="name" label="Digite seu nome" color="white" />

          <q-input dark class="" outlined v-model="emailClient" label="Digite seu e-mail" color="white" />

            <q-input dark v-model="passwordClient" class="" outlined :type="isPwd ? 'password' : 'text'" color="white" label="Digite seu acesso">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="d-flex column">
            <q-btn class="my-7" @click="createAccount" type="submit" color="primary" label="Create Account"/>
          </div>
        </div>
      </div>
<!--
      <vue-flip>
        <template v-slot:front>
          front
        </template>
        <template v-slot:back>
          back
        </template>
      </vue-flip> -->

    </div>
  </div>
</template>

<script>
// import { VueFlip } from 'vue-flip';
import axios from 'axios'
import { Notify } from 'quasar'

export default {
  name: 'LoginPage',
  // components: {
  //   'vue-flip': VueFlip
  // },
  data () {
    return {
      name: '',
      passwordClient: '',
      emailClient: '',
      create: true,
      isPwd: true,
      accounts: [
        {
          name: 'Murilo',
          pass: 123,
          email: 'murilo@email.com'
        }
      ]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      axios.get('https://api.hgbrasil.com/finance', { params: { format: 'json-cors', key: '99d62d31' } })
        .then((data) => {
          console.log(data)
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    createAccount () {
      const { name, password, emailClient, accounts } = this
      const hasAccount = accounts.find(({ email }) => {
        if (email === emailClient) {
          console.log('aqui')
          this.create = true
          return Notify.create({
            message: 'E-mail já cadastrado!',
            color: 'teal'
          })
        } else {
          const reason = {
            name, password, email: emailClient
          }
          accounts.push(reason)
          return localStorage.setItem('reason', JSON.stringify(reason))
        }
      })
      console.log('accounts', accounts)
      this.create = true
      Notify.create({
        message: 'Legal! Conta cadastrada com sucesso.',
        color: 'teal'
      })
      return hasAccount
    },
    login () {
      const { emailClient, passwordClient, accounts } = this
      const hasAccount = accounts.find(({ email, pass }) => {
        if (email === emailClient) {
          console.log('email', email)
          console.log('emailClient', emailClient)
          console.log('pass', pass)
          console.log('passwordClient', Number(passwordClient))
          return email === emailClient && pass === Number(passwordClient)
        } else {
          return Notify.create({
            message: 'Por favor, verifique seu e-mail ou senha!',
            color: 'negative'
          })
        }
      })
      console.log('accounts', accounts)
      return hasAccount
    }
  }
}
</script>
<style scoped lang="scss">
p {
  text-align: center;
  color: white;
  margin: 30px 0;
}
.container {
  background: #2F2F38;
  height: 100vh;
  &--card {
    display: flex;
    // justify-content: center;
    flex-direction: column;
    width: 422px;
    height: 532px;
    background: #2B2B31;
    border-radius: 15px;
    box-shadow: 0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)!important;
    padding: 48px;

    &--logo {
      width: 100%;
      display: flex;
      justify-content: center;
      border-bottom: 2px solid white;
      img {
        color: white;
        height: 49px;
        padding-bottom: 20px;
      }
    }
  }
}
</style>
