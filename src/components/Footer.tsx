import { useEffect, useState } from "react"
import logoInforma from "../img/informa-markets-logo-negative.png"
import { format, formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import { Offline, Online } from "react-detect-offline";

interface IFooterProps {
  percent: number;
  isFetching: boolean,
  second: number;
  time: number;
  dateNow: Date;
  lastUpdate: Date;
  onChangePercent: any;
}
export function Footer(props: IFooterProps) {
  const [seconds, setSeconds] = useState(0);

  function handlePercent() {
    const totalTime = props.time*10;
    if (props.second === 0) {
      setSeconds(0)
    } else {
      props.onChangePercent((seconds*98)/totalTime);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
      handlePercent();
    }, 100);
    return () => clearInterval(interval);
  })

  useEffect(() => {
    setSeconds(0);
  },[props.time])

  return (
    <div>
      <div className="bg-green-400 h-[2px]" style={{width: `${props.percent}%`}}></div>
      <div className="flex flex-row justify-between collumns-3 items-center font-sans text-xs bg-gray-900 h-[30px] overflow-hidden text-gray-400">
        <p className="w-[300px] overflow-hidden m-2">
          Última sincronização: {formatDistance(props.lastUpdate, props.dateNow, { includeSeconds: true, locale: pt })}
        </p>
        <div className="w-[300px] overflow-hidden h-[20px] flex justify-center">
          <img src={logoInforma} className="h-[20px]" alt="" />
        </div>
        <div className="w-[300px] overflow-hidden m-2 flex justify-end align-center">
          <span className="w-[60px]">{ format(props.dateNow, "H:m:s")}</span>
          <Online>
            <span className="flex h-3 w-3 rounded-full overflow-hidden">
              <span className="animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-50"></span>
            </span>
          </Online>
          <Offline>
            <span className="flex h-3 w-3 rounded-full overflow-hidden">
              <span className="animate-ping inline-flex h-full w-full rounded-full bg-red-400 opacity-50"></span>
            </span>
          </Offline>
        </div>
      </div>
    </div>
  )
}
