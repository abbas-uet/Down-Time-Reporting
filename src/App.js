import Navbar from './components/Navbar';
import MoniterWebsite from './components/MoniterWebsite';
import WebsiteHistory from './components/WebsiteHistory';
import AddWebsite from './components/AddWebsite';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  document.body.style.backgroundColor='#949eb3'

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<AddWebsite />}/>
      <Route path="/moniter" element={<MoniterWebsite />}/>
      <Route path="/history" element={<WebsiteHistory />} />
    </Routes>
  </BrowserRouter>
    </>
  );

}

export default App;
