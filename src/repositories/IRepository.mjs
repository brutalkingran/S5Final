// capa de persistencia
// interfaz crud
// implementacion crud de pais
// Permite reutilizar código de acceso a datos y facilita la migración de bases de datos.
// "Declaramos" nuestros métodos
// 3)

class IRepository {
    obtenerTodos() {
        throw new Error("Método 'obtenerTodos()' no implementado");
    }

    agregarPais(atributo, valor) {
        throw new Error("Método 'agregarPais()' no implementado");
    }

    editarPais() {
        throw new Error("Método 'editarPais()' no implementado");
    }

    borrarPais() {
        throw new Error("Método 'borrarPais()' no implementado")
    }

    obtenerPais( id ) {
        throw new Error("Método 'obtenerPais()' no implementado")
    }
}

export default IRepository;