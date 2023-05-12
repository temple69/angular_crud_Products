import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../../service/Auth/Auth';
import { AuthService } from 'src/app/service/Auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerFormValues = this.registerValue.group({
    email: ['', [Validators.required, Validators.email]],
    userName: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(20)]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],
  });
  submitted=false// register component Attributes

  constructor(
    private registerValue: FormBuilder,
    private registerService: AuthService
  ) {}
  LoadingState: boolean = false;
  //Method that checks if form is valid if valid sends data to the server through the Method createuser
  CreateAccount() {
    this.submitted= true
    if (this.registerFormValues.invalid) {
      return
    }
    const email: string = this.registerFormValues.value.email!;
    const password: string = this.registerFormValues.value.password!;
    const userName: string = this.registerFormValues.value.userName!;
    const newUser: Auth = {
      email,
      password,
      userName,
    };
    this.registerService.CreateUser(newUser, 'REGISTER');
    this.registerFormValues.reset();
  }
  //Gets input control for form Validation
  get f(): { [key: string]: AbstractControl } {
    return this.registerFormValues.controls;
  }
}
