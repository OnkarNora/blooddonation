import React from 'react'
import {Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

function Home() {
    const history = useHistory();

    return (
        <div>
            <h1>Please Register or Search for Blood Donation </h1>
            <Button className="m-3 btn btn-primary" variant="dark" onClick={()=>{history.push('/register')}} >Register</Button>
            <Button className="m-3 btn btn-primary" variant="dark" onClick={()=>{history.push('/search')}} >Search</Button>
        </div>
    )
}

export default Home
