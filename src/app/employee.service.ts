import { Injectable } from '@angular/core';
import { Employee } from './models/employee.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  listEmployess = new BehaviorSubject<Employee[]>([]);
  //([
  //  {
  //    id: 1,
  //    name: 'Supreeth',
  //    gender: 'Male',
  //    contactPreference: 'Email',
  //    email: 'mark@gmail.com',
  //    dateOfBirth: new Date('10/25/1995'),
  //    department: '3',
  //    isActive: true,
  //    photoPath: 'assets/images/emp1.png'
  //  },
  //  {
  //    id: 2,
  //    name: 'Thinh',
  //    gender: 'Male',
  //    contactPreference: 'Phone',
  //    phoneNumber: 2345978640,
  //    dateOfBirth: new Date('11/20/1990'),
  //    department: '2',
  //    isActive: false,
  //    photoPath: 'assets/images/emp2.png'
  //  },
  //  {
  //    id: 3,
  //    name: 'Mathias',
  //    gender: 'Male',
  //    contactPreference: 'Phone',
  //    phoneNumber: 5432978640,
  //    dateOfBirth: new Date('3/25/1990'),
  //    department: '3',
  //    isActive: true,
  //    photoPath: 'assets/images/emp3.png'
  //  },
  //]);



  cast = this.listEmployess.asObservable();

  constructor(private httpclient:HttpClient) {
    //this.listEmployess = this.httpclient.get<Employee[]>('http://localhost:3000/products');
    //this.listEmployess = this.httpclient.get<Employee[]>('http://localhost:3000/products');
    //this.httpclient.get<Employee[]>('http://localhost:3000/products').subscribe((data)=>this.listEmployess.next(data))
    this.httpclient.get<Employee[]>("assets/raw_data/emps.json").subscribe((data)=>{this.listEmployess.next(data)});
    console.log(this.listEmployess.value);
  }

  getEmployees():Observable<Employee[]>{
    return this.httpclient.get<Employee[]>("assets/raw_data/emps.json")
  }

  getEmployee(id: number): Employee {
    return this.listEmployess.value.find(e => e.id === id);
  }

  save(employee: Employee) {
    if (employee.id === null) {
      const maxid = this.listEmployess.value.reduce(function(e1,e2){
        return (e1.id > e2.id)? e1 : e2;
      }).id;
      employee.id=maxid + 1;
      this.listEmployess.value.push(employee);
    }
    else{
      const foundIndex= this.listEmployess.value.findIndex(e=>e.id===employee.id);
      this.listEmployess.value[foundIndex]=employee;
    }
  }
  deleteEmployee(id:number){
    const i=this.listEmployess.value.findIndex(e=>e.id===id)
    if( i!==-1)
    this.listEmployess.value.splice(i,1);
  }
}
