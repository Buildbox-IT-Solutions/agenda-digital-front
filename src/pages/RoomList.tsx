import axios from "axios";
import { Flag } from "phosphor-react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";


export function RoomList() {

  const { eventId } = useParams();
  const uri = import.meta.env.VITE_API_URL;
  const { data } = useQuery('roomlist', async () => {
    const response = await axios.get(`${uri}/event/get-channels/${eventId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`
      }
    });
    return response.data;
  });
  if (!data) {
    return null;
  }
  return (
    <>
      <div className="bg-zinc-700 flex justify-center content-center py-3 max-h-[70px]">
        <Link to="/" className="text-3xl flex text-sky-300">
          <Flag className="mr-3"/>
          Lista de canais disponíveis
        </Link>
      </div>
      <ul className="m-3">
        {data?.map((room: any, key: number) => {
          return (<Link to={`/channel/${room.id}`}>
            <li key={room.id.toString()} className="p-2 text-2xl rounded-md my-3 border border-green-400 text-green-400 hover:text-white hover:bg-green-400">
                {room.title}
            </li>
          </Link>)
        })}
      </ul>
    </>
  )
}
