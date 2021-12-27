import React, { useContext, useEffect } from "react";

import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    MutedLink,
    SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useState} from "react"
import {useHistory} from "react-router-dom"
import Axios from "axios"




export function LoginForm(props) {
    const { switchToSignup } = useContext(AccountContext);

    const [usernameReg, setusernmaeReg] = useState("")
    const [passwordReg, setpasswordReg] = useState("")
    const [msg, setmsg] = useState("")
const [loginstatus , setloginstatus] = useState(false)
const history = useHistory();

   

// function onload(){
//     alert(getCookie("access-token"));
//  }
//  function getCookie(cname) {
//     var allcookies = document.cookie;
//     var arrayb = allcookies.split(";");
//     for (item in arrayb) {
//         if (item.startsWith("Token=")){
//             var c=item.substr(5);
//             return c;
//         }
//     }
// }

    const login = () => {
        Axios.post("https://googlekepper.herokuapp.com/login", {
        
          username: usernameReg,
          password: passwordReg
        }).then((response) => {
         
          if((response.data.messege) == 'valid logged in')
          {
           
            localStorage.setItem("access-token", response.data.token)
             
            
            alert("login Succesfull")
            
             
            history.push("./Kepper")
            // console.log(response)
               
            
          }
          else{
              var msg_login = response.data 
              alert(msg_login)
          }
        })
    
      }
    


    //   if((response.data).length == 9)
    //   {
    //       setloginstatus(true)
    //   }
    //   else{
    //       setloginstatus(false)
    //   }

    //   useEffect(()=>{
    // Axios.get("http://localhost:1234/getdata").then((response)=>{
    //     console.log(response)
    // })
    //   },[])



    return (
        <BoxContainer>
            <FormContainer>

                <Input
                    onChange={(e) => {

                        setusernmaeReg(e.target.value)
                    }}
                    type="email" placeholder="User name" />


                <Input
                    onChange={(e) => {

                        setpasswordReg(e.target.value)
                    }}
                    type="password" placeholder="Password" />



            </FormContainer>
            <Marginer direction="vertical" margin={10} />
           
            <Marginer direction="vertical" margin="1.6em" />
            <SubmitButton onClick={login} type="submit">Signin</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
            <MutedLink href="#">
                Don't have an accoun?{" "}
                <BoldLink href="#" onClick={switchToSignup}>
                    Signup
                </BoldLink>
            </MutedLink>
            <h1>{msg}</h1>
            {/* <Link to="/"></Link>
            {loginstatus ?  
            (
                <Router>
           <Redirect to="https://www.w3schools.com" />
           </Router>
            ): ""} */}
        </BoxContainer>
    );
}
