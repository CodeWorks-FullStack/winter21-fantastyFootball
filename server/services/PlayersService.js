import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class PlayersService {
  async getTeamPlayers(data) {
    const foundPlayers = await dbContext.Players.find(data).populate('creator', 'name picture')
    return foundPlayers
  }

  async getPlayerById(id) {
    const foundPlayer = await dbContext.Players.findById(id).populate('creator', 'name picture')
    if (!foundPlayer) {
      throw new BadRequest('Unable to find that player')
    }
    return foundPlayer
  }

  async searchPlayers(query = {}) {
    // NOTE this is how to paginate!!!!
    const totalPages = Math.ceil(await dbContext.Players.find(query).count() / 5)
    const page = query.page || 1
    delete query.page
    const searchedPlayers = await dbContext.Players.find(query).populate('creator', 'name picture').limit(5).skip((page - 1) * 5)
    return { results: searchedPlayers, page, totalPages }
    // const searchedPlayers = await dbContext.Players.find(query)
    // return searchedPlayers
  }

  async addPlayer(playerData) {
    const addedPlayer = await dbContext.Players.create(playerData)
    return addedPlayer
  }

  async removePlayer(playerId, creatorId) {
    const playerToRemove = await this.getPlayerById(playerId)
    if (playerToRemove.creatorId.toString() !== creatorId) {
      throw new BadRequest('Unauthorized to delete')
    }
    await playerToRemove.remove()
    return playerToRemove
  }
}

export const playersService = new PlayersService()
