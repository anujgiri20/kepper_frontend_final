import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Axios from "axios";
import "./about.css"
import { useEffect } from "react"
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react"
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
    fetch(`https://googlekepper.herokuapp.com/deleteFromKepper/` + id,
      {
        method: "DELETE",
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

      {api_data.map((data) => (
      <Component getdata={getdata} key={data._id} userid={data._id} title={data.title} note={data.data}  deletdata={deletdata} />


      ))}
    
    </>
  );
}


function Component({getdata,key,userid,title,note,deletdata})
{
  const [edit, setedit] = useState(false)
  return(
    <>
   <div style={{ boxShadow: "0 1px 5px rgb(138, 137, 137)" }} key={userid} className="note">
          <h1 >{title}</h1>
          <p>{note}</p>
          <button onClick={() => deletdata(userid)}>
            <DeleteIcon />
          </button>
          
          
          <button onClick={()=>setedit(!edit)}>
            <AddIcon />
          </button>
         {
           edit 
           ?  
           <div className="_edit_div_"  >
           <Edit id={userid} getdata={getdata} title={title} note={note} />
           </div>
           :
          <div className="_edit_div_"  >
            </div>
         }
        </div>
    
    </>
  )
}


function Edit({id, getdata,title,note })
{

  const [edittitle, setedittitle] = useState(title);
  const [editnote, seteditnote] = useState(note);

  const editu = () => {
    alert("Updation Processing")
    fetch("https://googlekepper.herokuapp.com/patchkepper/" + id, {
      method: "PUT"
      , headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("access-token")

      },
      body: JSON.stringify({
        title: edittitle,
        data: editnote
      })



    }).then(() => getdata());

  }

    return (
      <>
    
       
            <div className="_edit_div_" style={{ height: "150px", marginTop: "80px",transition:"2s" }}>
            
              <input
                
                name="title"
                className="edit_note"
              
                value={edittitle}
                onChange={(event) => setedittitle(event.target.value)}
                
              />
              <input
              
                className="edit_note"

                value={editnote}
                onChange={(event) => seteditnote(event.target.value)}
               
              />

              <h1 className="button" style={{cursor: "pointer"}} onClick={editu}>Save Edit</h1>
            </div>
          

        
      </>
    )
  }











  function CreateArea({ getdata }) {
    const [isExpanded, setExpanded] = React.useState(false);

    const history = useHistory()
    const [name, setName] = useState("");

    const [data, setdata] = useState("");

    const addUser = () => {

      fetch(`https://googlekepper.herokuapp.com/insertToKepper`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "access-token": localStorage.getItem("access-token")
        },
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