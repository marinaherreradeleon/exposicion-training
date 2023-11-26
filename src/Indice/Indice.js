import { Link } from "react-router-dom";
import "./Indice.css"

function Indice(props) {
    const animationClass = "animate__animated";
    return (
        <div className={`${animationClass} animate__flipInX container`}>
            <div className="relative-wrapper">
                <div className="fondo-blanco"></div>
                <div className="indice">
                    <div>
                        <ul>
                            <li className={`${animationClass} animate_fadeIn`}><Link to="/event-y-event-loop">Event, Event Loop & DOM</Link></li>
                            <li className={`${animationClass} animate_fadeIn`}><Link to="/promesas-y-fetch">Promesas & Fetch</Link></li>
                            <li className={`${animationClass} animate_fadeIn`}><Link to="/array-methods">Array Methods & Functional Loops</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Indice;
