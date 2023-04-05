import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path:'hospitals',
        loadChildren: ()=> import('../hospitals/hospitals.module').then(m=>m.HospitalsPageModule)
      },
      {
        path:'hospital/:id',
        loadChildren:()=> import('../hopital/hopital.module').then(m=> m.HopitalPageModule)
      },
      
      {
        path:'myDoctor',
        loadChildren:()=> import('../doctor/doctor.module').then(m=>m.DoctorPageModule)
      },
      {
        path:'transport',
        loadChildren:()=>import('../transport/transport.module').then(m=>m.TransportPageModule)
      }
 ,
      {
        path: '',
        redirectTo: '/tabs/tab2',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: '',
    redirectTo: '/tabs/tab2',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
