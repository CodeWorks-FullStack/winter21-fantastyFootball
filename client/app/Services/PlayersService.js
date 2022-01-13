/* eslint-disable no-undef */
import { ProxyState } from '../AppState.js'
import { Player } from '../Models/Player.js'
import { logger } from '../Utils/Logger.js'
import { api, footballApi } from './AxiosService.js'

class PlayersService {
  async removePlayer(playerId) {
    const res = await api.delete(`api/players/${playerId}`)
    console.log('delete player res', res.data)
    ProxyState.myPlayers = ProxyState.myPlayers.filter(p => p.id !== playerId)
    return new Player(res.data)
  }

  async getMyPlayers() {
    const res = await api.get('api/players')
    ProxyState.myPlayers = res.data.map(p => new Player(p))
    console.log('ProxyState.myPlayers', ProxyState.myPlayers)
  }

  async addPlayer(playerId) {
    const foundPlayer = ProxyState.players.find(p => p.playerId === playerId)
    const res = await api.post('api/players', foundPlayer)
    ProxyState.myPlayers = [...ProxyState.myPlayers, new Player(res.data)]
    console.log('ProxyState.myPlayers', ProxyState.myPlayers)
    return new Player(res.data)
  }

  searchPlayers(searchTerm) {
    const reg = RegExp(searchTerm, 'ig')
    const foundPlayers = ProxyState.players.filter(p => reg.test(p.fullname) || reg.test(p.position))
    ProxyState.searchedPlayers = foundPlayers
    console.log('searched players after filter', ProxyState.searchedPlayers)
  }

  async getPlayers() {
    try {
      const localData = JSON.parse(localStorage.getItem('playerData'))
      if (localData) {
        ProxyState.players = localData.players.map(p => new Player(p))
      } else {
        const res = await footballApi.get('')
        localStorage.setItem('playerData', JSON.stringify({
          players: res.data.body.players
        }))
        ProxyState.players = res.data.body.map(p => new Player(p))
      }
      logger.log('Players array after localstorage', ProxyState.players)
    } catch (error) {
      logger.log(error)
    }
  }
}

export const playersService = new PlayersService()
