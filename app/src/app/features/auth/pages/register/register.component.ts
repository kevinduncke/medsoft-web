import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class Register {
  message = '';

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  submit() {
    console.log('SUBMIT CLICKED');

    if (this.form.invalid) {
      console.log('FORM INVALID', this.form.value);
      return;
    }

    console.log('FORM VALID', this.form.value);
    console.log('CALLING REGISTER SERVICE', this.form.value);
    this.auth.register(this.form.value).subscribe({
      next: (res) => console.log('REGISTER SUCCESS', res),
      error: (err) => console.log('REGISTER ERROR', err),
    });

    // this.auth.register(this.form.value).subscribe({
    //   next: (res) => {
    //     this.message = 'User created successfully.';
    //     this.form.reset();
    //   },
    //   error: (err) => {
    //     this.message = err.error?.message || 'Error creating user.';
    //   },
    // });
  }
}
