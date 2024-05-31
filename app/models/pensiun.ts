import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Pensiun extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare id_user: number

  @column()
  declare judul: string

  @column()
  declare terkumpul: number

  @column()
  declare pengeluaran_perbulan: number

  @column()
  declare nabung: number

  @column()
  declare usia_now: number

  @column()
  declare usia_target: number

  @column()
  declare target_return: number

  @column()
  declare inflasi: number

  @column()
  declare pengeluaran_pertahun: number

  @column()
  declare waktu_pensiun: number

  @column()
  declare kebutuhan_pensiun: number

  @column()
  declare total_target: number

  @column()
  declare hasil_tabungan: number

  @column()
  declare return_investasi: number

  @column()
  declare total_hasil: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}