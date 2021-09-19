import React from 'react'
import { Form, Button, Table, Spinner } from 'react-bootstrap'
import { useState } from 'react';

function Search() {
    const [blood, setBlood] = useState('');
    const [pincode, setPincode] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [showerr, setShowerr] = useState('hidden');
    

    async function search() {
        setShowerr('hidden');
        setLoading(true);
        let result = await fetch(`http://localhost:4000/search/${blood}/${pincode}`).catch((err) => {
            console.log("error : ", err);
            setLoading(false);
            setShowerr('err text-danger m-5 text-center font-weight-bold h4 ');
            return;
        });
        console.log("result : ", result);
        if (result) {
            setLoading(false);
            result = await result.json();
            setData(result);
            if (result.error === 'invalid request') {
                console.log("inside");
                setShowerr('err text-danger m-5 text-center font-weight-bold h4 ');
            }
            console.log("data : ", data);
        }

    }

    return (
        <div className="m-5">
            <h1>Search</h1>
            <Form className="form">
                <input className="form-control" value={blood} onChange={(e) => { setBlood(e.target.value) }} type="text" placeholder="Enter Blood Group (A+,A-,B+,B-,AB+,AB-,O+,O-)" />
                <input className="form-control" value={pincode} onChange={(e) => { setPincode(e.target.value) }} type="number" placeholder="Enter Pincode" />
            </Form>
            <Button variant="dark" onClick={() => { search(); }} >Search</Button>
            <p>{ loading ? <Spinner className="spin" animation="border" /> : null }</p>
            <p className={showerr} >Server is busy or invalid input</p>
            {(data.length) ? <Table className="m-3" striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Blood Group</th>
                        <th>Email</th>
                        <th>Pincode</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => {
                        return (<tr>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.blood}</td>
                            <td>{item.email}</td>
                            <td>{item.pincode}</td>
                        </tr>)
                    })}
                </tbody>
            </Table> : <p>No result Found</p>
            }

        </div>
    )
}

export default Search
