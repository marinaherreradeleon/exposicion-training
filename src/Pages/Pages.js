import { Link } from "react-router-dom";
import "./Pages.css";

function Pages(props) {
    console.log(props.elAmorDeMiVida, props.children);
    return(
        <div className="animate__animated animate__fadeIn animate__fast container-pages">
            <div className="button-container">
                <Link className="button" to="/" style={{"--color":"#3d1264"}}>
                    Volver
                </Link>
            </div>
            {props.children}
        </div>
    )
}

export default Pages;