import { useState, useEffect } from 'react';
import Lowlight from 'react-lowlight';
import javascript from 'highlight.js/lib/languages/javascript'
import Markdown from 'marked-react';
import Pages from "../Pages";
import 'highlight.js/styles/vs2015.css'

// Acá serían parámetros
// Este componente, en esencia lo que hace es que la primera vez que se monta, y solo la primera vez:
// es traer la información del markdown, seteando un nuevo estado con la cadena de texto
// para posteriormente, renderizarlo con la librería de marked-react y resaltar el código con Lowlight
function ArrayMethods() {
    // Cada componente tiene su estado
    /** Los estados sirven para saber cuándo se va a re-renderizar un componente
     * Por ej:
     * en el ejemplo del carrito de compras, si tenemos 4 productos, y agregamos 1 (por ejemplo una escoba)
     * ¿Qué tengo que agregar al carrito?
     * Una escboca, con lo cual es componente se debe re-renderizar para ahora mostrar la escoba
     * React para lograr esto nos provee un "hook", que en inglés signifca "gancho":
     * El hook para manejar los estados de los componentes se llama:
     * 
     * useState();
     * 
     * Que se le pasa como primer argumento, el estado inicial
     * EJ:
     * 
     * ¿Cuál sería mi estado inicial en un carrito de compraste? 0 elementos
     * 
     * useState(0);
     */

    // Destructuring / Destructuración
    // useState returns an array, the first element in the array is the state, the second one is the function to CHANGE the state
    /** function useState() {
     * // Código que maneja el estado
     * 
     * // state es el estado, no una función 
     * return [state, funcionParaCambiarElEstado];
     * } */

    // markdown = state, setMarkdown = funcionParaCambiarElEstado
    // Poniendo los corchetes, en este caso, con este tipo de sintaxis, lo que digo es
    // "hey javascript, lo que viene después del signo = de asignación es un array, por favor, en la primera posición, quiero"
    // ponerle de nombre markdown a lo que venga en la primera posición, y setMarkdown a lo que venga en la segunda posición
    const [markdown, setMarkdown] = useState("");

    /*
    EJEMPLO MÁS DIDÁCTIVO:

    function productos() {

        return [productoUno, productoDos,...]
    }

    const [primerProducto, segundoProducto, ...otrosProductos] = productos();
    
    Spread operator ...*/


    /** Pongamos el siguiente ejemplo, cuando una persona se va a dormir,
     * podemos decir que su estado es = dormido o acostado
     * Si un auto está apagado su estado es = apagado
     * Si un avión está volando, su estado es = volando
     * 
     * Si un carrito de compras online tiene 4 productos, su estado es = 4 productos
     * Si le agrego un producto al carrito cambia el estado, ahora será estadoCarrito(4) + 1 = 5
     */

    // Tampoco sabemos qué hace
    // En una carrera de 100m, hay diferentes etapas:
    /**
     * 
     * 1.) Cuando el runner está posición de largada
     * 2.) Cuando está corriendo
     * 3.) Cuando termina la carrera
     * 
     * Con los componentes, pasa igual, es decir, este componente Event (para este caso), tenemos las siguientes etapas:
     * 
     * 1) Cuando el componente se está empezando a renderizar (cuando se empieza a pintar en la página, esta etapa se conoce como: cuando el componente se monta)
     * 2) Cuando se pinta en la página (cuando se renderiza)
     * 3) Cuando el componente desaparecer de la página (o cuando el componente se desmonta de la página)
     * 
     * El useEffect cumple con tal propósito, es decir, indicarnos las etapas (o ciclos de vida) de mi componente
     */
    // useEffect es una función de REACT (es como un event listener a las etapas del render pipeline)
    useEffect(() => {
        // Render pipeline (pipeline, es el hilo de trabajo, o la cronología de algo):
        // Monte -> render -> desmonte
        // CUANDO SE MONTE EL COMPONENTE QUEREMOS TRAER LA DATA DE MI FICHERO MARKDOWN (MD)
        // Lo que esté en la carpeta public va a ser el "servidor"
        fetch('/contenido/array-methods.md')
        // then recibe como argumento, una callback, o sea, una función
        // Esa función trae el estado de la respuesta
        .then(response => response.text())
        // Recién aquí, tenemos la data como tal, ya que el primero then solo lo usamos para devolver, la respuesta
        // y la tranformamos a un string usando la función text, que ya viene nativamente dentro de responde
        // Una vez que tenemos el texto, actualizamos el estado, para que ahora state (markdown), sea el contenido del archivo MD
        // en este caso el archivo md de event-event-loop-DOM.md
        .then(text => setMarkdown(text));

        /*return (
            //lógica de desmonte del componente
        )*/
    }, []);
    /* La función es lo que sucederá cuando se monte el componente, el return de dicha función es lo que sucederá
    cuando se desmonte el componente.

    Y las dependencias son, las variables de las que dependerá, mi useEffect.
    Por ejemplo:

    Si mi useEffect, tiene como dependencia markdown (recordemos que es el estado), cuando el estado cambie, 
    la función dentro de useEffect (cuando se componente) volverá a dispararse. Esto quiere decir que si tengo un array vacío
    como dependencia
    useEffect(funcion, dependencias);
    */

    // Esto yo lo hice porque así lo dice la documentación de Lowlight, que es la librería
    // para que podamos resaltar el código con colorcitos en nuestra página
    Lowlight.registerLanguage('javascript', javascript);
    // Lo mismo, así dice la librería
    // En esencia lo que hace esta función, es retornar el componete Lowlight, que lo sacamos de la librería
    const renderer = {
        code(snippet, lang) {
            return <Lowlight key={this.elementId} language={lang} value={snippet} />;
        }
    }

    /** Código JSX, porque JavaScript no entiende HTML realmente
    entonces los devs de Facebook desarrollaron un "mini lenguaje", para que los devs
    puedan retornar "HTML" en JS */
    /* APD (as per documentation) La librería dice que tenemos que llamar al componente Markdown, y pasarle
     * el renderer para sobresaltar los colores de nuestros snippets (que son los pedacitos de código)
     * y el value que va a contener adentro todo el texto en mardkwon
     */
    return (
        <Pages>
           <Markdown value={markdown} renderer={renderer}/>
        </Pages>
    )
}


export default ArrayMethods 