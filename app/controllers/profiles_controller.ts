// import type { HttpContext } from '@adonisjs/core/http'

import User from "#models/user"
import hash from "@adonisjs/core/services/hash"

export default class ProfilesController {
    async index({ view, auth }: any) {
        const user = auth.user
        return view.render('pages/profile', { user })
    }

    async post({ request, response, session }: any) {
        const post = request.all()
        const update = await User.query().where('username', post.username).update(post)
        if (update) {
            session.flash('status', { type: 'success', message: 'Profile berhasil diubah' })
            return response.redirect('back')
        } else {
            session.flash('status', { type: 'danger', message: 'Profile gagal diubah, silahkan dicoba lagi' })
            return response.redirect('back')
        }
    }

    async ubah_password({ request, response, auth, session }: any) {
        const post = await request.all()
        const user: any = await User.findBy('username', auth.user.username)
        const cek = await hash.verify(user.password, post.password)
        if (cek) {
            session.clear()
            await auth.use('web').logout()
            session.flash('status', { type: 'success', message: 'Berhasil Mengubah password' })
            return response.redirect().toRoute('beranda')
        } else {
            session.flash('status', { type: 'danger', message: 'Password gagal diubah. Silahkan coba kembali' })
            return response.redirect('back')
        }
    }
}