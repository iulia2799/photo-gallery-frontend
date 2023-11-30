import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, of, takeUntil, tap } from 'rxjs';
import { LoginDto } from 'src/app/models/login-dto';
import { AuthService } from 'src/app/services/auth.service';
import { TOKEN } from 'src/app/utils/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  destroy$: Subject<void> = new Subject<void>();

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
    this.service.login(user).pipe(takeUntil(this.destroy$), catchError((err: any) => {
      return of(err);
    })).subscribe((response) => {
      if (response instanceof HttpErrorResponse) {
        console.log(response)
        this.snackBar.open('Seems like the credentials you sent are invalid. Try again.', 'OK', {
          duration: 5000
        });
      } else {
        localStorage.setItem(TOKEN, response);
        this.router.navigate(['../home'], { relativeTo: this.route.parent });
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.complete();
  }

} 
