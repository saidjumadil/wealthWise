import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pensiuns'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_user').unsigned().references('id').inTable('users')
      table.string('judul')
      table.integer('terkumpul').defaultTo(0)
      table.integer('pengeluaran_perbulan').defaultTo(0)
      table.integer('nabung').defaultTo(0)
      table.integer('usia_now').defaultTo(0)
      table.integer('usia_target').defaultTo(0)
      table.float('target_return').defaultTo(0)
      table.float('inflasi').defaultTo(0)
      table.integer('pengeluaran_pertahun').defaultTo(0)
      table.integer('waktu_pensiun').defaultTo(0)
      table.integer('kebutuhan_pensiun').defaultTo(0)
      table.integer('total_target').defaultTo(0)
      table.integer('hasil_tabungan').defaultTo(0)
      table.integer('return_investasi').defaultTo(0)
      table.integer('total_hasil').defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}