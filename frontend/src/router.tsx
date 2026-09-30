import { createRouter } from '@tanstack/react-router'
import { rootRoute } from './routes/__root'
import { loginRoute } from './routes/login'
import { layoutRoute } from './routes/_layout'
import { dashboardRoute } from './routes/index'
import { mahasiswaRoute } from './routes/_layout/mahasiswa'
import { dosenRoute } from './routes/_layout/dosen'
import { mataKuliahRoute } from './routes/_layout/mata-kuliah'
import { jurusanRoute } from './routes/_layout/jurusan'
import { pengumumanRoute } from './routes/_layout/pengumuman'
import { penggunaRoute } from './routes/_layout/pengguna'

const routeTree = rootRoute.addChildren([
  loginRoute,
  layoutRoute.addChildren([
    dashboardRoute,
    mahasiswaRoute,
    dosenRoute,
    mataKuliahRoute,
    jurusanRoute,
    pengumumanRoute,
    penggunaRoute,
  ]),
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
