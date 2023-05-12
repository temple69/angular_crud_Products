import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { Auth } from '../../service/Auth/Auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginFormValues: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  ngOnInit(): void {
    this.loginFormValues = this.loginValue.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
    });
  }
  constructor(
    private loginValue: FormBuilder,
    private loginService: AuthService
  ) {}
  //Checks if form is valid if true sends data to the server throught the create user method depending on parameter.
  Login() {
    this.submitted = true;

    if (this.loginFormValues.invalid) {
      return;
    }
    const email: string = this.loginFormValues.value.email!;
    const password: string = this.loginFormValues.value.password!;
    const loginData: Auth = {
      email,
      password,
    };
    this.loginService.CreateUser(loginData, 'LOGIN');
  }
  //Form Validation Controls
  get f(): { [key: string]: AbstractControl } {
    return this.loginFormValues.controls;
  }
}
