import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Profile";

function app(){
  return(
    <BrowserRouter> 
    <Routes>
        <Route path="/Profile/:id" element={<Profile />} />
    </Routes>
    </BrowserRouter>
  )
}

export default app;