import React from 'react'

export default function Footer(props) {
  return (
    <ul className={`nav justify-content-center bg-${props.style} py-2 text-decoration-none`} style={{opacity: "0.9"}}>
        <li class="nav-item align-self-center fw-bold">
            Gabriel Souza Costa
        </li>
        <li className="nav-item">
            <a className="nav-link text-dark pe-0" target="_blank" href="https://www.linkedin.com/in/gabriel-souza-costa-8443481bb/">
                <img src='images/social/linkedin.png' height="50px"/>
            </a>
        </li>
        <li className="nav-item">
            <a className="nav-link ps-1 pe-2" href="https://github.com/GabrielSouzaCosta/" target="_blank" >
                <img src={`images/social/${props.githubIcon}.png`} height="50px" />
            </a>
        </li>
        <li className="nav-item align-self-center" >
            <a className="nav-link text-white fw-bold btn btn-danger" href="mailto:gabrielsscosta2010@hotmail.com" target="_blank" >EMAIL</a>
        </li>
    </ul> 
  )
}
