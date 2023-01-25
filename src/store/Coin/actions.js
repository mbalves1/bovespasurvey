import axios from 'axios'

export function getData ({ commit }) {
  axios.get('https://api.hgbrasil.com/finance', { params: { format: 'json-cors', key: '99d62d31' } })
    .then((response) => {
      const { data } = response
      const { results } = data
      commit('SET_DATA', results)
    })
    .catch((err) => {
      console.error(err)
    })
}
