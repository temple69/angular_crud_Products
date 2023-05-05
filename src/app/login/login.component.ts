import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginFormValues= this.loginValue.group({
    UserName:'',
    password:''
  })

  constructor(private loginValue:FormBuilder){}
  Login(){
    console.log(this.loginFormValues.value)

  }

}
