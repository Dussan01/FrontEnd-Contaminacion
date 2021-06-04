import { createRouter, createWebHistory } from "vue-router";
import store from '../store'


import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";
import VerUsuario from "@/views/Dashboard/VerUsuario.vue";

// import Dashboard from "../views/Dashboard.vue";
import Icons from "../views/Welcome.vue";
import Maps from "../views/Maps.vue";
import Profile from "../views/UserProfile.vue";
import Tables from "../views/Tables.vue";
import Usuarios from "../views/Usuarios.vue";
import Marca from "../views/marcas/view_marcas.vue";
import Modelo from "../views/usuarios/Usuario.vue"


import Agregar from "../views/usuarios/Usuario.vue";
import DatosAgregados from "../views/usuarios/UsuariosTable.vue";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";

const routes = [

    {
        path: "/dashboard",
        redirect: "/dashboard",
        name: 'Plataform',
        component: DashboardLayout,
        meta: { requireAuth: true },
        children: [{
                path: "/usuarios",
                name: "usuarios",
                components: { default: Usuarios },
            },
            {
                path: "/marca",
                name: "marca",
                components: { default: Marca },
            }, {
                path: "/modelo",
                name: "modelo",
                components: { default: Modelo },
            },
            {
                path: "/dashboard",
                name: "Dashboard",
                components: { default: Icons },
            },
            {
                path: "/icons",
                name: "icons",
                components: { default: Icons },
            },
            {
                path: "/maps",
                name: "maps",
                components: { default: Maps },
            },
            {
                path: "/profile",
                name: "profile",
                components: { default: Profile },
            },
            {
                path: "/tables",
                name: "tables",
                components: { default: Tables },
            },
            {
                path: "/verUsuario/:id",
                name: "verUsuario",
                components: { default: VerUsuario },
            },
            {
                path: "/verUsuario/:id",
                name: "verUsuario",
                components: { default: VerUsuario },
            },
            {
                path: "/Agregar",
                name: "agregar",
                components: { default: Agregar},
            },{
                path: "/DatosAgregados",
                name: "datosagregados",
                components: { default: DatosAgregados},
            },

        ],

    },

    {
        path: "/",
        redirect: "home",
        component: AuthLayout,
        children: [{
                path: "/login",
                name: "login",
                components: { default: Login },
            },
            {
                path: "/register",
                name: "registro",
                components: { default: Register },
            },
             {
                path: "/home",
                name: "home",
                components: { default: Home },
            },
        ],
    },
    
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});


router.beforeEach((to, from, next) => {
    const rutaProtegida = to.matched.some(record => record.meta.requireAuth);
    console.log(rutaProtegida)
    if (rutaProtegida && store.state.toke === null) {
        // ruta protegida es true
        // token es nulo true, por ende redirigimos al inicio
        next({ name: 'login' })
    } else {
        // En caso contrario sigue...
        // console.log("aqui pasa")

        next()
    }

})






export default router;