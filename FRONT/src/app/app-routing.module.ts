import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from 'src/app/container/container.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'kanban', component: ContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
