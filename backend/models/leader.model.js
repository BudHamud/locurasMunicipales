import mongoose from "mongoose";

const { Schema } = mongoose;

const leaderSchema = new Schema({
  option: { type: Number, required: true },
  name: { type: String, required: true },
  img: { type: String, required: true },
  ideology: { type: String, required: true },
  stats: {
    money: { type: Number, required: true },
    corruption: { type: Number, required: true },
    popularity: { type: Number, required: true },
    influence: { type: Number, required: true },
    satisfaction: { type: Number, required: true },
    unemployment: { type: Number, required: true },
    crime: { type: Number, required: true },
    health: { type: Number, required: true },
    education: { type: Number, required: true },
  },
  specialAbilities: [{
    description: { type: String, required: true },
    effect: { type: Schema.Types.Mixed, required: true }
  }]
});

const leaderModel = mongoose.model("leaders", leaderSchema);

export default leaderModel;
