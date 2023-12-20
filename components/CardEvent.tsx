import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { DeleteConfirmation } from "./DeleteConfirmation";

interface Props {
  _id: string;
  title: string;
  desc: string;
  imageUrl: string;
  category: {
    _id: string;
    name: string;
  };
  organizer: {
    _id: string;
    clerkId:string
    name: string;
  };
  startDateTime: Date;
  endDateTime: Date;
  price: number;
  isFree: boolean;
  url: string;
  location: string;
  hasOrderLink?:boolean
}

const CardEvent = ({ _id,title,desc,imageUrl,category,organizer,startDateTime,endDateTime,price,isFree,url,location,hasOrderLink
}: Props) => {

 const{userId:clerkId} = auth()



  return (
    <div
      className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl
                bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]"
    >
      <Link
        href={`/event/${_id}`}
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="flex-center grow bg-gray-50 bg-cover bg-center text-grey-500"
      />

{clerkId === organizer.clerkId && (

<div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/event/edit/${_id}`}>
            <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
          </Link>
        <DeleteConfirmation  eventId={JSON.stringify(_id)}/>
        </div>
)}




      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        <div className="flex gap-2">
          <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-orange-500">
            {isFree ? "FREE" : `$${price}`}
          </span>
          <p className="p-semibold-14 line-clamp-1 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500">
            {category.name}
          </p>
        </div>

        <p className="p-medium-16 p-medium-18 text-grey-500">
          {formatDateTime(startDateTime).dateTime}
        </p>
        <Link href={`/events/${_id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {title}
          </p>
        </Link>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {organizer.name}
          </p>

          {hasOrderLink && (
            <Link href={`/orders?eventId=${_id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardEvent;
