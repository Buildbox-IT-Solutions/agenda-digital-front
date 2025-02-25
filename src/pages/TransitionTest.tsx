import { useState } from "react"

export function TransitionTest() {
  const [active, setActive] = useState(true)
  return (
    <>
      <button onClick={() => {setActive(!active)}} className="transition-all duration-150 bg-purple-800 p-2 rounded-lg text-white">
        Hover me
      </button>

      {/* <div className="w-20 h-20 overflow-hidden"> */}
      <div className="w-20 h-20 overflow-hidden flex">
        {active ? (
          <div className={`bg-lime-300 w-20 h-20 rounded-lg transition transform duration-500 ${active ? 'translate-x-[5rm]' : null}`}></div>
        ):(
          <div className={`bg-orange-300 w-20 h-20 rounded-lg transition transform duration-500 ${active ? null : 'translate-x-[5rm]'}`}></div>
          )}
      </div>
      <div className={`bg-green-400 w-20 h-20 rounded-lg transition duration-500 ${active ? 'translate-x-[1080px]' : null}`}></div>
      <div className={`bg-green-400 w-20 h-20 rounded-lg transition duration-500 ${active ? null : 'translate-x-[1080px]'}`}></div>
    </>
  )
}
