"use server";

import { CreateEventParams } from "@/types";
import { connect } from "../database";
import Event from "../database/models/Event.model";
import User from "../database/models/User.model";
import { handleError } from "../utils";

export async function createEvent({ event, userId, path }: CreateEventParams) {
  try {
    await connect();

    const organizer = await User.findById(userId);
    if (!organizer) {
      throw new Error("Organizer not found");
    }

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
}
