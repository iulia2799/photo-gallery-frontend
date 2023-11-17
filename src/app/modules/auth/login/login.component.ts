import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { LoginDto } from 'src/app/models/login-dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(public route: ActivatedRoute, public router: Router, public service: AuthService, public fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  login() {
    const formValue = this.loginForm?.value;
    const user: LoginDto = {
      email: formValue.email,
      password: formValue.password
    }
    //this.router.navigate(['../home'], { relativeTo: this.route.parent});
    this.service.login(user).pipe(catchError((err: any) => {
      return of(err);
    })).subscribe((response) => {
      if(response instanceof HttpErrorResponse) {
        console.log('invalid credentials');
      } else {
        localStorage.setItem('loginToken',response);
      }
    });
  }

} 
