// export default function () {
//   return {
//     SET_COIN (state, data) {
//       state.coin = data
//     }
//   }
// }

export const SET_DATA = (state, data) => {
  state.bitcoin = data.bitcoin
  state.currencies = data.currencies
  state.stocks = data.stocks
  state.taxes = data.taxes
}

export const SET_USER = (state, data) => {
  state.userAccount.push(data)
}
