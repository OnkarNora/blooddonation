import React from 'react'
import {Form, Button, Spinner} from 'react-bootstrap';
import {useState} from 'react'
require('dotenv').config();


function Register() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [blood,setBlood] = useState('');
    const [pincode,setPincode] = useState(null);
    const [show,setShow] = useState('hidden');
    const [showerr,setShowerr] = useState('hidden');
    const [loading,setLoading] = useState(false);

    async function register(){
        setLoading(true);
        console.log(process.env)
        if(name === '' || email === '' || blood === '' || pincode === ''){
            alert("one or more fields empty");
            setLoading(false);
            return ;
        }

        // hitting a api for getting lat and long 
        let loc = await fetch(`https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/${pincode}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": process.env.REACT_APP_RAPID_HOST,
                "x-rapidapi-key": process.env.REACT_APP_RAPID_API
            }
        })

        loc = await loc.json();

        console.log("location : ",loc);

        let data = {
            name:name,
            email:email,
            blood:blood,
            pincode:pincode,
            loc:[loc[0].lat,loc[0].lng]
        }
        console.log("data is : ",data);
        let result = await fetch("/donor",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(data)
        }).catch((err)=>{
            console.log("error : ",err);
            setLoading(false);
            setShowerr('err text-danger m-5 text-center font-weight-bold h4 ');
            return ;
        })
        setLoading(false);
        if(result){
            result = await result.json();
            console.log("User registerd");
            setName('');
            setEmail('');
            setBlood('');
            setPincode('');
            setShow('show text-success m-5 text-center font-weight-bold h4 ');
        }
        console.log("result came out to be : ",result);
    }
    
    return (
        <div className="m-5">
            {/* Name , Blood Group , Pincode , Email */}
            <h1>Register</h1>
            <Form className="form">
                <input className="form-control" value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Enter Name" />
                <input className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder="Enter Email" />
                <input className="form-control" value={blood} onChange={(e)=>{setBlood(e.target.value)}} type="text" placeholder="Enter Blood Group (A+,A-,B+,B-,AB+,AB-,O+,O-)" />
                <input className="form-control" value={pincode} onChange={(e)=>{setPincode(e.target.value)}} type="number" placeholder="Enter Pincode" />
            </Form>
                <Button variant="dark" onClick={()=>{register()}} >Register</Button>
            <p className={show} >User has been Registered</p>
            <p className={showerr} >Server not responding</p>
            <p>{ loading ? <Spinner className="spin" animation="border" /> : null }</p>
        </div>
    )
}

export default Register
