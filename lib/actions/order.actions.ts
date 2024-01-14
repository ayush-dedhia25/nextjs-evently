"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";

import { CheckoutOrderParams, CreateOrderParams } from "@/types";
import { connect } from "../database";
import Order from "../database/models/Order.model";
import { handleError } from "../utils";

export async function checkoutOrder(order: CheckoutOrderParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const price = order.isFree ? 0 : Number(order.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "INR",
            unit_amount: price,
            product_data: {
              name: order.eventTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: { eventId: order.eventId, buyerId: order.buyerId },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!);
  } catch (error) {
    throw error;
  }
}

export async function createOrder(order: CreateOrderParams) {
  try {
    await connect();

    const newOrder = await Order.create({
      ...order,
      event: order.eventId,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (err) {
    handleError(err);
  }
}
