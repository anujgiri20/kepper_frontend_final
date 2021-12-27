
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./profile_.css"
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';







function Profile(props) {
    const history = useHistory()
    const [pro_data, setdata] = useState([])
    const [toggle, toggleNav] = useState(false);
   

    

    const getdata = () => {
        Axios.get("https://googlekepper.herokuapp.com/getdata", {
            headers:{
                "access-token": localStorage.getItem("access-token")
            }
        }).then((response) => {
            if(response.status == 200)
            {
               localStorage.setItem("login-status" , true)
              history.push("/Kepper")
            }
            else
            {
                history.push("/")
                alert("user is not authenticated")
       

            }
        })

    }



// useEffect(() => {

//     getdata();
// }, []);

return (
    <>

{/* <div className="nav1">
            
            <h1>anuj</h1>
            </div> */}


        {/* <button className="button_verify"  onClick={getdata}>verify user</button>
         */}

<div className="box-2" onClick={getdata}>
  <div className="btn btn-two">
    <span className="span">Verify User</span>
  </div>
</div>

    </>
)
}

export default Profile;