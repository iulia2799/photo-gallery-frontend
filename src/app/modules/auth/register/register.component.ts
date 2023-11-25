import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Register } from 'src/app/models/register';
import { AuthService } from 'src/app/services/auth.service';
import { TOKEN } from 'src/app/utils/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(public route: ActivatedRoute, public router: Router, public service: AuthService, public fb: FormBuilder, private snackBar: MatSnackBar) {
    this.registerForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }
  ngOnInit(): void {

  }

  register() {
    const value = this.registerForm.value;
    const user: Register = { ...value}
    this.service.registerUser(user).pipe(catchError((err: any) => {
      return of(err);
    })).subscribe((response) => {
      if(response instanceof HttpErrorResponse) {
        console.log(response);
        this.snackBar.open('Oops! We could not register your account. Make sure you have a valid email and try again.','OK', {
          duration: 5000
        });
      } else {
        localStorage.setItem(TOKEN, response);
        this.router.navigate(['../home'], { relativeTo: this.route.parent});
      }
    })
  }

}
