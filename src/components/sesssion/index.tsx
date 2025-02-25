import { Clock } from "phosphor-react";
import { Speaker } from "./components/speaker/Index"
import { Exhibitors } from "./components/Exhibitors"
import { isWithinInterval, addDays, isBefore } from "date-fns";
import { useEffect, useState } from "react";

interface ISpeaker {
  firstName: string,
  lastName: string,
  photoUrl: string
}

interface IExhibitor {
  logoUrl: string,
  name: string,
}

interface ISessionProps {
    dateNow: Date,
    planning: {
      title         : string,
      beginsAt      : string,
      endsAt        : string,
      totalAttendees: number,
      format        : string,
      place         : string,
      description   : string,
      speakers      : ISpeaker[] | [],
      exhibitors    : IExhibitor[] | []
    }
}

export function Session(props: ISessionProps) {
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const startDate = new Date(props.planning.beginsAt);
  const endDate = new Date(props.planning.endsAt);

  // const dateNow = addDays(props.dateNow, 1);
  const dateNow = props.dateNow;

  const interval = isWithinInterval(dateNow, {
    start: startDate,
    end: endDate
  })

  useEffect(() => {
    setIsFeatured(interval)
  })

  if (isBefore(endDate, dateNow)) {
    return null;
  }
  return (
    <div className={`transition-all px-6 pt-4 pb-4 mx-5 my-3 rounded-lg ${isFeatured ? 'bg-white shadow-xl ring-2 ring-gray-900/5' : 'bg-gray-300'}`}>
      <div className="flex flex-row">
        <div className={`${props.planning.exhibitors.length > 0 ? 'basis-3/4' : ''}`}>
          <h1 className="text-2xl font-bold text-zinc-900">
            {props.planning.title}
          </h1>
          <div className="flex items-center">
              <p className="flex items-center text-2lg font-bold my-2 mr-3 text-zinc-900">
                  <Clock weight="bold" className={`mr-2 ${isFeatured ? 'text-green-500': ''}`} />
                  {props.planning.beginsAt.substring(11,16)} às {props.planning.endsAt.substring(11,16)}
              </p>
          </div>
          <p className="text-1xl leading-relaxed text-zinc-800">
            {isFeatured ?
              props.planning.description.substring(0, 500) :
              props.planning.description.length > 250 ? props.planning.description.substring(0, 250)+'[...]' : props.planning.description
            }
          </p>
        </div>
        {props.planning.exhibitors.length > 0 && <Exhibitors exhibitors={props.planning.exhibitors} />}
      </div>
      {props.planning.speakers.length > 0 &&
        <Speaker speakers={props.planning.speakers} />
      }
    </div>
  );
}
