import { User } from "phosphor-react";

interface SpeakerNameProps {
  name: string
}

export function SpeakerName(props: SpeakerNameProps) {
  return (
    <div className="ml-3 flex items-center p-1 m-1 rounded-lg border-solid border border-grey-100 text-zinc-700">
      <User weight="bold" /> {props.name}
    </div>
  )
}
