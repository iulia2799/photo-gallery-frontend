import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { LoginDto } from 'src/app/models/login-dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(public route: ActivatedRoute, public router: Router, public service: AuthService, public fb: FormBuilder, private snackBar: MatSnackBar) {

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
    this.service.login(user).pipe(catchError((err: any) => {
      return of(err);
    })).subscribe((response) => {
      if (response instanceof HttpErrorResponse) {
        console.log(response)
        this.snackBar.open('Seems like the credentials you sent are invalid. Try again.','OK',{
          duration: 5000
        });
      } else {
        localStorage.setItem('loginToken', response);
        this.router.navigate(['../home'], { relativeTo: this.route.parent});
      }
    });
  }

} 
