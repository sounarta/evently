import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "lucide-react";
import { getAllEvents } from "@/lib/actions/event.actions";
import CardEvent from "@/components/CardEvent";
import Search from "@/components/Search";
interface Props {
  searchParams: { [key: string]: string  | undefined }
}
const Home = async ({searchParams}:Props) => {
  const result = await getAllEvents({
  //  searchQuery: searchParams.q 

  });

// console.log(result.events);
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
            <Button
              size="lg"
              asChild
              className="button w-full cursor-pointer sm:w-fit"
            >
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Trust by <br /> Thousands of Events
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
         <Search route="/"/>
        </div>
        <div className=" mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {result.events.length > 0 ? (
            result.events.map((event) => (
              <CardEvent
                key={event._id}
                _id={event._id}
                title={event.title}
                desc={event.description}
                imageUrl={event.imageUrl}
                category={event.category}
                organizer={event.organizer}
                startDateTime={event.startDateTime}
                endDateTime={event.endDateTime}
                price={event.price}
                isFree={event.isFree}
                url={event.url}
                location={event.location}
                hasOrderLink
              />
            ))
          ) : (
            <div className=" flex w-full flex-col items-center justify-center rounded-lg bg-primary-50 bg-dotted-pattern p-8">
              <p className=" font-poppins text-lg font-bold">
                No Events Found , Try to make New one
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
