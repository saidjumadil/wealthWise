// import type { HttpContext } from '@adonisjs/core/http'

export default class DaruratsController {
    async index({ view }: any) {
        return view.render('pages/perhitungan/darurat/index')
    }
}