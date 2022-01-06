import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./CreateArea";
import "./index_.css"
import { useHistory } from "react-router-dom";
function Kepper({logout_}) {
const history = useHistory()
if(logout_)
{
logout_(true)
}



  return (
    <div className="kepper_div">
      {/* <Header /> */}
    
      <Note/>
     
     
     
      <Footer />
    </div>
  );
}

export default Kepper;


