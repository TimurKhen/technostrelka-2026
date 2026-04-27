import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/api/user/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private userService = inject(UserService)

  constructor(private router: Router) {}

  registrationForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  })  
  
  onLogin(event: Event) {
    event.preventDefault()

    if (this.registrationForm.valid) {
      const formValues = this.registrationForm.getRawValue()

      this.userService.login(
        String(formValues.email),
        String(formValues.password)
      ).subscribe((data) => {
        console.log(data)
        this.router.navigate(['/'])
      })
    }
  }
}
