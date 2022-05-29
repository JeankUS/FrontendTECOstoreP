import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {
  public contactForm!: FormGroup;
  variable: string = ''
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.initForm();
  }

  onSubmit(): void {

    if (this.contactForm.get('name')?.touched && this.contactForm.get('name')?.errors?.['minlength']) {
      console.log('Form ->', this.contactForm.value);
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.minLength(3)]],
      checkAdult: ['', [Validators.required]],
      department: [''],
      comment: ['', [Validators.required]],
    })
  }

  verificar() {
    const inputNombre = document.getElementById('name')
    let self = this
    if (inputNombre != null) {
      if (self.contactForm.get('name')?.touched && self.contactForm.get('name')?.errors?.['required']) {
        // if(self.contactForm.get('name')?.errors?.['required']){
        inputNombre.style.borderColor = 'red'
      }

      if ((self.contactForm.get('name')?.touched && self.contactForm.get('name')?.errors?.['minlength']) == false) {
        if (inputNombre != null) {
          inputNombre.style.borderColor = 'red'
        }
      }
      inputNombre.oninput = function () {
        if (inputNombre.textContent != null) {
          self.variable = self.contactForm.get('name')?.value
          if (self.contactForm.get('name')?.errors?.['minlength'] || self.contactForm.get('name')?.errors?.['required']) {
            inputNombre.style.borderColor = 'red'
          } else { inputNombre.style.borderColor = 'green' }
        }
      }

    }
  }
}

