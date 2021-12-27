import React from "react";
import {useHistory} from "react-router-dom"
import styled from "styled-components";
 import "./about.css"
function About()
{
   
    return(
        <>
      <div className="about_div">
        <div className="about_inner_div">
            <h1 className="about_content">What is the purpose of Google Keeper?
Google Keeper allows users to record plain-text notes and organize, edit, or share them with others using a suite of collaboration tools. You can also use new version of Google Keeper to create voice notes, or set time- and location-based reminders.Following are some key features of Google kepper</h1>
        </div>
        <div className="outer">
              <div  className="inner">
                  <h1>SignIn/SignUp</h1>
              </div>
              <div className="inner">
                  <h1>Two step verification</h1>
              </div>
              <div className="inner">
                  <h1>CRUD operation</h1>
              </div>
              </div>
        </div>
     </>
    )
}

export default About;