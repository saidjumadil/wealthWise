// import type { HttpContext } from '@adonisjs/core/http'

import User from "#models/user"
import hash from "@adonisjs/core/services/hash"
// import md5 from 'crypto-js/md5';


export default class AuthController {
    async login({ view }: { view: any }) {
        return view.render('pages/login')
    }

    async postLogin({ response, request, session, auth }: any) {
        const post = request.all()
        // console.log(await hash.make(post.password))
        const user: any = await User.findBy('username', post.username)
        console.log(user.password)
        if (!user) {
            session.flash('status', { type: 'danger', message: 'Akun tidak terdaftar, Silahkan mendaftar terlebih dahulu' })
            return response.redirect().back()
        }

        //Verifying user
        const login = await hash.verify(user.password, post.password)
        if (login) {
            await auth.use('web').login(user)
            session.flash('status', { type: 'success', message: 'Berhasil Login' })
            return response.redirect().toRoute('beranda')
        } else {
            session.flash('status', { type: 'danger', message: 'Password anda salah. Silahkan coba kembali' })
            return response.redirect('back')
        }
    }

    async register({ view }: { view: any }) {
        return view.render('pages/register')
    }

    async postRegister({ response, request, session }: { response: any, request: any, session: any }) {
        const post = request.all()
        if (post.confirm_password != post.password) {
            session.flash('status', { type: 'danger', message: 'Password tidak sama' })
            return response.redirect('back')
        }
        // post['password'] = await hash.make(post.password)

        delete post.confirm_password
        const create = await User.create(post)

        if (create) {
            session.flash('status', { type: 'success', message: 'Akun berhasil ditambahkan' })
            // return response.redirect('back')
            return response.redirect().toRoute('login')
        } else {
            session.flash('status', { type: 'danger', message: 'Akun gagal ditambahkan, silahkan dicoba lagi' })
            return response.redirect('back')
        }
    }

    async logout({ response, auth }: any) {
        await auth.use('web').logout()
        return response.redirect().toRoute('login')
    }
}