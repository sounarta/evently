import { Schema, Document, model, models } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description?: string;
  imageUrl: string;
  category: {_id:string,name:string};
  organizer: Schema.Types.ObjectId;
  startDateTime: Date;
  endDateTime: Date;
  price: string;
  isFree: boolean;
  url?: string;
  location?: string;
  createdAt: Date;
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true }, // Adjust 'Category' to the actual name of the referenced collection
  organizer: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Adjust 'Organizer' to the actual name of the referenced collection
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  price: { type: String },
  isFree: { type: Boolean, default:false },
  url: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
