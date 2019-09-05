import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees:Employee[];


  constructor(private _employeeService: EmployeeService, private _router: Router) { }

  ngOnInit() {
    this._employeeService.cast.subscribe(emplist=>this.employees=emplist);
    console.log(this.employees);
    //this._employeeService.getEmployees().subscribe((emplist)=>{this.employees=emplist});
  }

  onClick(employeeId: number){
    this._router.navigate(['/employees', employeeId]);
  }

}
