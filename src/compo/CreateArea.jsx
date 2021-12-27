import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";


import { useEffect} from "react"
import DeleteIcon from "@material-ui/icons/Delete";
import {useState} from "react"





function Note() {
  const [api_data, setdata] = useState([]);
  const getdata = () => {
    fetch("https://googlekepper.herokuapp.com/getFromKepper", { method: "GET" })
      .then((data) => data.json())
      .then((newdata) => setdata(newdata));
  };
  useEffect(() => {
    
    getdata();
  }, []);

  const deletdata = (id) => {
    fetch(`https://googlekepper.herokuapp.com/deleteFromKepper/`+id,
      { method: "DELETE" }).then(() => getdata())
    console.log(id)
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
 

  const [name, setName] = useState("");

  const [data, setdata] = useState("");
  



  
  
  const addUser = () => {
  
    fetch(`https://googlekepper.herokuapp.com/insertToKepper`, {
      method: "POST",
     
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([{
    
            title: name,
            data: data
  
          
        
      }])
  
    }).then(()=>getdata())
    setdata("")
    setName("")
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
