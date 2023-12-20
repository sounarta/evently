"use client";
import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Checkout from "./Checkout";

interface Props {
  eventId: string
  eventTitle: string
  eventPrice: string
  isFree: boolean
  eventOrganizer: string
  eventEndDate: Date;
}

const CheckOutButton = ({
  eventId,
  eventTitle,
  eventPrice,
  isFree,
  eventOrganizer,
  eventEndDate,
}: Props) => {
  const { userId } = useAuth();

  if (!userId) return null;

  

  const hasEventFinished = new Date(eventEndDate) < new Date();
  const isOrganizer = userId === eventOrganizer;

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          {!isOrganizer && (
            <>
              <SignedOut>
                <Button asChild className="button rounded-full" size="lg">
                  <Link href="/sign-in">Get Tickets</Link>
                </Button>
              </SignedOut>

              <SignedIn>
                {/* Render the necessary components for signed-in users */}
                <Checkout
             eventId={eventId}
             eventTitle={eventTitle}
             eventPrice={eventPrice}
             isFree={isFree}
             eventOrganizer={eventOrganizer}
                />
              </SignedIn>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CheckOutButton;
