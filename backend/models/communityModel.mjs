import mongoose from "mongoose";

const Schema = mongoose.Schema;

// community schema
const communitySchema = new Schema({
  communityname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  communitydetail: {
    type: String,
    default: "This is a new community"
  },
  members: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      username: {
        type: String,
        required: true,
      },
    },
  ],
  membersCount: {
    type: Number,
    default: 0,
  },
});

const Community = mongoose.model("community", communitySchema);

export default Community;
