import { useState } from "react"
import axios from 'axios'


const usePost=()=>{
    const [response,setResponse]=useState({resData:null,errormsg:null})

    const postData=async(url,payload)=>{
        try{
            const res=await axios.post(url,payload)
            setResponse({
                resData: res,
                errormsg: "",
              });
        }catch (error) {
            let message;
          
            if (error.response && error.response.data && error.response.data.message) {
              message = error.response.data.message; 
            } else {
              message = "Something went wrong"; 
            }
          
            setResponse((prevState) => ({
              ...prevState,
              errormsg: message
            }));
          }
          
    }
    return {postData,response}
    
}
export default usePost