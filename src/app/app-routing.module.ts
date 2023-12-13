import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthModule } from "./modules/auth/auth.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { CreatepostComponent } from "./components/createpost/createpost.component";
import { ViewpostsComponent } from "./components/viewposts/viewposts.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'create',
        component: CreatepostComponent
    },
    {
        path: 'view/:id',
        component: ViewpostsComponent
    },
    {
        path: 'auth',
        loadChildren: () => AuthModule
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}