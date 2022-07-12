import React from 'react'

export default function Footer() {
  return (
    <ul className="nav justify-content-center bg-light py-2 text-decoration-none" style={{opacity: "0.9"}}>
        <li class="nav-item align-self-center fw-bold">
            Gabriel Souza Costa
        </li>
        <li className="nav-item">
            <a className="nav-link text-dark pe-0" href="#">
                <img src='images/social/linkedin.png' height="50px"/>
               
            </a>
        </li>
        <li className="nav-item">
            <a className="nav-link ps-1 pe-2" href="#">
                <img src='images/social/github.png' height="50px" />
            </a>
        </li>
        <li className="nav-item align-self-center">
            <a className="nav-link text-white fw-bold btn btn-danger" href="#">EMAIL</a>
        </li>
    </ul> 
  )
}
