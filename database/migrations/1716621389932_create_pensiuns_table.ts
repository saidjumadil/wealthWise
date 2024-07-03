import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pensiuns'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_user').unsigned().references('id').inTable('users')
      table.string('judul')
      table.bigInteger('terkumpul').defaultTo(0)
      table.bigInteger('pengeluaran_perbulan').defaultTo(0)
      table.bigInteger('nabung').defaultTo(0)
      table.integer('usia_now').defaultTo(0)
      table.integer('usia_target').defaultTo(0)
      table.float('target_return').defaultTo(0)
      table.float('inflasi').defaultTo(0)
      table.bigInteger('pengeluaran_pertahun').defaultTo(0)
      table.integer('waktu_pensiun').defaultTo(0)
      table.bigInteger('kebutuhan_pensiun').defaultTo(0)
      table.bigInteger('total_target').defaultTo(0)
      table.bigInteger('hasil_tabungan').defaultTo(0)
      table.bigInteger('return_investasi').defaultTo(0)
      table.bigInteger('total_hasil').defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}