import { Component, OnDestroy, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { DataTableDirective } from "angular-DataTables";
import { HttpHeaders } from '@angular/common/http';
import { UsersService } from './users.service';
// import { range } from 'rxjs';
// import { map, filter } from 'rxjs/operators';

import 'rxjs/add/operator/map';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnDestroy, OnInit {
  name = 'Angular';
  dtOptions: DataTables.Settings = {};
  persons = [];

    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();
 allmessage = {}

constructor( private UsersService: UsersService,){

}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.UsersService.getAll()
    // .pipe(first())
      .subscribe(
        data => {
          console.log(' All data', data);
          this.persons = data;
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
          this.allmessage = {
            type: 'success',
            error: 'error',
            text: ' Successfully get All-Library Records'
          };
        
        },
        error => {
          console.log(' Unable to getData from Service ', error)
          this.allmessage = {
            type: 'danger',
            error: 'error',
            text: 'Unable to get All-Library Records'
          };
        });
   
  }

  ngOnDestroy () {
     // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: Response) {
    console.log(' res: ', res);
    const body = res.json();
    return body.data || {};
  }
}
