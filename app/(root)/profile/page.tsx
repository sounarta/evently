import CardEvent from '@/components/CardEvent'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getUserById } from '@/lib/actions/user.actions'

import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async () => {

    const{userId} = auth()

    if(!userId) return console.log('No user Found')

    const mongoUser = await getUserById({userId})
 console.log('User',mongoUser._id)
 // const ordersPage = Number(searchParams?.ordersPage) || 1;
//  const eventsPage = Number(searchParams?.eventsPage) || 1;

 // const orders = await getOrdersByUser({ userId, page: ordersPage})

//  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const result = await getEventsByUser({ 
    userId:mongoUser._id,

})
console.log('result',result)



  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">
              Explore More Events
            </Link>
          </Button>
        </div>
      </section>

  

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">
              Create New Event
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
      <div className=" mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
         
         {result.events.map(event=>(
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
         ))}


         
        
        </div>
      </section>
    </>
  )
}

export default ProfilePage