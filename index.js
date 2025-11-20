function fibonacci(cantidad) {
    let serie = [];

    let primero = 0, segundo = 1;

    for (let i = 0; i < cantidad; i++) {
        serie.push(primero);
        let siguienteNumero = primero + segundo;
        primero = segundo;
        segundo = siguienteNumero;
    }

    return serie;
}


import readline from "readline";

const lector = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

lector.question("¿Cuántos números de la serie Fibonacci deseas mostrar?: ", (respuesta) => {
    let cantidadNumeros = parseInt(respuesta);

    if (isNaN(cantidadNumeros) || cantidadNumeros <= 0) {
        console.log("Por favor, ingresa un número válido mayor a 0.");
    } else {
        console.log(`Serie Fibonacci (${cantidadNumeros} números):`);
        console.log(fibonacci(cantidadNumeros).join(", "));
    }

    lector.close();
});
