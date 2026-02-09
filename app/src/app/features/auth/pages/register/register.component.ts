import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectionList } from '@angular/material/list';
import { MatListOption } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { PERMISSIONS, ROLE_DEFAULT_PERMISSIONS } from 'app/core/constants/permissions';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSelectionList,
    MatListOption,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class Register {
  message = '';

  form!: FormGroup;

  permissions = PERMISSIONS;

  @ViewChild(MatSelectionList) permissionList!: MatSelectionList;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      permissions: this.fb.control<string[]>([]),
    });
  }

  onRoleChange(role: string) {
    const defaults = ROLE_DEFAULT_PERMISSIONS[role] || [];
    this.form.patchValue({ permissions: defaults });

    // UPDATE UI SELECTION
    queueMicrotask(() => {
      this.permissionList.options.forEach((option) => {
        option.selected = defaults.includes(option.value);
      });
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
  }
}
