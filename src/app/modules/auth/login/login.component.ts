import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.router.navigate(['../home'], { relativeTo: this.route.parent});
    // this.service.login(user).subscribe(response => {
    //   if(response) {
    //     localStorage.setItem('authToken',response.toString());
    //   } else {
    //     console.log('uhoh')
    //   }
    // });
  }

}
