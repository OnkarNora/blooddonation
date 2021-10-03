import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
function Header() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand ><Link className="link" to="/">Blood Donation</Link> </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link ><Link className="link" to="/register">Register</Link></Nav.Link>
                        <Nav.Link ><Link className="link" to="/search">Search</Link></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
