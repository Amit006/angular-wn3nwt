import { Component, OnDestroy, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { DataTableDirective } from "angular-DataTables";

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
  ApiUrl = 'http://165.227.84.251:3006/users/alluser';


constructor(private http: Http){

}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.http.get(this.ApiUrl)
      .map(this.extractData)
      .subscribe(persons => {
        console.group(' From Api Data');
        this.persons = persons;
        console.groupEnd();
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });
  }

  ngOnDestroy () {
     // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }
}
