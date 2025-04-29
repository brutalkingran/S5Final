import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes } from "../services/paisesService.mjs";

// Ruta principal
export const mostrarIndexController = async ( req, res ) => {
    try {
        res.render('index', {
            title: 'Página Principal',
            navbarLinks: [
                { text: 'Inicio', href: '/', icon: '/icons/home.svg' },
                { text: 'Dashboard', href: '/dashboard', icon: '/icons/info.svg' },
                { text: 'Añadir país', href: '/addSuperhero', icon: '/icons/contact.svg' }
            ]
        });
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al cargar index`,
            error: error.mensaje
        });
    }
}

export const mostrarDashboardController = async  (req, res) => {
    try {
        const superheroes = await obtenerTodosLosSuperheroes(); 
        const cambio = req.query.cambio ? JSON.parse(decodeURIComponent(req.query.cambio)) : null; // por si hay cambio en la URL

        res.render('dashboard', {
            superheroes,
            cambio,
            title: 'Dashboard',
            navbarLinks: [
                { text: 'Inicio', href: '/', icon: '/icons/home.svg' },
                { text: 'Dashboard', href: '/dashboard', icon: '/icons/info.svg' },
                { text: 'Añadir país', href: '/addSuperhero', icon: '/icons/contact.svg' }
            ]
        });       
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al cargar dashboard`,
            error: error.mensaje
        });  
    }
}

export const crearSuperHeroeFormularioController = async ( req, res ) => {
    try {
        res.render('addSuperhero', {
            title: 'Añadir país',
            navbarLinks: [
                { text: 'Inicio', href: '/', icon: '/icons/home.svg' },
                { text: 'Dashboard', href: '/dashboard', icon: '/icons/info.svg' },
                { text: 'Añadir país', href: '/addSuperhero', icon: '/icons/contact.svg' }
            ]
        });
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al acceder al formulario`,
            error: error.mensaje
        });
    }
}

// export const obtenerTodosLosSuperheroesController = async ( req, res ) => {
//     try {
//         const superheroes = await obtenerTodosLosSuperheroes();
        
//         const cambio = req.query.cambio ? JSON.parse(decodeURIComponent(req.query.cambio)) : null; // por si hay cambio en la URL

//         res.render('dashboard', { superheroes, cambio });
//     } catch (error) {
//         res.status(500).send({
//             mensaje: `Error al obtener los superhéroes`,
//             error: error.mensaje
//         });
//     }
// }

export const modificarSuperheroeFormularioController = async ( req, res ) => {
    try {
        const { id } = req.params;
        const superheroeEditable = await obtenerSuperheroePorId( id );
        
        res.render('editSuperhero', {
            superheroeEditable,
            title: 'Editar país',
            navbarLinks: [
                { text: 'Inicio', href: '/', icon: '/icons/home.svg' },
                { text: 'Dashboard', href: '/dashboard', icon: '/icons/info.svg' },
                { text: 'Añadir país', href: '/addSuperhero', icon: '/icons/contact.svg' }
            ]
        });
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al cargar formulario`,
            error: error.mensaje
        });
    }
}

export const mostrarErroresController = async ( req, res ) => {
    try {
        res.render('errorDisplay', {
            errors: req.validationErrors,
            title: 'Error',
            navbarLinks: [
                { text: 'Inicio', href: '/', icon: '/icons/home.svg' },
                { text: 'Dashboard', href: '/dashboard', icon: '/icons/info.svg' },
                { text: 'Añadir país', href: '/addSuperhero', icon: '/icons/contact.svg' }
            ]
        });    
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al cargar errores`,
            error: error.mensaje
        });
    }
}