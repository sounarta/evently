"use server";

import { checkoutOrderParams, createOrderParams } from "./shared.types";

import Stripe from "stripe";
import { redirect } from "next/navigation";
import { ConnectToDatabase } from "../mongoose";
import Order from "@/database/order.model";

export async function checkoutOrder(params: checkoutOrderParams) {
  const { eventId, eventTitle, isFree, price, buyerId } = params;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const priceTTS = isFree ? 0 : Number(price) * 100;
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price_data:{
            currency:'usd',
            unit_amount:priceTTS ,
            product_data:{
                name:eventTitle
            }
          },
          quantity: 1,
        },
      
      ],
      metadata:{
        eventId,
        buyerId
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
      automatic_tax: { enabled: true },
    });
    redirect(session.url!);
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function createOrder(params:createOrderParams) {
  
  try {
       await ConnectToDatabase()
       
       const {stripeId,eventId,buyerId,totalAmount,createdAt} = params
    
       const newOrder = await Order.create({
        stripeId,
        eventId,
        buyerId,
        totalAmount,
        createdAt

       })
return newOrder
  } catch (error) {
    console.log(error)
    throw error
  }
}