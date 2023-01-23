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
          <p class="q-mt-lg" color="white">ENTRE NA SUA CONTA</p>
          <q-input dark class="q-mt-lg" outlined v-model="name" label="Digite seu nome" color="white" />

          <q-input dark class="q-mt-lg" outlined v-model="emailCreate" label="Digite seu e-mail" color="white" />

            <q-input dark v-model="passCreate" class="q-mt-lg cursor-pointer" outlined :type="isPwd ? 'password' : 'text'" color="white" label="Digite seu acesso">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="d-flex column items-center">
            <q-btn @click="createAccount" color="secondary q-mt-lg" rounded style="width:190px" label="Create Account"></q-btn>
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
import { Notify } from 'quasar'
import { mapMutations, mapState } from 'vuex'

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
      emailCreate: '',
      passCreate: '',
      create: true,
      isPwd: true
    }
  },
  created () {
    // this.getData()
  },
  computed: {
    ...mapState('Coin', {
      userAccount: 'userAccount'
    })
  },
  methods: {
    ...mapMutations('Coin', {
      setUser: 'SET_USER'
    }),
    createAccount () {
      const { name, passCreate, emailCreate, userAccount, setUser } = this
      const hasAccount = userAccount.find(({ email }) => {
        if (email === emailCreate) {
          this.create = true
          return Notify.create({
            message: 'E-mail já cadastrado!',
            color: 'teal'
          })
        } else {
          const accountCreated = {
            name, pass: passCreate, email: emailCreate
          }
          setUser(accountCreated)
          return localStorage.setItem('reason', JSON.stringify({ name, email: emailCreate }))
        }
      })
      this.create = true
      Notify.create({
        message: 'Legal! Conta cadastrada com sucesso.',
        color: 'teal'
      })
      return hasAccount
    },
    console () {
      console.log('thisuysaer', this.userAccount)
    },
    login () {
      const { userAccount, emailClient, passwordClient } = this
      console.log('user', userAccount)
      const hasAccount = userAccount.filter((user) => {
        if (user.email === emailClient) {
          if (user.pass === passwordClient) {
            this.$router.push({ path: '/view' })
            console.log('user', user)
            return true
          }
          return true
        } else {
          return Notify.create({
            message: 'Conta não encontrada, verifique sua senha e email, por favor.',
            color: 'negative'
          })
        }
      })
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

@media screen and (max-width: 425px) {
  .container {
    &--card {
      margin: 10px;
      padding: 27px !important;
    }
  }
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
