// Importa la función 'run' de Hardhat, que se utiliza para ejecutar tareas definidas en Hardhat
const { run } = require("hardhat");

// Define una función asíncrona llamada 'verify' para verificar contratos en Etherscan
async function verify(contractAddress, args) {
  // Imprime un mensaje en la consola indicando que se está verificando el contrato
  console.log("Verifying contract...");
  try {
    // Ejecuta la tarea de verificación de Hardhat para verificar el contrato en Etherscan
    await run("verify:verify", {
      address: contractAddress, // Dirección del contrato que se va a verificar
      constructorArguments: args, // Argumentos del constructor del contrato
    });
    // Si la verificación es exitosa, imprime un mensaje en la consola
    console.log("Successfully verified contract on Etherscan!");
  } catch (e) {
    // Si ocurre un error durante la verificación, se ejecuta este bloque
    if (e.message.toLowerCase().includes("already verified")) {
      // Si el mensaje de error indica que el contrato ya está verificado, imprime un mensaje en la consola
      console.log("Contract is already verified!");
    } else {
      // Para cualquier otro error, imprime el objeto de error completo en la consola
      console.error(e);
    }
  }
}

// Exporta la función 'verify' para que pueda ser utilizada en otros archivos
module.exports = { verify };
