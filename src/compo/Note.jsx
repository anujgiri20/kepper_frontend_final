import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import {useState , useEffect} from "react"
import CreateArea from "./CreateArea"
import "./hiden_.css"
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
    <div  className="hiden">
    <CreateArea getdata={getdata()} />
    </div>
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

