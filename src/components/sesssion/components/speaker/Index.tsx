import { SpeakerPhoto } from "./components/SpeakerPhoto"
import { SpeakerName } from "./components/SpeakerName"

interface ISpeaker {
  firstName: string,
  lastName: string,
  photoUrl: string
}

interface ISpeakers {
  speakers: ISpeaker[] | null
}

export function Speaker(props: ISpeakers) {
  return (
    <>
      <p className="text-1xl text-zinc-400 mt-3">Palestrantes:</p>
      <div className="mt-2 ml-2 font-light flex items-center">
        <div className="flex mr-2">
          {props.speakers?.map((speaker, index) => {
            return (<SpeakerPhoto key={index.toString()} speaker={speaker} />)
          })}
        </div>
        {props.speakers?.map((speaker, index) => {
          return (<SpeakerName key={index.toString()} name={speaker.firstName + ' ' + speaker.lastName} />)
        })}
      </div>
    </>
  )
}
