import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerFormValues= this.registerValue.group({
    fullname:'',
    UserName:'',
    password:''
  })

  constructor(private registerValue:FormBuilder){}
  CreateAccount(){
    console.log(this.registerFormValues.value)

  }

}
