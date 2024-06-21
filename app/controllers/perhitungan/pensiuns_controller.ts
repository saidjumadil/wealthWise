// import type { HttpContext } from '@adonisjs/core/http'

import Pensiun from "#models/pensiun"

export default class PensiunsController {
    async index({ view, auth }: any) {
        const pensiuns = await Pensiun.query().where('id_user', auth.user.id).orderBy('createdAt', 'desc')
        return view.render('pages/perhitungan/pensiun/index', { pensiuns })
    }

    async add({ view }: { view: any }) {
        return view.render('pages/perhitungan/pensiun/add')
    }

    async post_add({ request, response, session, auth }: any) {
        let post = request.all()
        post.terkumpul = post.terkumpul.replaceAll('.', '')
        post.pengeluaran_perbulan = post.pengeluaran_perbulan.replaceAll('.', '')
        post.nabung = post.nabung.replaceAll('.', '')
        console.log(post)

        post['id_user'] = auth.user.id
        post = await this.perhitungan(post)

        const create = await Pensiun.create(post)

        if (create) {
            session.flash('status', { type: 'success', message: 'Perencanaan telah ditambahkan', id: post.id })
            return response.redirect().toRoute('perhitungan.pensiun.index')
        } else {
            session.flash('status', { type: 'danger', message: 'Terjadi kesalahan. Silahkan dicoba lagi' })
            return response.redirect().toRoute('perhitungan.pensiun.index')
        }
    }

    async edit({ view, params }: any) {
        const pensiun = await Pensiun.findBy('id', params.id)
        return view.render('pages/perhitungan/pensiun/edit', { pensiun })
    }

    async post_edit({ request, response, session, auth }: any) {
        let post = request.all()

        post['id_user'] = auth.user.id
        post = await this.perhitungan(post)

        const update = await Pensiun.query().update(post).where('id', post.id)

        if (update) {
            session.flash('status', { type: 'success', message: 'Perencanaan telah diubah', id: post.id })
            return response.redirect().toRoute('perhitungan.pensiun.index')
        } else {
            session.flash('status', { type: 'danger', message: 'Terjadi kesalahan. Silahkan dicoba lagi' })
            return response.redirect().toRoute('perhitungan.pensiun.index')
        }
    }

    async perhitungan(post: any) {
        //pengeluaran_pertahun
        post['pengeluaran_pertahun'] = parseInt(post.pengeluaran_perbulan) * 12

        //waktu_pensiun
        post['waktu_pensiun'] = parseInt(post.usia_target) - parseInt(post.usia_now)

        //kebutuhan_pensiun
        post['kebutuhan_pensiun'] = parseInt(post.pengeluaran_pertahun) * Math.pow((1 + (parseInt(post.inflasi) / 100)), parseInt(post.waktu_pensiun))

        //total_target
        post['total_target'] = parseInt(post.kebutuhan_pensiun) / 0.04

        //total_tabungan
        post['hasil_tabungan'] = parseInt(post.terkumpul) + (parseInt(post.nabung) * parseInt(post.waktu_pensiun) * 12)

        //total_hasil
        const persen_perbulan = post.target_return / 1200 // bagi 12 dan 100
        const berapa_bulan_invest = post.waktu_pensiun * 12
        let modal_awal = parseInt(post.terkumpul)
        for (let index = 0; index < berapa_bulan_invest; index++) {
            modal_awal = (modal_awal + parseInt(post.nabung)) * (persen_perbulan + 1)
        }
        post['total_hasil'] = Math.round(modal_awal)

        //return_investasi
        post['return_investasi'] = parseInt(post.total_hasil) - parseInt(post.hasil_tabungan)

        return post
    }

    async post_delete({ session, params, response }: any) {
        const del = await Pensiun.query().where('id', params.id).delete()

        if (del) {
            session.flash('status', { type: 'success', message: 'Perencanaan telah dihapus' })
            return response.redirect().back()
        } else {
            session.flash('status', { type: 'danger', message: 'Terjadi kesalahan. Silahkan dicoba lagi' })
            return response.redirect().back()
        }
    }
}