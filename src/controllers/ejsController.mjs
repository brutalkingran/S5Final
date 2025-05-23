import { mostrarTodosLosPaises, obtenerPaisPorId } from "../services/paisesService.mjs";

// Ruta principal
export const mostrarIndexController = async (req, res) => {
    try {
        res.render('index', {
            title: 'Página Principal',
            navbarLinks: [
                { text: 'Inicio', href: '/', icon: '/icons/home.svg' },
                { text: 'Dashboard', href: '/dashboard', icon: '/icons/info.svg' },
                { text: 'Añadir país', href: '/addPais', icon: '/icons/contact.svg' }
            ]
        });
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al cargar index`,
            error: error.message
        });
    }
}

// Dashboard
export const mostrarDashboardController = async (req, res) => {
    try {
        const paises = await mostrarTodosLosPaises(); 

        res.render('dashboard', {
            paises,
            title: 'Dashboard',
            navbarLinks: [
                { text: 'Inicio', href: '/', icon: '/icons/home.svg' },
                { text: 'Dashboard', href: '/dashboard', icon: '/icons/info.svg' },
                { text: 'Añadir país', href: '/addPais', icon: '/icons/contact.svg' }
            ]
        });       
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al cargar dashboard`,
            error: error.message
        });  
    }
}

// Formulario crear país
export const crearPaisFormularioController = async (req, res) => {
    try {
        res.render('addPais', {
            title: 'Añadir país',
            navbarLinks: [
                { text: 'Inicio', href: '/', icon: '/icons/home.svg' },
                { text: 'Dashboard', href: '/dashboard', icon: '/icons/info.svg' },
                { text: 'Añadir país', href: '/addPais', icon: '/icons/contact.svg' }
            ]
        });
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al acceder al formulario`,
            error: error.message
        });
    }
}

// Formulario modificar país
export const modificarPaisFormularioController = async (req, res) => {
    try {
        const { id } = req.params;
        const paisEditable = await obtenerPaisPorId(id);

        // Convertir Map a objeto plano si existe
        const giniPlano = paisEditable.gini ? Object.fromEntries(paisEditable.gini) : {};

        res.render('editPais', {
            paisEditable: {
                ...paisEditable.toObject(), // Convierte el documento Mongoose a objeto plano
                gini: giniPlano              // Reemplaza gini con el objeto plano
            },
            title: 'Editar país',
            navbarLinks: [
                { text: 'Inicio', href: '/', icon: '/icons/home.svg' },
                { text: 'Dashboard', href: '/dashboard', icon: '/icons/info.svg' },
                { text: 'Añadir país', href: '/addPais', icon: '/icons/contact.svg' }
            ]
        });
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al cargar formulario`,
            error: error.message
        });
    }
}

// Página errores
export const mostrarErroresController = async (req, res) => {
    try {
        res.render('errorDisplay', {
            errors: req.validationErrors,
            title: 'Error',
            navbarLinks: [
                { text: 'Inicio', href: '/', icon: '/icons/home.svg' },
                { text: 'Dashboard', href: '/dashboard', icon: '/icons/info.svg' },
                { text: 'Añadir país', href: '/addPais', icon: '/icons/contact.svg' }
            ]
        });    
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al cargar errores`,
            error: error.message
        });
    }
}
