import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthModule } from "./modules/auth/auth.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
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