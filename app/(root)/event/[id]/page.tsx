// import CheckOutButton from "@/components/CheckOutButton";
import CheckOutButton from "@/components/CheckOutButton";
import { getEventById } from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface Props {
  params: { id: string };
}

const Page = async ({ params }: Props) => {
  const result = await getEventById({ eventId: params.id });

  //  console.log(result);
  return (
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={result.imageUrl}
          alt="hero image"
          width={1000}
          height={800}
          className="h-full min-h-[300px] object-cover "
        />

        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold">{result.title}</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  {result.isFree ? "FREE" : `$${result.price}`}
                </p>
                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                  {result.category.name}
                </p>
              </div>

              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{" "}
                <span className="text-primary-500">
                  {result.organizer.name}{" "}
                </span>
              </p>
            </div>
          </div>

          <CheckOutButton
            eventId={result._id}
            eventTitle={result.title}
            eventPrice={result.price}
            isFree={result.isFree}
            eventOrganizer={result.organizer._id}
            eventEndDate={result.endDateTime}
          />

          <div className="flex flex-col gap-5">
            <div className="flex gap-2 md:gap-3">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={32}
                height={32}
              />
              <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                <p>
                  {formatDateTime(result.startDateTime).dateOnly} -{" "}
                  {formatDateTime(result.startDateTime).timeOnly}
                </p>
                <p>
                  {formatDateTime(result.endDateTime).dateOnly} -{" "}
                  {formatDateTime(result.endDateTime).timeOnly}
                </p>
              </div>
            </div>

            <div className="p-regular-20 flex items-center gap-3">
              <Image
                src="/assets/icons/location.svg"
                alt="location"
                width={32}
                height={32}
              />
              <p className="p-medium-16 lg:p-regular-20">{result.location}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-grey-600">What You will Learn:</p>
            <p className="p-medium-16 lg:p-regular-18">{result.description}</p>
            <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
              {result.url}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
