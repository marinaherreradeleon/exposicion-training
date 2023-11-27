
# DOM

El DOM, que significa "Document Object Model" (Modelo de Objetos del Documento), es una representación jerárquica y estructurada de un documento HTML en la memoria del navegador. 
Básicamente, es la forma en que el navegador organiza y estructura un documento web, permitiendo a los programas y scripts acceder y manipular la estructura, contenido y estilo del documento de manera dinámica.

![Jerarquia](https://somospnt.com/images/blog/articulos/88-post-dom-virtual-2/DOM-arbol.png)

Vamos a desglosar algunas de las ideas clave sobre el DOM:

### 1. Estructura Jerárquica:

El DOM organiza la estructura del documento en forma de un árbol jerárquico. En este árbol, cada elemento del documento, como etiquetas HTML (por ejemplo, <div>, <p>, <h1>) y sus atributos, es representado por un nodo.

### 2. Nodos:

Cada parte del documento es un nodo en el árbol DOM. Hay varios tipos de nodos, como nodos de elemento, nodos de texto, nodos de atributo, etc.

### 3. Relación con HTML:

El DOM refleja la estructura del documento HTML. Cada etiqueta HTML se convierte en un nodo en el DOM, y las relaciones entre las etiquetas (como la relación padre-hijo) se representan en la estructura del árbol.

### 4. Acceso y Manipulación con JavaScript:

JavaScript puede interactuar con el DOM para cambiar dinámicamente el contenido, estructura y estilo de una página web. Puedes seleccionar nodos, modificar su contenido, agregar o eliminar elementos, cambiar estilos y mucho más.

```javascript
// Ejemplo: Cambiar el contenido de un elemento con JavaScript
let miParrafo = document.getElementById('miParrafo');
miParrafo.innerHTML = '¡Hola, mundo!';
```

El DOM es esencial para la programación web, ya que proporciona una interfaz estructurada y manipulable para que los scripts del lado del cliente (como JavaScript) interactúen con el contenido de una página web. 

# Event Loop

## Engine de Javascript

Es un motor que interpreta y ejecuta nuestro código JavaScript. Sin nuestro engine, JavaScript sería como un block de notas, o sea; texto plano, sin significado computacional.

## Web API

La Web API es un conjunto de API's o herramientas que te da el browser que se utiliza para dar funcionalidades a una página. Por ejemplo

- El DOM
- La fetch API
- El setTimeout
- La geolocalización
- Y muchas más

## Event Loop

Imagina que JavaScript es un empleado que tiene que hacer muchas tareas diferentes. Este empleado (JavaScript) tiene una mesa (la pila de llamadas) donde coloca las tareas que necesita hacer. A veces, algunas de estas tareas toman tiempo, como pedir datos de internet. En lugar de esperar haciendo nada, JavaScript pone estas tareas largas en una mesa diferente (Web APIs) y continúa con otras tareas más rápidas.

Cuando las tareas largas están listas (como recibir los datos de internet), se trasladan a una cola (cola de tareas) esperando su turno. El "event loop" es como el administrador de la oficina que revisa constantemente si JavaScript tiene espacio en su mesa para más trabajo. Si la mesa está vacía, el event loop pasa la siguiente tarea de la cola a la mesa de JavaScript.

Así, JavaScript puede hacer muchas tareas de manera eficiente, sin quedar atascado esperando que una tarea larga se complete. Esto permite que las aplicaciones web sean rápidas y responsivas, incluso cuando están haciendo muchas cosas a la vez.

Para entender event loop, primero tenemos que entender cómo funciona JavaScript. Para eso vamos a explicar algunas ideas:

### Callstack

Cuando invocamos una función en JavaScript, se añade a algo llamado "pila de llamadas" (call stack). La pila de llamadas es parte del engine y no es específica de los navegadores. Funciona como una pila, lo que significa que el último elemento en entrar es el primero en salir (como una pila de vasos). Cuando una función devuelve un valor, se elimina de la pila. Por ejemplo:

![Callstack de JavaScript](https://res.cloudinary.com/practicaldev/image/fetch/s--Kn5tSJEm--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gid1.6.gif)

### Ahora sí, podemos seguir entendiendo el event loop

La función respond devuelve una función setTimeout. setTimeout nos la proporciona la Web API: nos permite retrasar tareas sin bloquear el hilo principal. La función de callback que pasamos a setTimeout, la función flecha `() => { return 'Hey' }`, se añade a la Web API. Mientras tanto, tanto la función setTimeout como la función respond se eliminan de la pila, ¡ya que ambas devolvieron sus valores!

![seTimeout](https://res.cloudinary.com/practicaldev/image/fetch/s--fqt0UJmH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif2.1.gif)

En la Web API, hay un cronómetro que corre por el tiempo que le pasamos como segundo argumento, o sea, 1000 milisegundos. La función de retorno (callback) no se agrega de una al montón de tareas (pila de llamadas), sino que se pasa a algo que se llama la cola.

![timer de la web api](https://res.cloudinary.com/practicaldev/image/fetch/s--qxI9YF9R--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif3.1.gif)

Esta parte puede ser confusa: no significa que la función de retorno (callback) se agregue a la pila de llamadas (y por ende devuelva un valor) después de 1000 milisegundos. ¡Solo se añade a la cola después de 1000 milisegundos! Pero es una cola, ¡la función tiene que esperar su turno!

Ahora viene la partede que el buc le de eventos (event loop) haga su única tarea: conectar la cola con la pila de llamadas! Si la pila de llamadas está vacía, o sea, si todas las funciones previamente invocadas devolvieron sus valores y fueron sacadas de la pila, el primer elemento de la cola se agrega a la pila de llamadas. En este caso, no se invocaron otras funciones, lo que significa que la pila de llamadas estaba vacía en el momento en que la función de retorno era el primer elemento en la cola.

![queue](https://res.cloudinary.com/practicaldev/image/fetch/s--OIG-_8dF--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif4.gif)

La función de retorno (`callback`) se agrega a la pila de llamadas, se invoca, devuelve un valor y luego se saca de la pila.

![event loop](https://res.cloudinary.com/practicaldev/image/fetch/s--uJB5zTD7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif5.gif)

## Ejemplo práctico

Vamos con un ejemplo en código:

```javascript
// Una arrow function que imprime first
const foo = () => console.log("First");
// Una arrow function que devuelve un setTimeout con un console log, se debe esperar medio segundo
const bar = () => setTimeout(() => console.log("Second"), 500);
// Lo mismo que la primera arrow function pero con "third"
const baz = () => console.log("Third");

bar();
foo();
baz();
```

Veamos como funciona esto en el visualizador:

![visualizador de event loop](https://res.cloudinary.com/practicaldev/image/fetch/s--dhjH4Wt---/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif14.1.gif)

1. Invocamos `bar` devuelve una función setTimeout.
2. El callback que pasamos a setTimeout se añade a la Web API, la función `setTimeout` y bar se sacan de la pila de llamadas.
3. El temporizador corre, mientras tanto `foo` se invoca y muestra "First". `foo` retorna (`undefined`), `baz` se invoca, y el callback se añade a la cola.
4. baz muestra "Third". El bucle de eventos (event loop) ve que la pila de llamadas está vacía después de que `baz` retornó, después de lo cual el callback se añade a la pila de llamadas.
5. El callback muestra "Second"


### Preguntas frecuentes

**¿Pueden añadirse llamadas al call stack si no está vacía? ¿Qué pasa si agregamos llamadas con llamadas ya existentes en la call stack?**

Si en el event loop, al momento de agregar llamadas provenientes de la cola (queue) ya existen otras llamadas en la pila de llamadas (call stack), el event loop no agregará las llamadas de la cola a la pila de llamadas hasta que esta última esté vacía.

El event loop siempre verifica primero si la pila de llamadas está vacía antes de mover una llamada de la cola a la pila. Si hay funciones en ejecución en la pila de llamadas, el event loop espera a que estas se completen y sean eliminadas de la pila. Solo después de que la pila de llamadas esté completamente vacía, el event loop tomará la primera llamada en la cola y la pasará a la pila de llamadas para su ejecución. Este proceso ayuda a asegurar una ejecución ordenada y evita el bloqueo de la interfaz de usuario, manteniendo la aplicación web rápida y receptiva.



# Event

Cuando abrimos el navegador, el usuario interactúa con el DOM realizando acciones que serian los "Eventos", como hacer clic en un botón, mover el ratón, cargar una página, etc. y nosotros tenemos que detectar cuando ocurran esos eventos y ejecutar funciones específicas cuando ocurran ciertos eventos.
Aquí hay algunos conceptos básicos sobre eventos en JavaScript:

## 1. Tipos de Eventos:

- Eventos del ratón: Como hacer clic, mover el ratón, etc.
- Eventos del teclado: Como pulsar una tecla.
- Eventos del formulario: Como enviar un formulario.
- Eventos del documento: Como cargar o descargar un documento.
- Eventos de ventana: Como cambiar el tamaño de la ventana del navegador.

## 2. Escuchar Eventos:

Para manejar eventos en JavaScript, primero debemos seleccionar el elemento al que deseas agregar el evento. Puedes hacer esto utilizando `document.getElementById`, `document.querySelector`, u otros métodos de selección de elementos.

Luego, puedes usar el método `addEventListener` para "escuchar" el evento y ejecutar una función cuando ocurra.

```javascript
// Ejemplo: Agregar un evento de clic a un botón
const miBoton = document.getElementById('miBoton');

miBoton.addEventListener('click', function() {
    // Código a ejecutar cuando se hace clic en el botón
    console.log('¡Hiciste clic en el botón!');
});
```
## 3. Manejar Eventos:

`addEventListener()` es un funcion en JavaScript que se puede utilizar para escuchar y responder a eventos que ocurren en el navegador. Esta función se llama "manejador de eventos". El método recibe dos argumentos:

Argumento 1: el tipo de evento que estamos escuchando (por ejemplo, `"click"`, `"submit"`, etc.).

Argumento 2: Una función de retorno (`callback`) que responde al evento especificado de una manera específica.

Puedes pasar funciones predefinidas o funciones anónimas directamente.

``` javascript
// Ejemplo: Usar una función predefinida como manejador de eventos
function clicEnBoton() {
    console.log('¡Hiciste clic en el botón!');
}

miBoton.addEventListener('click', clicEnBoton);
```

## 4. Objeto de Evento:

Cuando se ejecuta una función del manejador de eventos, se pasa un objeto de **evento** como parámetro. 
El objeto de evento proporciona información detallada sobre un evento específico que ha ocurrido en la página web, como qué tecla se presionó, qué elemento fue el objetivo, etc.

```javascript
miBoton.addEventListener('click', function(event) {
    console.log('¡Hiciste clic en el botón!');
    console.log('Información del evento:', event);
});
```

Aquí hay algunas propiedades comunes del objeto de evento:

- `event.type`: Indica el tipo de evento que ha ocurrido (por ejemplo, `"click"`, `"keydown"`, `"submit"`, etc.).

```javascript
elemento.addEventListener('click', function(event) {
    console.log('Tipo de evento:', event.type);
});

```

- `event.target`: Representa el elemento en el que se originó el evento. Puedes usar esto para saber en qué elemento ocurrió el evento.

```javascript
elemento.addEventListener('click', function(event) {
    console.log('Elemento objetivo:', event.target);
});

```
Es importante mencionar tambien que el objeto event es opcional, eso dependerá de la lógica de nuestro código y si lo que queremos saber está dentro del objeto evento.