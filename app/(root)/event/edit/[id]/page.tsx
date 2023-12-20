import React from "react";
import EventForm from "@/components/EventForm";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";
import { getEventById } from "@/lib/actions/event.actions";

interface Props {
  params: { id: string };
}

const Update = async ({params}:Props) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  const result = await getEventById({ eventId: params.id });
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm mongoUserId={JSON.stringify(mongoUser._id)} eventId={JSON.stringify(result)} type="update" />
      </div>
    </>
  );
};

export default Update;
