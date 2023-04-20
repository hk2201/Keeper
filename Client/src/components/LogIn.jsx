import React, { useState } from "react";

function Login(props) {
  const [user, setUser] = useState("");

  function handleChange(event) {
    setUser(event.target.value);
  }

  function handleClick(event) {
    props.User(user);
    setUser("");
    event.preventDefault();
  }

  return (
    <form>
      <div className="form-group">
        <input
          onChange={handleChange}
          className="form-control"
          placeholder="Enter Your Name"
        />
      </div>
      <button onClick={handleClick} type="submit" className="btn btn-primary">
        Go
      </button>
    </form>
  );
}

export default Login;
