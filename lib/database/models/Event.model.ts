import mongoose from "mongoose";

export interface IEvent extends mongoose.Document {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price?: string;
  isFree: string;
  url?: string;
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
}

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    price: {
      type: String,
    },
    url: {
      type: String,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    startDateTime: {
      type: Date,
      default: Date.now,
    },
    endDateTime: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
