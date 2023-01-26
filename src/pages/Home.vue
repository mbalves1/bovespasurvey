<template>
  <div class="flex flex-center container theme--dark">
    <div class="container--card">
      <div class="container--card--logo">
        <img src="https://d1in87wuzwnqr6.cloudfront.net/wp-content/uploads/2022/10/LOGO.svg" alt="" srcset="">
      </div>

      <div>
        <div v-if="create">
          <p class="q-mt-lg" color="white">ENTRE NA SUA CONTA</p>

          <q-input dark
          lazy-rules :rules="[ val => val && val.length > 0 || 'E-mail obrigatório']" class="" outlined v-model="emailClient" label="Digite seu e-mail" color="white" />

          <q-input dark lazy-rules :rules="[ val => val && val.length > 0 || 'Digite sua senha']" v-model="passwordClient" class="q-mt-sm" outlined :type="isPwd ? 'password' : 'text'" color="white" label="Digite seu acesso">
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
          <p class="q-mt-lg" color="white">CADASTRE SUA CONTA</p>
          <q-input dark class="q-mt-sm" @blur="validateAccount"
          lazy-rules :rules="[ val => val && val.length > 0 || 'Por favor, digite seu nome']" outlined v-model="name" label="Digite seu nome" color="white" />

          <q-input lazy-rules @blur="validateAccount" :rules="[ val => val && val.length > 0 || 'Escolha seu melhor e-mail']" dark class="q-mt-sm" outlined v-model="emailCreate" label="Digite seu e-mail" color="white" />

          <q-input lazy-rules @blur="validateAccount" :rules="[ val => val && val.length > 0 || 'Escolha uma senha']" dark v-model="passCreate" class="q-mt-sm cursor-pointer" outlined :type="isPwd ? 'password' : 'text'" color="white" label="Digite seu acesso">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="d-flex column items-center">
            <q-btn @click="createAccount" :disabled="disabledCreateButton" color="secondary q-mt-sm" rounded style="width:190px" label="Create Account"></q-btn>
            <q-btn @click="loginBack" color="secondary q-mt-lg" rounded style="width:190px" label="Logar"></q-btn>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// import { VueFlip } from 'vue-flip';
// Libs
import { Notify } from 'quasar'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'LoginPage',
  data () {
    return {
      name: '',
      passwordClient: '',
      emailClient: '',
      emailCreate: '',
      passCreate: '',
      create: true,
      isPwd: true,
      disabledCreateButton: true
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
      setUser: 'SET_USER',
      setAccess: 'SET_ACCESS'
    }),
    createAccount () {
      const { name, passCreate, emailCreate, userAccount, setUser } = this
      const hasAccount = userAccount.find(({ email }) => {
        if (email === emailCreate) {
          Notify.create({
            message: 'E-mail já cadastrado!',
            color: 'teal'
          })
          return false
        } else {
          this.create = true
          const accountCreated = {
            name, pass: passCreate, email: emailCreate
          }
          setUser(accountCreated)
          Notify.create({
            message: 'Legal! Conta cadastrada com sucesso.',
            color: 'teal'
          })
          return localStorage.setItem('reason', JSON.stringify({ name, email: emailCreate, item: `${name}1${emailCreate}` }))
        }
      })
      return hasAccount
    },
    validateAccount () {
      const { name, emailCreate, passCreate } = this
      if (name && emailCreate && passCreate) {
        this.disabledCreateButton = false
      } else {
        this.disabledCreateButton = true
      }
    },
    loginBack () {
      this.create = true
    },
    login () {
      const { userAccount, emailClient, passwordClient, setAccess } = this
      const randomNumber = Math.random() * (100000 - 1) + 1
      const hasAccount = userAccount.filter((user) => {
        if (user.email !== emailClient) {
          console.log('aqui')
          return Notify.create({
            message: 'Conta não encontrada, verifique sua senha e email, por favor.',
            color: 'negative'
          })
        }
        if (user.email === emailClient) {
          if (user.pass === passwordClient) {
            localStorage.setItem('access', JSON.stringify(`${randomNumber}1${emailClient}`))
            setAccess(`${randomNumber}1${emailClient}`)
            this.$router.push({ path: '/view' })
            return true
          }
          return true
        }
        return false
      })
      return hasAccount
    }
  }
}
</script>
<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

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
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2F2F38;
  height: 100vh;
  &--card {
    display: flex;
    // justify-content: center;
    flex-direction: column;
    width: 422px;
    height: auto;
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
