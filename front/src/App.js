import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import Axios from "axios"

function App() {
  const [clientInfo, setClient] = useState([]);
  const [acc_no, setAcc_no] = useState("");
  const [age, setAge] = useState("");
  const [c_first, setFirst] = useState("");
  const [c_last, setLast] = useState("");
  const [phone, setPhone] = useState("");


  const handleSubmit = (e) => {
    try{
      Axios.post("https://proj174.herokuapp.com/insert", {
        clientInfo: clientInfo,
        acc_no: acc_no,
        age: age,
        c_first: c_first,
        c_last: c_last,
        phone: phone,
      });
    }
    catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    Axios.get("https://proj174.herokuapp.com/select").then((response) => {
      setClient(response.data.rows);
      console.log(response.data.rows);
    }
  )}, []);

  return (
    <div className="App">
      <header className="AppointmentBooker">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Please enter the following: </p>
        <form onSubmit={handleSubmit}>
          <label>First name: <input onChange={(e) => setFirst(e.target.value)}
          value={c_first}></input>
          </label><br />
          <label>Last name: <input onChange={(e) => setLast(e.target.value)}
          value={c_last}></input>
          </label><br />
          <label>Phone: <input onChange={(e) => setPhone(e.target.value)}
          value={phone}></input>
          </label><br />
          <label>Age: <input onChange={(e) => setAge(e.target.value)}
          value={age}></input>
          </label><br />
          <button type="submit">Submit
          </button>
        </form>
        <br /><br />
        <table>
        <thead>
          <tr>
            <th>First</th>
            <th>Last</th>
            <th>Phone</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {clientInfo.map((val, key) => (
            <tr key={key}>
              <td>{val.c_first}</td>
              <td> {val.c_last}</td>
              <td>{val.phone}</td>
              <td>{val.age}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;