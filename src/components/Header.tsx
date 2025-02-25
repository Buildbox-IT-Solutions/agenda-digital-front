import topDef from '../img/his/HIS-Institucional.jpg';
import top1 from '../img/his/Palco-1-CIO-.jpg';
import top2 from '../img/his/Palco-2-COO.jpg';
import top3 from '../img/his/Palco-3-GAME.jpg';
import top4 from '../img/his/Palco-3-EMPREGADORES.jpg';
import top5 from '../img/his/Palco-4-ESTRATEGIA.jpg';
import top6 from '../img/his/Palco-5-Johnson&Johnson-Medtech.jpg';
import top7 from '../img/his/Palco-5-Bionexo.jpg';

import { useEffect, useState } from "react";

interface IHeaderProps {
  place: string,
  top: string | null
}

function Header({place, top}: IHeaderProps) {
  return (
    <div className="bg-zinc-900/70 text-white flex justify-center items-center h-[150px] shadow-lg overflow-hidden">
        {(() => {
          if (top) {
            return (<img src={top} title={place}/>)
          } else {
            return (<h1 className="text-3xl font-bold font-sans">{place}</h1>)
          }
        })()}
    </div>
  );
}

export { Header }
