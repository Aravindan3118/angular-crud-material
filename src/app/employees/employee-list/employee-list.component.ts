import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import {MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig  } from '@angular/material'
import { EmployeeComponent } from '../employee/employee.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees$:any;
  constructor(private service:EmployeeService,private dialog: MatDialog,private notificationService:NotificationService,private dialogService: DialogService) { }
  listData:MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city','actions'];
  // dataSource = this.employees$;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource;
  ngOnInit() {
    this.service.getEmployee().subscribe(
      data =>{
        this.dataSource =data;
        this.listData = new MatTableDataSource(this.dataSource);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        // console.log(this.listData.sort);
        }
    )
   
  }
  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent,dialogConfig);
  }
  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent,dialogConfig);
  }

  onDelete(id){
    // if(confirm('Are you sure to delete this record ?')){
    // this.service.deleteEmployee(id).subscribe();
    // this.notificationService.warn('! Deleted successfully');
    // }
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.service.deleteEmployee(id).subscribe();
        this.notificationService.warn('! Deleted successfully');
      }
    });
  }


}
