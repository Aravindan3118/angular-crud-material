import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    id:new FormControl(null),
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false)
  });

  initializeFormGroup() {
    this.form.setValue({
      id:null,
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: 0,
      hireDate: '',
      isPermanent: false
    });
  }

  postEmployee(employeeData){
    return this.http.post('http://localhost:3000/employee',employeeData);
  }
  getEmployee(){
    return this.http.get('http://localhost:3000/employee');
  }
  updateEmployee(updateEmployeeData){
    return this.http.put('http://localhost:3000/employee/'+updateEmployeeData['id'], updateEmployeeData)
  }
  deleteEmployee(id){
    return this.http.delete('http://localhost:3000/employee/'+id)
  }
  populateForm(employee) {
    // this.form.setValue(_.omit(employee,'id'));
    this.form.setValue(employee);
  }
}