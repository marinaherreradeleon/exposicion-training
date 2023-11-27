# Promesas y Fetch

Como su propio nombre indica, una promesa es algo que, en principio pensamos que se cumplirá, pero en el futuro pueden ocurrir varias cosas:

![Promesas](https://lenguajejs.com/javascript/asincronia/promesas/promises.png)

- La promesa se cumple (promesa resuelta)
- a promesa no se cumple (promesa rechazada)
- La promesa se queda en un estado incierto indefinidamente (promesa pendiente)

Debemos tener claro que existen dos partes importantes de las promesas: como consumirlas (utilizar promesas) y cómo crearlas (preparar una función para que use promesas y se puedan consumir).


## Promesas en Javascript

Las promesas en Javascript se representan a través de un Objeto , y cada promesa estará en un estado concreto: pendiente, aceptada o rechazada. Además, cada promesa tiene los siguientes métodos, que podremos utilizar para utilizarla:

## Métodos

`.then(resolve)`
Ejecuta la función callback resolve cuando la promesa se cumple.


`.catch(reject)`
Ejecuta la función callback reject cuando la promesa se rechaza.


`.then(resolve,reject)`
Método equivalente a las dos anteriores en el mismo `.then()`.

`.finally(end)`
Ejecuta la función callback end tanto si se cumple como si se rechaza.

## Consumir una promesa

La forma general de consumir una promesa es utilizando el `.then()` con un sólo parámetro, puesto que muchas veces lo único que nos interesa es realizar una acción cuando la promesa se cumpla:

```javascript
fetch("/robots.txt").then(function(response) {
      /* Código a realizar cuando se cumpla la promesa */
    });
```

Lo que vemos en el ejemplo anterior es el uso de la función `fetch()`, la cuál devuelve una promesa que se cumple cuando obtiene respuesta de la petición realizada. De esta forma, estaríamos preparando (de una forma legible) la forma de actuar de nuestro código a la respuesta de la petición realizada, todo ello de forma asíncrona.
Recuerda que podemos hacer uso del método `.catch()` para actuar cuando se rechaza una promesa:

```javascript
fetch("/robots.txt")
      .then(function(response) {
        /* Código a realizar cuando se cumpla la promesa */
      })
      .catch(function(error) {
        /* Código a realizar cuando se rechaza la promesa */
      });
```

No olvides indicar el return para poder encadenar las siguientes promesas con `.then()`. Tras un `.catch()` también es posible encadenar `.then()` para continuar procesando promesas.
De hecho, usando arrow functions se puede mejorar aún más la legibilidad de este código, recordando que cuando sólo tenemos una sentencia en el cuerpo de la arrow function hay un return implícito:

```javascript
fetch("/robots.txt")
      .then(response => response.text())
      .then(data => console.log(data))
      .finally(() => console.log("Terminado."))
      .catch(error => console.error(data));
```

Obsérvese además que hemos añadido el método `.finally()` para añadir una función callback que se ejecutará tanto si la promesa se cumple o se rechaza, lo que nos ahorrará tener que repetir la función en el .`then()` como en el `.catch()`.

## Código no bloqueante

Algo muy importante, pero que quizás hemos pasado por alto es que el código que ejecutamos en el interior de un `.then()` es código asíncrono no bloqueante:

- Asíncrono: Porque probablemente no se ejecutará de inmediato, sino que tardará en ejecutarse.
- No bloqueante: Porque mientras espera ser ejecutado, no bloquea el resto del programa.
- ¿Qué significa esto? Significa que cuando llegamos a un `.then()`, el sistema no se bloquea, sino que deja la función «pendiente» hasta que se cumpla la promesa, pero mientras, continúa procesando el resto del programa.
Ejemplo:
```javascript
fetch("/robots.txt")
      .then(response => response.text())
      .then(data => {
        console.log("Código asíncrono");
      });
    
    console.log("Código síncrono")
```

Aunque el console.log("Código asíncrono") figure unas líneas antes del console.log("Código síncrono"), se mostrará más tarde. Esto ocurre porque el `console.log()` del interior del `.then()` no ocurre inmediatamente, y al no ser bloqueante, se continúa con el resto del programa hasta que se ejecute, que lo retomará.

## Crear promesas

En los apartados anteriores hemos aprendido que son las promesas y hemos visto cómo consumirlas utilizando `.then()`. Ahora nos queda la cuestión opuesta, aprender a crear o implementar funciones que devuelvan promesas que puedan consumirse posteriormente.

Volvamos al ejercicio base que comentamos en el primer capítulo de este tema, ahora utilizando promesas. Observa que creamos un nuevo objeto que «envuelve» toda la función `doTask()`.
Al `new Promise()` se le pasa por parámetro una función con dos callbacks:

- El primer callback, resolve, lo utilizaremos cuando se cumpla la promesa.
- El segundo callback, reject, lo utilizaremos cuando se rechace la promesa.
```javascript
const doTask = (iterations) => {
      return new Promise((resolve, reject) => {
        const numbers = [];
    
        for (let i = 0; i < iterations; i++) {
          const number = 1 + Math.floor(Math.random() * 6);
          numbers.push(number);
          if (number === 6) {
            reject({
              error: true,
              message: "Se ha sacado un 6"
            });
          }
        }
    
        resolve({
          error: false,
          value: numbers
        });
      }
    });

doTask(10)
      .then(result => console.log("Tiradas correctas: ", result.value))
      .catch(err => console.error("Ha ocurrido algo: ", err.message));
```




# Fetch

Fetch es el nombre de una nueva API para Javascript con la cuál podemos realizar peticiones HTTP asíncronas utilizando promesas. La forma de realizar una petición es muy sencilla, básicamente se trata de llamar a fetch y pasarle por parámetro la URL de la petición a realizar:

```javascript
const promise = fetch("/robots.txt");

promise.then(function(response) {
  /* ... */
});
```

El `fetch()` devolverá una Promise que será aceptada cuando reciba una respuesta y sólo será rechazada si hay un fallo de red o si por alguna razón no se pudo completar la petición.

El modo más habitual de manejar las promesas es utilizando `.then()`, aunque también se puede utilizar async/await. Esto se suele reescribir de la siguiente forma, que queda mucho más simple y evitamos constantes o variables temporales de un solo uso:

```javascript
fetch("/robots.txt")
  .then(function(response) {
    /** Código que procesa la respuesta **/
  });
```

Al método `.then()` se le pasa una función callback donde su parámetro response es el objeto de respuesta de la petición que hemos realizado. En su interior realizaremos la lógica que queramos hacer con la respuesta a nuestra petición.

`Fetch usando .then()`

Lo que vemos a continuación sería un ejemplo un poco más completo de todo lo que hemos visto hasta ahora:

- Comprobamos que la petición es correcta con `response.ok`
- Utilizamos `response.text()` para procesarla
- En el caso de producirse algún error, lanzamos excepción con el código de error
- Procesamos los datos y los mostramos en la consola
- En el caso de que la Promise sea rechazada, capturamos el error con el catch
- Si ocurre un error 404, 500 o similar, lanzamos error con throw para capturarlo en el catch

```javascript
fetch("/robots.txt")
  .then(response => {
    if (response.ok)
      return response.text();

    throw new Error(response.status);
  })
  .then(data => {
    console.log("Datos: " + data);
  })
  .catch(err => {
    console.error("ERROR: ", err.message)
  });
```

Podemos refactorizar un poco este ejemplo para hacerlo más legible. Creamos la función `isResponseOk()` para procesar la respuesta (invirtiendo el condicional para hacerlo más directo). Luego, los `.then()` y `.catch()` los utilizamos con una arrow function para simplificarlos:

```
const isResponseOk = (response) => {
  if (!response.ok)
    throw new Error(response.status);
  return response.text()
}

fetch("/robots.txt")
  .then(response => isResponseOk(response))
  .then(data => console.log("Datos: ", data))
  .catch(err => console.error("ERROR: ", err.message));
  ```

Sin embargo, aunque es bastante común trabajar con promesas utilizando `.then()`, también podemos hacer uso de async/await para manejar promesas, de una forma un poco más directa. La única diferencia es que con `.then()` el código no es bloqueante, mientras que con async/await si es bloqueante.



