import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Axios from "axios";

import { useEffect} from "react"
import DeleteIcon from "@material-ui/icons/Delete";
import {useState} from "react"
import { useHistory } from "react-router-dom";





function Note() {
  const history = useHistory()
  const [api_data, setdata] = useState([]);
  const getdata = () => {
    try {
      Axios.get("https://googlekepper.herokuapp.com/getFromKepper", {
        headers: {
          "access-token": localStorage.getItem("access-token")
        }
      }).then((response) => {
        if (response.status == 200) {
          console.log(response)
          setdata(response.data)
        }
        else {
          history.push("/")
          alert("user is not authenticated")


        }
      }).catch((err) => history.push("/"))
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    getdata()
  }, [])

  const deletdata = (id) => {
    fetch(`https://googlekepper.herokuapp.com/deleteFromKepper/`+id,
      { method: "DELETE" ,
      headers: { "access-token": localStorage.getItem("access-token") }
    }).then((response) => {
      if (response.status !== 400) {
        getdata()
        alert("data delete succesfull")
      }
      else {
        alert("you are not authorize user")
        history.push("/")
      }

    }).catch((err) => history.push("/"))

  }

  return (
    <>
    
    <CreateArea getdata={getdata} />
    
    {api_data.map((data)=>(
    <div key={data._id} className="note">
      <h1 >{data.title}</h1>
      <p>{data.data}</p>
      <button onClick={()=>deletdata(data._id)}>
        <DeleteIcon />
      </button>
    </div>
    ))}
    </>
  );
}





function CreateArea({getdata}) {
  const [isExpanded, setExpanded] = React.useState(false);
 
const history = useHistory()
  const [name, setName] = useState("");

  const [data, setdata] = useState("");
  



  
  
  const addUser = () => {
  
    fetch(`https://googlekepper.herokuapp.com/insertToKepper`, {
      method: "POST",
     
      headers: { "Content-Type": "application/json",
      "access-token": localStorage.getItem("access-token") },
      body: JSON.stringify([{
    
            title: name,
            data: data
  
          
        
      }])
  
    }).then((response) => {
      if (response.status !== 400) {
        getdata()
        alert("Add data processing")
      }
      else {

        history.push("/")
        alert("you are not authorize user")
      }

    }).catch((err) => history.push("/"))


    setName("")
    setdata("")

  }




  


  function expand() {
    setExpanded(true);
  }

  return (
    <div>
     
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            value={name}
            onChange={(event) => setName(event.target.value)}
           
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          value={data}
          onChange={(event) => setdata(event.target.value)}
         
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={addUser}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default Note;
