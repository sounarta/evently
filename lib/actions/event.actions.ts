"use server";

import Event from "@/database/event.model";
import { ConnectToDatabase } from "../mongoose";
import { CreateEventParams, DeleteEventParams, GetAllEventsParams, GetEventByIdParams, GetEventsByUserParams, UpdateEventParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import User from "@/database/user.model";
import Category from "@/database/category.model";
import { FilterQuery } from "mongoose";

export async function createEvent(params: CreateEventParams) {
  try {
    await ConnectToDatabase();

    const {
      title,
      category,
      description,
      imageUrl,
      location,
      startDateTime,
      endDateTime,
      price,
      isFree,
      url,
      organizer,
      path,
    } = params;

    const newEvent = await Event.create({
      title,
      category,
      description,
      imageUrl,
      location,
      startDateTime,
      endDateTime,
      price,
      isFree,
      url,
      organizer,
      path,
    });
    revalidatePath(path);
    return newEvent;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getEventById(params: GetEventByIdParams) {
  try {
    ConnectToDatabase();

    const { eventId } = params;

    const event = await Event.findById(eventId)
    .populate({path:'organizer',model:User})
    .populate({path:'category',model:Category})
    if (!event) {
      throw new Error("Event not found");
    }
    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getAllEvents(params: GetAllEventsParams) {
  try {
    ConnectToDatabase();

    const {searchQuery} = params

    const query : FilterQuery<typeof Event> = {}

    if(searchQuery){
   query.$or = [
    {title:{$regex:new RegExp(searchQuery,'i')}},
    {description:{$regex:new RegExp(searchQuery,'i')}},
   ]
    }

    const events = await Event.find(query)
    .populate({path:'organizer',model:User})
    .populate({path:'category',model:Category})
 
    return {events};
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function DeleteEvent(params: DeleteEventParams) {
  try {
    ConnectToDatabase();


   const {eventId,path} = params
    const deleteEvent = await Event.findByIdAndDelete(eventId)

    if(deleteEvent)  revalidatePath(path)

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateEvent(params: UpdateEventParams) {
  try {
    ConnectToDatabase();


   const {eventId,title,category,description,imageUrl,startDateTime,endDateTime,price,isFree,url,path} = params



    const event = await Event.findById(eventId)

    if(!event){
     throw new Error('event not Found')
    }
    event.title=title
    event.category=category
    event.description= description
    event.imageUrl=imageUrl
    event.startDateTime=startDateTime
    event.endDateTime=endDateTime
    event.price=price
    event.isFree=isFree
    event.url=url

    await event.save()
    revalidatePath(path)

    return event

  } catch (error) {
    console.log(error);
    throw error;
  }
}


// GET EVENTS BY ORGANIZER
export async function getEventsByUser( params: GetEventsByUserParams) {
  try {
    await ConnectToDatabase()

     const {userId} = params

    const eventsQuery = await Event.find({organizer:userId})
    .populate({path:'organizer',model:User})
    .populate({path:'category',model:Category})
    
    

return {events:eventsQuery}
  } catch (error) {
    console.log(error)
    throw error
  }
}

