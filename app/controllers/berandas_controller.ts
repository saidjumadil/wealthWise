// import type { HttpContext } from '@adonisjs/core/http'

export default class BerandasController {
    async index({ view, auth }: any) {
        console.log(auth.user)
        return view.render('pages/beranda')
    }
}