import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent as NOTFOUNDComponent } from './notfound/notfound.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UsersComponent } from './users/users.component';
import { ViewUserComponent } from './users/view-user/view-user.component';

const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'list',
    component: UsersComponent
  },
  {
    path:'list/:id',
    component: EditUserComponent
  },
  {
    path:'view/:id',
    component: ViewUserComponent
  },
  {
    path:'addUser',
    component: AddUserComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: NOTFOUNDComponent
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

