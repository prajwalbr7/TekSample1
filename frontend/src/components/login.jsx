import { useState, useEffect } from "react";
import usePost from "./postHook/usePost";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { postData, response } = usePost();
  const { resData, errormsg } = response;
  const navigate = useNavigate();

  const EventEmail = (e) => {
    setEmail(e.target.value);

  };

  const EventPassword = (e) => {
    setPassword(e.target.value);
    
  };

  const LoginFormSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      const payload = { email, password };
      const url = `http://localhost:3003/login`;
      postData(url, payload);
      setEmail("");
      setPassword("");
    } else {
      setErrorMsg("Please fill in all fields");
    }
  };

  useEffect(() => {
    if (resData?.data?.status === "success") {
      setSuccessMsg(resData.data.message || "Login successful!");
      setErrorMsg("");
    } else if (resData?.data?.status === "error") {
      setErrorMsg(resData.data.message || "Login failed");
      setSuccessMsg("");
    } else if (errormsg) {
      setErrorMsg(errormsg);
      setSuccessMsg("");
    }
  }, [resData, errormsg, navigate]);

  return (
    <>
      <h2>Login</h2>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        onSubmit={LoginFormSubmit}
      >
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={EventEmail}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={EventPassword}
        />
        <a href="/">Create Account</a>
        <button type="submit">Login</button>

        {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      </form>
    </>
  );
};

export default Login;
