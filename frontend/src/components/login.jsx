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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg("Please fill in all fields");
      return;
    }

    const payload = { email, password };
    const url = `http://localhost:3003/login`;
    postData(url, payload);
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (resData?.data?.status === "success") {
      setSuccessMsg(resData.data.message || "Login successful!");
      setErrorMsg("");

      if (resData.data.token) {
        localStorage.setItem("authToken", resData.data.token);
      }

      setTimeout(() => {
        navigate("/home");
      }, 1500);
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
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
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
