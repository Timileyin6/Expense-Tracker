import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  public signUp: FormGroup;
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private route: Router){
    this.signUp = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      password: [''] 
    })
  }

  public submitData() : void{
    const user: User = this.signUp.value
    this.auth.signUpUser(user.firstname, user.lastname, user.email, user.password)
    this.route.navigate(['/tracker'])
  }
}
