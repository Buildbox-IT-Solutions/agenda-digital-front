import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';

interface ISpeaker {
  firstName: string,
  lastName: string,
  photoUrl: string
}

interface ISpeakerPhotoProps {
  speaker: ISpeaker
}
export function SpeakerPhoto(props: ISpeakerPhotoProps) {
  return(
    <div className="overflow-hidden rounded-full w-12 h-12 flex items-center shadow-md -ml-4 border border-white">
      {props.speaker.photoUrl != null ?
        <img className="rounded-full" src={props.speaker.photoUrl} alt={props.speaker.firstName + ' ' + props.speaker.lastName} />
        : <InitialsAvatar name={props.speaker.firstName + ' ' + props.speaker.lastName} />}
      {/* <img className="max-h-12 max-w-sm" src={props.speaker.photoUrl} alt="" /> */}
    </div>
  )
}
