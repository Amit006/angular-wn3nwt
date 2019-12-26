import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { DataTablesModule, DataTableDirective} from "angular-datatables";
import { HttpClientModule } from '@angular/common/http'; 


import { HttpModule } from '@angular/http';
import { UsersService } from './users.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, DataTablesModule, HttpModule, HttpClientModule ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ],
  providers: [UsersService]
})
export class AppModule { }
