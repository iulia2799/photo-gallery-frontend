import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(public route: ActivatedRoute, public router: Router, public service: AuthService, public fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }
  ngOnInit(): void {

  }

  register() {

  }

}
