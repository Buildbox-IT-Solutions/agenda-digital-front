import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Agenda } from '../components/Agenda'
import { FullBanner } from '../components/FullBanner'
import styles from './Room.module.css'
import axios from 'axios';

interface IChannelItem {
  id: number,
  type: string,
  media_url: string | null,
  time: number,
  order: number
}

function Room(){
  const { channelId } = useParams();
  const [place, setPlace] = useState<string>('Buscando...');
  const [intervalMs, setIntervalMs] = useState<number>(240)
  const [background, setBackground] = useState<string | null>(null)
  const [topBanner, setTopBanner] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [item, setItem] = useState<IChannelItem | null>(null);
  const [second, setSecond] = useState<number>(0);
  const [dateNow, setDateNow] = useState<Date>(new Date());
  const [channelItems, setChannelItems] = useState<IChannelItem[]>([])

  const { data, isFetching } = useQuery(['plannings'],
    async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/event/get-channel-content/${channelId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`
        }
      })
      setLastUpdate(new Date());
      setChannelItems(res.data.items)
      setItem(res.data.items[0])
      setBackground(res.data.background)
      setPlace(res.data.title)
      setTopBanner(res.data.top_banner)
      return res.data
    },{
      refetchInterval: intervalMs*1000,
    },
  )

  function changeActiveItem() {
    if (item && channelItems.length > 1) {
      if (item.order === (channelItems.length-1)) {
        setItem(channelItems[0])
      }else {
        if (channelItems.length > 1) {
          setItem(channelItems[item.order+1])
        } else {
          setItem(channelItems[0])
        }
      }
      setSecond(0)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDateNow(new Date())
      setSecond(second => second + 1)
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  setTimeout(() => {
    if (item?.time === second) {
      changeActiveItem()
    }
  }, 1000);
  const [percent, setPercent] = useState(0);
  return (
    <div className='relative flex min-h-screen flex-col overflow-hidden bg-gray-50'>
      <div className={styles.screenWrapper} style={{ backgroundImage: `url(${background})` }}>
        <div className="grid grid-row-3 content-between h-[100vh]">
          <Header place={place} top={topBanner} />
          {(() => {
            switch (item?.type) {
              case 'agenda':
                return (
                  <Agenda
                    contentId={item?.id}
                    dateNow={dateNow}
                    percent={percent}
                    totalContent={channelItems.length}
                  />
                )
              case 'banner':
                return <FullBanner imageUrl={item?.media_url} percent={percent} />
              default:
                return (<p className='text-center w-[100%] text-white text-2xl'>Carregando itens do canal...</p>)
            }
          })()}
          <Footer
            second={second}
            time={item?.time ?? 0}
            dateNow={dateNow}
            isFetching={isFetching}
            lastUpdate={lastUpdate}
            percent={percent}
            onChangePercent={(newPercent: number) => setPercent(newPercent)}
          />
        </div>
      </div>
    </div>
  )
}

export { Room };
