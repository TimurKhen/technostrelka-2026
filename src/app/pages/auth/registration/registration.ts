import { Component, inject, ViewChild } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { ImageEditor } from '../../../components/image-editor/image-editor'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UserService, RegistrationData } from '../../../services/api/user/user'

@Component({
  selector: 'app-registration',
  imports: [RouterLink, ImageEditor],
  templateUrl: './registration.html',
  styleUrl: './registration.scss',
})
export class Registration {
  private userService = inject(UserService)

  @ViewChild('avatarCropper') avatarCropper!: ImageEditor

  constructor(private router: Router) {}

  registrationForm = new FormGroup({
    email: new FormControl<string>('', [Validators.email, Validators.required]),
    username: new FormControl<string>('', [Validators.required]),
    firstName: new FormControl<string>('', [Validators.required]),
    surname: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
    avatar: new FormControl<File | null>(null)
  })

  avatarImage: File | null = null
  isCropperOpen = false

  openAvatarUpload() {
    this.isCropperOpen = true
  }

  onImageCropped(imageUrl: File) {
    this.avatarImage = imageUrl
    this.isCropperOpen = false
  }

  onCropperClose() {
    this.isCropperOpen = false
  }

  onRegistration(event: Event) {
    event.preventDefault()

    if (this.registrationForm.valid) {
      const formValues = this.registrationForm.getRawValue()

      const userData: RegistrationData = {
        ...formValues as RegistrationData,
        avatar: this.avatarImage
      }

      this.userService.register(userData).subscribe((data) => {
        console.log(data)
        this.router.navigate(['/'])
      })
    }
  }
}
