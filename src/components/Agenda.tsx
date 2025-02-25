import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Session } from '../components/sesssion'
interface Speaker {
  firstName: string,
  lastName: string,
  photoUrl: string
}

interface Exhibitor {
  logoUrl: string,
  name: string,
}

interface ISession {
  title         : string;
  beginsAt      : string;
  endsAt        : string;
  totalAttendees: number;
  format        : string;
  place         : string;
  description   : string;
  speakers      : Speaker[] | null;
  exhibitors    : Exhibitor[] | null;
}

interface IProps {
  contentId: number;
  dateNow: Date;
  percent: number;
  totalContent: number;
}
export function Agenda(props:IProps) {
  const [heightNegative, setHeightNegative] = useState<number>(0);
  const [heightHidden, setHeightHidden] = useState<number>(0);
  function handleSpeakerStage() {
    const speakerStage:any = document.getElementById('speakers-stage');
    const speakerHeight:number = speakerStage ? speakerStage.offsetHeight: 1694;
    setHeightHidden(speakerHeight-1694);
  }

  setTimeout(() => {
    if (heightNegative === 0) {
      setHeightNegative(heightHidden)
    }else{
      setHeightNegative(0)
    }
  }, 10000);

  useEffect(() => {
    handleSpeakerStage()
  })

  const [effect, setEffect] = useState("translate-x-[-1080px]")
  useEffect(() => {
    setTimeout(() => {
      setEffect('')
    }, 500);
    setHeightNegative(heightHidden)
  }, [])

  // const dateToGet = '2023-02-28';
  const dateToGet = props.dateNow.toISOString().split('T')[0];
  const [intervalMs, setIntervalMs] = useState<number>(240)
  const { data, isFetching } = useQuery([`sessions_${props.contentId}_${dateToGet}`],
    async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/event/get-agenda-content-by-date/${props.contentId}/${dateToGet}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`
        }
      })
      return res.data
    },{
      refetchInterval: intervalMs*1000,
    },
  )
  return (
    <>
      <div className={`h-[1694px] overflow-hidden transition-all duration-500 ${effect} ${props.percent > 90 && props.totalContent > 1 ? 'translate-x-[1080px]' : null}`}>
        <div className='transition-all duration-[5000ms] flex flex-col' id='speakers-stage' style={{marginTop: `-${heightNegative}px`}}>
          {Array.isArray(data) ? data?.map((session: any, key: number) => {
            return (<Session planning={session} key={key.toString()} dateNow={props.dateNow} />)
          }) : <div className='flex flex-col justify-center h-[1694px] w-[100%] text-center'>
              <p className='text-4xl text-center'>
                Sem dados para exibir
              </p>
            </div>}
        </div>
      </div>
    </>
  )
}
