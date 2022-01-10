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
Google Keeper allows users to record plain-text notes and organize, edit, or delete the notes along with login and jwt-authentication for user privacy.Following are some key features of Google kepper</h1>
        </div>
        <div className="outer">
              <div  className="inner">
                  <h1>SignIn/SignUp/jwt-auth</h1>
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