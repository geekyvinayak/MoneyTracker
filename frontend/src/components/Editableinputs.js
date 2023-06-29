import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { MyContext } from "./context/Context";

function Editableinputs({ text,field }) {
  const [type, settype] = useState("label");
  const [changes, setchanges] = useState('');
  const { verify } = useContext(MyContext);
  
  function handleChange(event) {
    setchanges(event.target.value)
  }

  const saved = async(e) =>{
    const token = localStorage.getItem("token") 
    e.preventDefault()
    console.log("changes ",changes)
    let {data} = await axios.get(process.env.REACT_APP_Backend+"update",{headers:{"token":token,"field":field,"updates":changes}})
    console.log("dd",data.stat)
    if(data.stat){
        localStorage.removeItem(field)
        console.log("chss",changes)
        localStorage.setItem(field,changes)
        verify(token)
        settype("label")
    }
    else{
        toast.error("Something Went wrong!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          verify(token,"/usersettings")
    }
    
  }

  return (
    <>
      {type === "label" ? (
        <label onClick={() => settype("f")}>{text}</label>
      ) : (
        <div>
          <input
            type="text"
            defaultValue={text}
            onChange={handleChange}
          ></input>
          <button onClick={saved}>saved</button>
        </div>
      )}
      <ToastContainer></ToastContainer>
    </>
  );
}

export default Editableinputs;
