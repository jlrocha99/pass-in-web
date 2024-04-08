// jsx é a possibilidade de escrevermos html dentro de um arquivo js
// JSX = Java Script Xml
// TSX = Type Script Xml

import nlwUniteIcon from '../assets/nlw-unite-icon.svg'
import { NavLink } from './nav-link'

export function Header() {
    return (

        <div className="flex items-center gap-5 py-2">
            <img src={nlwUniteIcon}/>

            <nav className="flex items-center gap-5">
                <NavLink href="/events">Events</NavLink>
                <NavLink href="participantes">Participantes</NavLink>
            </nav>


        </div>
    )

}