import { useEffect, useRef, useState } from "react"
import usePost from "./postHook/usePost";
import {useNavigate} from 'react-router-dom'

const Registration=()=>{
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [focus,setFoucs]=useState(false)
    const {postData,response}=usePost()
    const {resData,errormsg}=response

    const EventUserName=(e)=>{
        setUsername(e.target.value)
    }
    
    const EventEmail=(e)=>{
        setEmail(e.target.value)
    }
    const EventPassword=(e)=>{
        setPassword(e.target.value)
    }
    const RegistrationFormSubmit=(e)=>{
        e.preventDefault()
        
        if(username!=="" && email!=="" && password!=="" ){
            const playload={
                name:username,
                email:email,
                password:password
            }
            let url=`http://localhost:3003/register`
            postData(url,playload)
            localStorage.setItem("email",email)
            localStorage.setItem("password",password)
            setUsername("")
            setEmail("")
            setPassword("")
            setFoucs(false)
        }else{
            setFoucs(true)
        }
        
        }
        useEffect(()=>{
            console.log(resData);
            console.log(errormsg);
            
        },[resData,errormsg])
       

    return(
        <>
        <h2>Registration</h2>
        <form style={{display:'flex',flexDirection:"column"}} onSubmit={RegistrationFormSubmit}>
            <label>Username</label>
            <input  type="text" placeholder="enter username" value={username} onChange={EventUserName}/>
            <label>Email</label>
            <input type="text" placeholder="enter email" value={email} onChange={EventEmail}/>
            <label>Password</label>
            <input type="password" placeholder="enter password" value={password} onChange={EventPassword}/>
            <a href="/login">Sign in</a>
            <button type="submit">Submit</button>
            {focus &&<p style={{color: focus ? "red" : "#ccc"}}>Some fields are missing</p>}
            {resData?.data?.message && (
            <p style={{ color: 'green' }}>{resData.data.message}</p>
            )}
            {errormsg && (
            <p style={{ color: 'red' }}>{errormsg}</p>
            )}

        </form>
        </>
        
    )
}
export default Registration