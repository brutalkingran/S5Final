// capa de presentación
// funciones para mostrar datos de superhéroes
// 6)

export const renderizarSuperheroe = ( pais ) => {
    return {
        Nombre: pais.nombreSuperHeroe,
        "Nombre Real": pais.nombreReal,
        Edad: pais.edad,
        "Planeta de Origen": pais.planetaOrigen,
        Debilidad: pais.debilidad,
        Poderes: pais.poderes,
        Aliados: pais.aliados,
        Enemigos: pais.enemigos
    }
}

export const renderizarListaSuperheroes = (superheroes) => {
    return superheroes.map(pais => renderizarSuperheroe(pais));
}

export const formatearArray = ( textoArray = '' ) => {
    return textoArray
        .split(",")
        .map(( elemento ) => {
            return elemento.trim();
        })
        .filter( elemento => {
            return elemento !== ""
        } );
}