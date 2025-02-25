import { useEffect, useState } from "react"

interface IBannerProps {
  imageUrl: string | null;
  percent: number;
}

export function FullBanner(props: IBannerProps) {
  const [effect, setEffect] = useState("translate-x-[-1080px]")
  useEffect(() => {
    setTimeout(() => {
      setEffect('')
    }, 500);
  }, [])
  return (
    <div className={`flex items-center justify-center transition-all duration-500 ${effect} ${props.percent > 95 ? 'translate-x-[1080px]' : null}`}>
      <div className="w-[1031px] h-[1694px] rounded-lg overflow-hidden bg-slate-900 shadow-lg">
        {props.imageUrl ? <img className="w-[1031px] h-[1694px]" src={props.imageUrl} /> : null}
      </div>
    </div>
  )
}
