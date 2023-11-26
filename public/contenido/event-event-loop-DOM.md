Glosario:

1. [Event Loop](#event-loop)
2. Events
3. DOM

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

La función respond devuelve una función setTimeout. setTimeout nos la proporciona la Web API: nos permite retrasar tareas sin bloquear el hilo principal. La función de callback que pasamos a setTimeout, la función flecha () => { return 'Hey' }, se añade a la Web API. Mientras tanto, tanto la función setTimeout como la función respond se eliminan de la pila, ¡ya que ambas devolvieron sus valores!

![seTimeout](https://res.cloudinary.com/practicaldev/image/fetch/s--fqt0UJmH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif2.1.gif)

En la Web API, hay un cronómetro que corre por el tiempo que le pasamos como segundo argumento, o sea, 1000 milisegundos. La función de retorno (callback) no se agrega de una al montón de tareas (pila de llamadas), sino que se pasa a algo que se llama la cola.

![timer de la web api](https://res.cloudinary.com/practicaldev/image/fetch/s--qxI9YF9R--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif3.1.gif)

Esta parte puede ser confusa: no significa que la función de retorno (callback) se agregue a la pila de llamadas (y por ende devuelva un valor) después de 1000 milisegundos. ¡Solo se añade a la cola después de 1000 milisegundos! Pero es una cola, ¡la función tiene que esperar su turno!

Ahora viene la parte que todos estábamos esperando… ¡Es hora de que el bucle de eventos (event loop) haga su única tarea: conectar la cola con la pila de llamadas! Si la pila de llamadas está vacía, o sea, si todas las funciones previamente invocadas devolvieron sus valores y fueron sacadas de la pila, el primer elemento de la cola se agrega a la pila de llamadas. En este caso, no se invocaron otras funciones, lo que significa que la pila de llamadas estaba vacía en el momento en que la función de retorno era el primer elemento en la cola.

![queue](https://res.cloudinary.com/practicaldev/image/fetch/s--OIG-_8dF--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif4.gif)

La función de retorno (callback) se agrega a la pila de llamadas, se invoca, devuelve un valor y luego se saca de la pila.

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

1. Invocamos `bar`. `bar` devuelve una función setTimeout.
2. El callback que pasamos a setTimeout se añade a la Web API, la función `setTimeout` y bar se sacan de la pila de llamadas.
3. El temporizador corre, mientras tanto `foo` se invoca y muestra "First". `foo` retorna (`undefined`), `baz` se invoca, y el callback se añade a la cola.
4. baz muestra "Third". El bucle de eventos (event loop) ve que la pila de llamadas está vacía después de que `baz` retornó, después de lo cual el callback se añade a la pila de llamadas.
5. El callback muestra "Second"


### Preguntas frecuentes

**¿Pueden añadirse llamadas al call stack si no está vacía? ¿Qué pasa si agregamos llamadas con llamadas ya existentes en la call stack?**

Si en el event loop, al momento de agregar llamadas provenientes de la cola (queue) ya existen otras llamadas en la pila de llamadas (call stack), el event loop no agregará las llamadas de la cola a la pila de llamadas hasta que esta última esté vacía.

El event loop siempre verifica primero si la pila de llamadas está vacía antes de mover una llamada de la cola a la pila. Si hay funciones en ejecución en la pila de llamadas, el event loop espera a que estas se completen y sean eliminadas de la pila. Solo después de que la pila de llamadas esté completamente vacía, el event loop tomará la primera llamada en la cola y la pasará a la pila de llamadas para su ejecución. Este proceso ayuda a asegurar una ejecución ordenada y evita el bloqueo de la interfaz de usuario, manteniendo la aplicación web rápida y receptiva.