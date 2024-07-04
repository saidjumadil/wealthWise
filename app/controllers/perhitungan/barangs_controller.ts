// import type { HttpContext } from '@adonisjs/core/http'

export default class BarangsController {
    async index({ view }: any) {
        return view.render('pages/perhitungan/barang/index')
    }
}