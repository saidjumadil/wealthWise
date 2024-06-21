// import type { HttpContext } from '@adonisjs/core/http'

export default class BerandasController {
    async index({ view, auth }: any) {
        return view.render('pages/beranda')
    }

    async landing({ view, auth, session }: any) {
        return view.render('pages/home')
    }
}