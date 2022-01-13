import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PlayerSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    fullname: { type: String, required: true },
    age: { type: Number, required: true },
    position: { type: String, required: true },
    jerseyNumber: { type: String, required: true },
    team: { type: String, required: true },
    byeweek: { type: String, required: true },
    imgURL: { type: String, required: true },
    playerId: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

// NOTE maybe we should only allow users to pick a player once

PlayerSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

// NOTE if we wanted to extend our app to allow teams, and be able to populate that team onto the player

// PlayerSchema.virtual('team', {
//   localField: 'teamId',
//   foreignField: '_id',
//   ref: 'Team',
//   justOne: true
// })
