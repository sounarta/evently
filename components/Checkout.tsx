import React from "react";
import { Button } from "./ui/button";

import { loadStripe } from "@stripe/stripe-js";
import { checkoutOrder } from "@/lib/actions/order.actions";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
interface Props {
  eventId: string;
  eventTitle: string;
  eventPrice: string;
  isFree: boolean;
  eventOrganizer: string;
}
const Checkout = ({
  eventId,
  eventTitle,
  eventPrice,
  isFree,
  eventOrganizer,
}: Props) => {
  const CheckMe = async () => {
    try {
      await checkoutOrder({
        eventTitle,
        eventId,
        price:eventPrice,
        isFree,
        buyerId: eventOrganizer,
      });
      // You can handle success or redirect here
    } catch (error) {
      console.error("Error during checkout:", error);
      // You can handle errors here
    }
  };

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <form action={CheckMe} method="POST">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {isFree ? "Get Ticket" : "Buy Ticket"}
      </Button>
    </form>
  );
};

export default Checkout;
