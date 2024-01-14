import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

import { checkoutOrder } from "@/lib/actions/order.actions";
import { IEvent } from "@/lib/database/models/Event.model";
import { Button } from "../ui/button";

type CheckoutProps = {
  userId: string;
  event: IEvent;
};

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

function Checkout({ userId, event }: CheckoutProps) {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      eventId: event._id,
      eventTitle: event.title,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    };

    await checkoutOrder(order);
  };

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" size="lg" className="button sm:w-fit" role="link">
        {event.isFree ? "Get Ticket" : "Buy Ticket"}
      </Button>
    </form>
  );
}

export default Checkout;
