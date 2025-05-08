// capa de presentación
// funciones para mostrar datos de países
// 6)

export const renderizarPais = (pais) => {
    return {
        nombreOficial: pais.name?.official,
        capital: pais.capital,
        fronteras: pais.borders,
        area: pais.area,
        poblacion: pais.population,
        gini: pais.gini ? Object.fromEntries(pais.gini) : null,
        zonasHorarias: pais.timezones,
        creador: pais.creador,
        creadoEn: pais.createdAt
    };
};

export const renderizarListaPaises = (paises) => {
    return paises.map(pais => renderizarPais(pais));
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