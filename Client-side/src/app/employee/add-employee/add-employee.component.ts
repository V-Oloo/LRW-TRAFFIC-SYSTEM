import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Registration } from 'src/app/models/registration.model';
import { EmployeeService } from '../employee.service';
import { error } from 'protractor';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styles: []
})
export class AddEmployeeComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private empService: EmployeeService,
    private message: NzMessageService,
    private router: Router
    ) {}

  RegistrationForm: FormGroup;
  loading = false;

    submitForm(registrationInfo: Registration): void {

      if (this.RegistrationForm.invalid) {
        this.displayValidationErrors();
        return;
     }
       this.loading = true;
       this.empService.addEmployee(registrationInfo).subscribe(res =>
        {
          this.loading = false;
          this.message.create('success', `Employee added successfully`);
          this.router.navigate(['/employee/list']);
        }, error => {
          this.loading = false;
          this.message.create('error', `operation Unsucceeful, try again`);
          console.log(error)

        });
    }


    ngOnInit(): void {
        this.RegistrationForm = this.fb.group({
            firstname: [null, [Validators.required]],
            lastname: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            phone: [null, [Validators.required]],
            phonePrefix: ['+1' , [Validators.required]],
            jobTitle: [null, [Validators.required]],
            department: [null, [Validators.required]],
            address: [null, [Validators.required]],
        });
    }

    displayValidationErrors() {
      for (const i in this.RegistrationForm.controls) {
        this.RegistrationForm.controls[ i ].markAsDirty();
        this.RegistrationForm.controls[ i ].updateValueAndValidity();
      }

}

}
