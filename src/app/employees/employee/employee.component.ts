import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  private empLi: EmployeeListComponent
  constructor(
    private service: EmployeeService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<EmployeeComponent>,
    
    ) { }
  departments = [
    { id: 3, value: 'Dep 1' },
    { id: 2, value: 'Dep 2' },
    { id: 3, value: 'Dep 3' }];

  ngOnInit() {
    // this.service.getEmployee();
  }


  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
  onSubmit(){
    // console.log(this.service.form.value);
   if(this.service.form.valid){
    
    if (!this.service.form.get('id').value){
    console.log('insert');
    this.service.postEmployee(this.service.form.value).subscribe(
      response => console.log('success',response)
      
    )
    }
  else{
    
    this.service.updateEmployee(this.service.form.value).subscribe(
      response => console.log('success',response)
      
    )
    
  }
    this.notificationService.success('Submitted successfully');
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.onClose();
   }
  }
  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
    // this.empLi.ngOnInit();
  }
}
