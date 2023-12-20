import { IUser } from "@/database/user.model";

export interface DataUserParams {
  clerkId: string;
  username: string;
  name: string;
  picture: string;
  emai: string;
}

export interface updateUserParams {
    clerkId:string;
    updateData: Partial<IUser>
    path:string
}

export interface deleteUserParams {
    clerkId:string;

}

export interface GetUserByIdParams {
    userId:string
}


export interface createCategoryParams {
    categoryName:string
}

export interface CreateEventParams {
    title:string
    category:string
    description:string
    imageUrl:string
    location:string
    startDateTime:Date
    endDateTime:Date
    price:string
    isFree:boolean
    url: string 
    organizer:string
path:string
}
export interface GetEventByIdParams {
    eventId:string
}

export interface DeleteEventParams {
    eventId:string
    path:string
}

export interface UpdateEventParams {
    eventId:string
    title: string
    category: string
    description: string
    imageUrl: string
    location: string
    startDateTime: Date
    endDateTime: Date
    price: number | string
    isFree: boolean
    url: string
    path: string
}

export interface GetEventsByUserParams {
   userId:string
}

export interface checkoutOrderParams {
    eventTitle:string
    eventId:string
    price: string
    isFree: boolean
    buyerId: string  
 }

 export interface GetAllEventsParams {
    searchQuery?:string
 }

 export interface  createOrderParams {
    stripeId:string
    eventId:string
    buyerId:string
    totalAmount:string
    createdAt:Date
 }
