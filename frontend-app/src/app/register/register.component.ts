import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  registerForm = new FormGroup({
    'name' : new FormControl('', [Validators.required]),
    'email' : new FormControl('', [Validators.required, Validators.email]),
    'password' : new FormControl('', [Validators.required])
  })

  onSubmit(){
    const username = this.registerForm.value.name ? this.registerForm.value.name : '';
    const email = this.registerForm.value.email ? this.registerForm.value.email : '';
    const password =this.registerForm.value.password ? this.registerForm.value.password : '';
    this.authService.register(username, email, password).subscribe(
      (data)  => {
        console.log("registered new user")
      }
    )
  }
}
