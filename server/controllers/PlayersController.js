import { Auth0Provider } from '@bcwdev/auth0provider'
import { playersService } from '../services/PlayersService'
import BaseController from '../utils/BaseController'

export class PlayersController extends BaseController {
  constructor() {
    super('api/players')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getTeamPlayers)
      .get('/search', this.searchMyPlayers)
      .get('/:id', this.getPlayerById)
      .post('', this.addPlayer)
      .delete('/:id', this.removePlayer)
  }

  async getTeamPlayers(req, res, next) {
    try {
      const teamPlayers = await playersService.getTeamPlayers({ creatorId: req.userInfo.id })
      res.send(teamPlayers)
    } catch (error) {
      next(error)
    }
  }

  async getPlayerById(req, res, next) {
    try {
      const foundPlayer = await playersService.getPlayerById(req.params.id)
      res.send(foundPlayer)
    } catch (error) {
      next(error)
    }
  }

  async searchMyPlayers(req, res, next) {
    try {
      const searchedPlayers = await playersService.searchPlayers(req.query)
      res.send(searchedPlayers)
    } catch (error) {
      next()
    }
  }

  async addPlayer(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const addedPlayer = await playersService.addPlayer(req.body)
      res.send(addedPlayer)
    } catch (error) {
      next(error)
    }
  }

  async removePlayer(req, res, next) {
    try {
      const removedPlayer = await playersService.removePlayer(req.params.id, req.userInfo.id)
      res.send(removedPlayer)
    } catch (error) {
      next(error)
    }
  }
}
