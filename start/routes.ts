/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import './hook/index.js'
import { middleware } from './kernel.js'


router.on('/').render('pages/home').as('landing')
router.get('/login', '#controllers/auth_controller.login').as('login')
router.post('/login', '#controllers/auth_controller.postLogin').as('post_login')
router.get('/register', '#controllers/auth_controller.register').as('register')
router.post('/register', '#controllers/auth_controller.postRegister').as('post_register')
router.get('/logout', '#controllers/auth_controller.logout').as('logout')

router.group(() => {
    router.get('/beranda', '#controllers/berandas_controller.index').as('beranda')
    router.group(() => {
        router.group(() => {
            router.get('/', '#controllers/perhitungan/pensiuns_controller.index').as('index')
            router.get('/add', '#controllers/perhitungan/pensiuns_controller.add').as('add')
            router.post('/add', '#controllers/perhitungan/pensiuns_controller.post_add').as('post_add')
            router.get('/edit/:id', '#controllers/perhitungan/pensiuns_controller.edit').as('edit')
            router.post('/edit', '#controllers/perhitungan/pensiuns_controller.post_edit').as('post_edit')
            router.get('/delete/:id', '#controllers/perhitungan/pensiuns_controller.post_delete').as('post_delete')
        }).as('pensiun').prefix('pensiun')
    }).prefix('perhitungan').as('perhitungan')
}).use(middleware.auth())


