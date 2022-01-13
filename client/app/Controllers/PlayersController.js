import { ProxyState } from '../AppState.js'
import { playersService } from '../Services/PlayersService.js'
import { logger } from '../Utils/Logger.js'
import { toast } from '../Utils/Notification.js'

function drawSearchedPlayers() {
  let template = ''
  ProxyState.searchedPlayers.forEach(p => { template += p.Template })
  document.getElementById('searchedPlayers').innerHTML = template
}

function drawMyPlayers() {
  let template = ''
  ProxyState.myPlayers.forEach(p => { template += p.Template })
  document.getElementById('myPlayers').innerHTML = template
}

export class PlayersController {
  constructor() {
    ProxyState.on('searchedPlayers', drawSearchedPlayers)
    ProxyState.on('myPlayers', drawMyPlayers)
    playersService.getPlayers()
    // NOTE this doesn't work, because our token comes back AFTER this request runs
    // playersService.getMyPlayers()
  }

  async addPlayer(playerId) {
    try {
      const addedPlayer = await playersService.addPlayer(playerId)
      toast(`${addedPlayer.fullname} was added to your team - much rejoicing`)

      // @ts-ignore
    } catch (error) {
      logger.log(error)
      toast(error.message)
    }
  }

  searchPlayers() {
    window.event.preventDefault()
    const form = window.event.target
    console.log('search form', form)
    // @ts-ignore
    playersService.searchPlayers(form.searchTerm.value)
  }

  async removePlayer(playerId) {
    try {
      const removedPlayer = await playersService.removePlayer(playerId)
      toast(`${removedPlayer.fullname} was kicked off your team`)
    } catch (error) {
      logger.log(error)
      toast(error.message)
    }
  }
}
