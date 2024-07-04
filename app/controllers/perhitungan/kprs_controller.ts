// import type { HttpContext } from '@adonisjs/core/http'

export default class KprsController {
    async index({ view }: any) {
        return view.render('pages/perhitungan/kpr/index')
    }
}