import { Routes } from '@angular/router';
import { ConfigurarComponent } from 'src/app/pages/configurar/configurar.component';
import { BuscadorComponent } from 'src/app/pages/generico/buscador/buscador.component';
import { PerfilComponent } from 'src/app/pages/generico/perfil/perfil.component';
import { EmpresaComponent } from 'src/app/pages/principal/empresa/empresa.component';
import { OperacionesComponent } from 'src/app/pages/principal/operaciones/operaciones.component';
import { ReportesComponent } from 'src/app/pages/reportes/reportes.component';
import { AuthGuardGuard } from 'src/app/services/seguridad/auth-guard.guard';
import { PrincipalComponent } from '../../pages/principal/principal.component';
import { SectorproductivoComponent } from 'src/app/pages/principal/sectorproductivo/sectorproductivo.component';
import { OficinacomercialComponent } from 'src/app/pages/principal/oficinacomercial/oficinacomercial.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { SistemasComponent } from 'src/app/pages/principal/sistemas/sistemas.component';
import { ModulosComponent } from 'src/app/pages/principal/modulos/modulos.component';
import { ProductosComponent } from 'src/app/pages/principal/productos/productos.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: 'principal',
        component: PrincipalComponent,
        canActivate: [AuthGuardGuard]
    }, {
        path: 'buscador',
        component: BuscadorComponent,
        canActivate: [AuthGuardGuard]
    }, {
        path: 'perfil',
        component: PerfilComponent,
        canActivate: [AuthGuardGuard]
    }, {
        path: 'configurar',
        component: ConfigurarComponent,
        canActivate: [AuthGuardGuard]
    }, {
        path: 'reportes',
        component: ReportesComponent,
        canActivate: [AuthGuardGuard]
    },{
        path: 'operaciones',
        component: OperacionesComponent,
        canActivate: [AuthGuardGuard]
    },{
        path: 'empresa',
        component: EmpresaComponent,
        canActivate: [AuthGuardGuard]
    },{
        path: 'sector',
        component: SectorproductivoComponent,
        canActivate: [AuthGuardGuard]
    },{
        path: 'oficina',
        component: OficinacomercialComponent,
        canActivate: [AuthGuardGuard]
    },{
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardGuard]
    },{
        path: 'sistemas',
        component: SistemasComponent,
        canActivate: [AuthGuardGuard]
    },{
        path: 'modulos',
        component: ModulosComponent,
        canActivate: [AuthGuardGuard]
    },{
        path: 'productos',
        component: ProductosComponent,
        canActivate: [AuthGuardGuard]
    },



];
