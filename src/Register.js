import React from 'react'
import {Form, Button, Spinner} from 'react-bootstrap';
import {useState} from 'react'

function Register() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [blood,setBlood] = useState('');
    const [pincode,setPincode] = useState('');
    const [show,setShow] = useState('hidden');
    const [showerr,setShowerr] = useState('hidden');
    const [loading,setLoading] = useState(false);

    async function register(){
        setLoading(true);
        if(name === '' || email === '' || blood === '' || pincode === ''){
            alert("one or more fields empty");
            setLoading(false);
            return ;
        }
        let data = {
            name:name,
            email:email,
            blood:blood,
            pincode:pincode
        }
        console.log("data is : ",data);
        let result = await fetch("http://localhost:4000/donor",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(data)
        }).catch((err)=>{
            console.log(err);
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
                <input className="form-control" value={pincode} onChange={(e)=>{setPincode(e.target.value)}} type="text" placeholder="Enter Pincode" />
            </Form>
                <Button variant="dark" onClick={()=>{register()}} >Register</Button>
            <p className={show} >User has been Registered</p>
            <p className={showerr} >Server not responding</p>
            <p>{ loading ? <Spinner className="spin" animation="border" /> : null }</p>
        </div>
    )
}

export default Register
