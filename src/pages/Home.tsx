import axios from "axios";
import { Books, Spinner } from "phosphor-react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

type TEvent = {
  id: string;
  title: string;
  beginsAt: Date,
  banner: {
    imageUrl: string
  }
}
export function Home() {
  const uri = import.meta.env.VITE_API_URL;
  const [eventList, setEventList] = useState([]);
  const { isFetching } = useQuery('events', async () => {
    const response = await axios.get(`${uri}/event/list`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`
      }
    });
    setEventList(response.data)
  });
  return(
    <>
      <div className="bg-zinc-700 flex justify-center content-center py-3 max-h-[70px]">
        <span className="text-3xl text-sky-300 flex content-center">
          <Books className="mr-3"/>
          Lista de eventos
        </span>
      </div>
      <div className="my-3 p-3 flex flex-wrap justify-center gap-3 overflow-y">
        {eventList?.map((event: any) => {
          return (
            <>
              <div className="flex w-[250px] flex-col bg-zinc-100 font-sans rounded-lg">
                <div className="relative">
                  <img
                    src={event.banner.imageUrl ?? 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-auto p-2">
                  <div className="flex flex-col flex-wrap justify-center">
                    <Link to={`/event/${event.id}`} className="h-8 mt-3 rounded-md bg-black px-6 font-semibold text-white text-center">
                      Acessar
                    </Link>
                    <h1 className="text-lg font-semibold text-slate-900 text-center">
                      {event.title}
                    </h1>
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}
