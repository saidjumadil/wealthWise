import env from '#start/env';
import edge from 'edge.js';

const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

edge.global('env', {
  app_name: env.get('app_name')
})

edge.global('appUrl', (path: any) => {
  const APP_URL = env.get('APP_URL')
  return path ? `${APP_URL}/${path}` : APP_URL
})

edge.global('tanggal', (tanggal: Date) => {
  return `${tanggal.getDate()} ${bulan[tanggal.getMonth()]} ${tanggal.getFullYear()}`
})

edge.global('pemisahTitik', function (b: any) {
  if (b == null) {
    return 0
  }
  var _minus = false;
  if (b < 0) _minus = true;
  b = b.toString();
  b = b.replace(".", "");
  b = b.replace("-", "");
  let c = "";
  let panjang = b.length;
  let j = 0;
  for (let i = panjang; i > 0; i--) {
    j = j + 1;
    if (((j % 3) == 1) && (j != 1)) {
      c = b.substr(i - 1, 1) + "." + c;
    } else {
      c = b.substr(i - 1, 1) + c;
    }
  }
  if (_minus) c = "-" + c;
  return c;
})