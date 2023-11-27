# Arrays

Parte GON ARRAY

```javascript
```

# Functional Loops

Los "functional loops" o "bucles funcionales" son una forma de realizar iteraciones sobre elementos de una colección, como un array, utilizando funciones de orden superior en lugar de bucles como for o while. Estas funciones incluyen métodos como forEach, map, filter, reduce, entre otros.

## `forEach`

`forEeach`  se utiliza para ejecutar una función proporcionada una vez por cada elemento presente en un array. Por ejemplo:

Supongamos que tenemos un array de nombres y queremos imprimir cada nombre en la consola utilizando

```javascript
// Array original
let nombres = ['Ana', 'Juan', 'María', 'Pedro'];

// Usando el método forEach para imprimir cada nombre 
nombres.forEach(function(nombre) {
    console.log(nombre);
});
// El resultado de este código será que cada nombre del array se imprimirá en la consola
```
Puedes usar funciones de flecha para hacer el código más conciso. Por ejemplo:

```javascript
let numeros = [1, 2, 3, 4, 5];

numeros.forEach(numero => console.log(numero * 2));
```

Es importante destacar que `forEach` no modifica el array original. Si necesitas crear un nuevo array basado en las operaciones realizadas en forEach, deberías hacerlo dentro de la función.


## `map`:

El método `.map()` en JavaScript se utiliza para crear un nuevo array aplicando una función a cada elemento del array original. Aquí hay un ejemplo:

Supongamos que tenemos un array de números y queremos crear un nuevo array que contenga el cuadrado de cada número en el array original. 

```javascript
// Array original
let numeros = [1, 2, 3, 4, 5];

// Usando el método map para crear un nuevo array con el cuadrado de cada número y DEVOLVER
let cuadrados = numeros.map(function(numero) {
    return numero * numero;
});

// Imprimimos el nuevo array [1, 4, 9, 16, 25]
console.log(cuadrados);
```
1. Definimos un array llamado numeros que contiene los números del 1 al 5.
2. Utilizamos el método .map() en el array numeros. Este método toma una función como argumento, y esa función se ejecuta para cada elemento del array. La función toma cada numero como parámetro y devuelve el cuadrado de ese número.
3. El método .map() devuelve un nuevo array que contiene los resultados de aplicar la función a cada elemento del array original.
4. El resultado de este código será un nuevo array [1, 4, 9, 16, 25], donde cada número ha sido elevado al cuadrado.

### Diferencia entre `forEeach` y `map`

Ambos se utilizan para iterar, la diferencia principal radica en el valor de retorno.
`.forEach()` no devuelve ningún valor (o más precisamente, devuelve undefined). Se utiliza principalmente cuando deseas realizar acciones para cada elemento del array, pero no necesitas crear un nuevo array basado en los resultados de la función.

`.map()` devuelve un nuevo array que se crea aplicando la función a cada elemento del array original. Es útil cuando deseas transformar cada elemento del array y crear un nuevo array con los resultados.
    
## `filter`:

Se utiliza para crear un nuevo array que contiene solo los elementos del array original que cumplen cierta condición.
Supongamos que tenemos un array de edad y queremos crear un nuevo array que contenga solo los de mayores de edad. Podemos usar `.filter()` para lograr esto. 

```javascript
// Array original
let edad = [17, 20, 31, 18, 10];

// Usando el método filter para crear un nuevo array con números mayores que 2
let mayoresDeEdad = edad.filter(function(edadDeLaPersona) {
    return edadDeLaPersona >= 18;
});

// Imprimimos el nuevo array = [20, 31, 18]
console.log(mayoresDeEdad);
```
1. Definimos un array
2. Utilizamos el método .filter() en el array edad. Este método toma una función como argumento. La función se ejecuta para cada elemento del array, y solo se incluyen en el nuevo array aquellos elementos para los cuales la función devuelve true.
3. La función de filtro toma cada numero como parámetro y devuelve true si el número es mayor o igual a 18 y false en caso contrario.
5. Finalmente, imprimimos el nuevo array mayoresDeDos que contiene los números mayores que 2.
6. El resultado de este código será un nuevo array [3, 4, 5], que son los números del array original que son mayores que 2.

## `reduce`:

El método `.reduce()` se utiliza para reducir los elementos de un array a un valor aplicando una función acumuladora. 
Supongamos que tenemos un array de dinero de las personas en el banco y queremos calcular la suma de esos números utilizando:

```javascript
// Array original
let dineroDeLasPersonasEnElBanco = [1000, 3000, 500, 400, 2000];

// Usando el método reduce para calcular la suma del dinero
let suma = dineroDeLasPersonasEnElBanco.reduce(function(acumulador, sumaDelDinero) {
    return acumulador + sumaDelDinero;
}, 0);

// Imprimimos el resultado = 6900
console.log(suma);
```
1. Definimos un array 
2. Utilizamos el método .reduce() en el array numeros. Este método toma dos argumentos: una función acumuladora y un valor inicial del acumulador (en este caso, 0).
3. La función acumuladora toma dos parámetros: acumulador y sumaDelDinero.
4. En cada iteración, la función acumuladora suma el dinero al acumulador. Este resultado se convierte en el nuevo valor de acumulador para la siguiente iteración.
5. Una vez que todos los elementos del array han sido procesados, el resultado final se almacena en la variable suma.
6. Finalmente, imprimimos el resultado, que es la suma de todos los números del array.
7. El resultado de este código será la suma de los números del array original: 6900. 


Estos métodos proporcionan una forma más declarativa y funcional de trabajar con arrays, lo que puede hacer que el código sea más legible y fácil de entender.



