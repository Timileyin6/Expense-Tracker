import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public login: FormGroup;
  public incorrectLogin: boolean = false
  constructor(private formBuider: FormBuilder, private route: Router, private auth: AuthService){
    this.login = this.formBuider.group({
      email: ['', Validators.email],
      password: ['']
    })
  }

  public loginUser() : void{
     const data: User = this.login.value
   if(this.auth.loginUser(data.email, data.password)){
    this.route.navigate(['/tracker'])
   }else{
    this.incorrectLogin=true
   }
  }
}
