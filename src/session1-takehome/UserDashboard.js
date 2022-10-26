import React, { useState } from 'react';
import axios from 'axios';
import "./userdashboard.css";


function UserDashboard() {

    const [email, setEmail] = useState(null);
    const [idnum, setIdnum] = useState("");
    const [name, setName] = useState(null);
    const [imageURL, setimageURL] = useState("https://www.usu.edu/experts/images/default.jpg");
    const URL = "https://reqres.in/api/users/";
    
    const handleClick = (num) => {
        setIdnum(num);
        let baseURL = URL + `${num}`;
        axios.get(baseURL).then((response) => {
            setEmail(response.data.data.email);
            setName(response.data.data.first_name + response.data.first_name);
            setimageURL(response.data.data.avatar);
        })
            .catch((error) => {
                setEmail(null);
                setName(null);
                setimageURL(null);
                setTimeout(() => {
                    alert("Failed to fetch data");
                }, 5);
            });
    }

    const onChange = (e) => {
        setIdnum(e.target.value);
    }


    return (
        <>
            <h2> User Dashboard </h2>
            <div>
                <button type="button" onClick={() => handleClick(1)}>1</button>
                <button type="button" onClick={() => handleClick(2)}>2</button>
                <button type="button" onClick={() => handleClick(3)}>3</button>
                <button type="button" onClick={() => handleClick(100)}>100</button>
            </div>
            <span>or</span>
            <div>
                <label htmlFor="title" >Enter Id</label>
                <input type="number" id="idvalue" name="idvalue" value={idnum} onChange={onChange} required />
                <button type="submit" onClick={(e) => { e.preventDefault(); handleClick(idnum); }}>See Profile </button>
            </div>
            <ul type="disc">
                <li>Email: {email} </li>
                <li>Name: {name}</li>
            </ul>
            <img src={imageURL} alt="Not available" />
        </>
    )
}

export default UserDashboard;