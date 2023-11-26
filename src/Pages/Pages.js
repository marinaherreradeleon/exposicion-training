import "./Pages.css";

function Pages(props) {
    console.log(props.elAmorDeMiVida, props.children);
    return(
        <div className="container-pages">
            {props.children}
        </div>
    )
}

export default Pages;