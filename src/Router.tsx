import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Room } from "./pages/Room";
import { TransitionTest } from "./pages/TransitionTest";
import { RoomList } from "./pages/RoomList";

export function Router() {
  return (
    <Routes>
      {/* <Route path="/" element={ <Navigate to="/event/RXZlbnRfNDI1MTYx" /> }/> */}
      <Route path="/" element={ <Home/> }/>
      <Route path="events" element={<Home/>}/>
      <Route path="event/:eventId" element={<RoomList/>}/>
      <Route path="channel/:channelId" element={<Room/>}/>
      <Route path="test" element={<TransitionTest/>}/>
    </Routes>
  )
}
