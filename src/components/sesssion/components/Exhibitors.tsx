import { useEffect, useState } from "react";

interface IExhibitor {
  logoUrl: string,
  name: string,
}

interface IExhibitors {
  exhibitors: IExhibitor[] | []
}

export function Exhibitors(props: IExhibitors) {

  let [activeNow, setActiveNow] = useState<number>(0);
  const [totalLogos, setTotalLogos] = useState<number>(0);
  const [timeToChange, setTimeToChange] = useState<number>(5);

  useEffect(() => {
    setTotalLogos(props.exhibitors.length-1)

    function changeNextActiveLogo(): void {
      if (activeNow === totalLogos) {
        setActiveNow(0)
      } else {
        setActiveNow(activeNow+1)
      }
    }

    setTimeout(() => {
      changeNextActiveLogo()
    }, timeToChange*1000);
  })

  return (
    <div className={`${props.exhibitors ? 'basis-1/4' : null} flex items-center justify-center bg-white rounded-lg overflow-hidden`}>
      {props.exhibitors?.map((exhibitor: IExhibitor, key: number) => {
        return exhibitor.logoUrl && key === activeNow ? (
          <img className="w-[200px]" key={key} src={exhibitor.logoUrl} />
        ) : null;
      })}
    </div>
  );
}
