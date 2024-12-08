import mongoose from "mongoose";

const ParticipantEventSchema = new mongoose.Schema(
  {
    start: { type: Date, required: true },
    end: { type: Date },
    message: { type: String },
  },
  { _id: false }
);

const ParticipantSchema = new mongoose.Schema(
  {
    participantId: { type: String, required: true },
    name: { type: String, required: true },
    events: {
      mic: [ParticipantEventSchema],
      webcam: [ParticipantEventSchema],
      screenShare: [ParticipantEventSchema],
      screenShareAudio: [ParticipantEventSchema],
      errors: [ParticipantEventSchema],
    },
  },
  { _id: false }
);

const SessionSchema = new mongoose.Schema(
  {
    meetingId: {
      type: String,
      required: true,
      index: true,
      match: /^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$/,
    },
    start: { type: Date, required: true },
    end: { type: Date },
    uniqueParticipantsCount: { type: Number, required: true },
    participants: [ParticipantSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.model("Session", SessionSchema);
