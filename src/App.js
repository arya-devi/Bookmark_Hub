import react , { useState } from 'react';
import Navbar from "./components/Navbar";
import Bookmark from "./components/Bookmark";
import Footer from "./components/Footer";



function App() {
  return(
  <div>
    <Navbar/>
    <Bookmark/>
    <Footer/>
  </div>
);
}

export default App;