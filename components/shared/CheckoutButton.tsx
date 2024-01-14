"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";

import { IEvent } from "@/lib/database/models/Event.model";
import { Button } from "../ui/button";
import Checkout from "./Checkout";

function CheckoutButton({ event }: { event: IEvent }) {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinished = new Date(event.startDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {/* We cannot buy past events ticket */}
      {hasEventFinished ? (
        <p className="p-2 text-red-400">Sorry, tickets are no longer available.</p>
      ) : (
        <>
          <SignedOut>
            <Button className="button rounded-full" size="lg" asChild>
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
}

export default CheckoutButton;
