# Arrays

Parte GON ARRAY

```javascript
```

# Functional Loops

Los "functional loops" o "bucles funcionales" son una forma de realizar iteraciones sobre elementos de una colección, como un array, utilizando funciones de orden superior en lugar de bucles como for o while. Estas funciones incluyen métodos como forEach, map, filter, reduce, entre otros.

## `forEach`

`forEeach`  es un método en JavaScript que se utiliza para iterar sobre elementos de un array y ejecutar una función para cada elemento. 
Un array en JavaScript es una colección de elementos. `forEach` te permite recorrer cada elemento de ese array uno por uno.

La sintaxis básica de forEach es la siguiente:

```javascript
miArray.forEach(function(elemento) {
    // Código a ejecutar para cada elemento
});
```

`miArray` es tu array.
`function(elemento)` es la función que se ejecutará para cada elemento del array. Puedes nombrar el parámetro como desees.

La función que pases como argumento se ejecutará una vez para cada elemento en el array. Puedes realizar cualquier acción que desees dentro de esa función.

```javascript
let numeros = [1, 2, 3, 4, 5];

numeros.forEach(function(numero) {
    console.log(numero * 2); // Imprime el doble de cada número
});
```

Puedes usar funciones de flecha para hacer el código más conciso. Por ejemplo:

```javascript
let numeros = [1, 2, 3, 4, 5];

numeros.forEach(numero => console.log(numero * 2));
```

Es importante destacar que `forEach` no modifica el array original. Si necesitas crear un nuevo array basado en las operaciones realizadas en forEach, deberías hacerlo dentro de la función.


## `map`:

El método `.map()` en JavaScript se utiliza para crear un nuevo array aplicando una función a cada elemento del array original. Aquí hay un ejemplo para ilustrar cómo funciona:

Supongamos que tenemos un array de números y queremos crear un nuevo array que contenga el cuadrado de cada número en el array original. 

```javascript
// Array original
let numeros = [1, 2, 3, 4, 5];

// Usando el método map para crear un nuevo array con el cuadrado de cada número
let cuadrados = numeros.map(function(numero) {
    return numero * numero;
});

// Imprimimos el nuevo array
console.log(cuadrados);
```
1. Definimos un array llamado numeros que contiene los números del 1 al 5.
2. Utilizamos el método .map() en el array numeros. Este método toma una función como argumento, y esa función se ejecuta para cada elemento del array. La función toma cada numero como parámetro y devuelve el cuadrado de ese número.
3. El método .map() devuelve un nuevo array que contiene los resultados de aplicar la función a cada elemento del array original.
4. El resultado de este código será un nuevo array [1, 4, 9, 16, 25], donde cada número ha sido elevado al cuadrado.

## `filter`:

Se utiliza para crear un nuevo array que contiene solo los elementos del array original que cumplen cierta condición.
Supongamos que tenemos un array de números y queremos crear un nuevo array que contenga solo los números mayores que 2. Podemos usar .filter() para lograr esto. 

```javascript
// Array original
let numeros = [1, 2, 3, 4, 5];

// Usando el método filter para crear un nuevo array con números mayores que 2
let mayoresDeDos = numeros.filter(function(numero) {
    return numero > 2;
});

// Imprimimos el nuevo array
console.log(mayoresDeDos);
```
1. Definimos un array llamado numeros que contiene los números del 1 al 5.
2. Utilizamos el método .filter() en el array numeros. Este método toma una función como argumento. La función se ejecuta para cada elemento del array, y solo se incluyen en el nuevo array aquellos elementos para los cuales la función devuelve true.
3. La función de filtro toma cada numero como parámetro y devuelve true si el número es mayor que 2 y false en caso contrario.
4. El método `.filter()` devuelve un nuevo array que contiene solo los elementos del array original que cumplen la condición especificada en la función.
5. Finalmente, imprimimos el nuevo array mayoresDeDos que contiene los números mayores que 2.
6. El resultado de este código será un nuevo array [3, 4, 5], que son los números del array original que son mayores que 2.

## `reduce`:

El método `.reduce()` se utiliza para reducir los elementos de un array a un único valor aplicando una función acumuladora. 
Supongamos que tenemos un array de números y queremos calcular la suma de esos números utilizando:

```javascript
// Array original
let numeros = [1, 2, 3, 4, 5];

// Usando el método reduce para calcular la suma de los números
let suma = numeros.reduce(function(acumulador, numero) {
    return acumulador + numero;
}, 0);

// Imprimimos el resultado
console.log(suma);
```
1. Definimos un array llamado numeros que contiene los números del 1 al 5.
2. Utilizamos el método .reduce() en el array numeros. Este método toma dos argumentos: una función acumuladora y un valor inicial del acumulador (en este caso, 0).
3. La función acumuladora toma dos parámetros: acumulador y numero. La primera vez que se ejecuta, acumulador es el valor inicial que proporcionamos (0) y numero es el primer elemento del array.
4. En cada iteración, la función acumuladora suma el numero al acumulador. Este resultado se convierte en el nuevo valor de acumulador para la siguiente iteración.
5. Una vez que todos los elementos del array han sido procesados, el resultado final se almacena en la variable suma.
6. Finalmente, imprimimos el resultado, que es la suma de todos los números del array.
7. El resultado de este código será la suma de los números del array original: 1 + 2 + 3 + 4 + 5 = 15. 


Estos métodos proporcionan una forma más declarativa y funcional de trabajar con arrays, lo que puede hacer que el código sea más legible y fácil de entender.



