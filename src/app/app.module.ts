import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { DataTablesModule, DataTableDirective} from "angular-datatables";
import { HttpModule } from '@angular/http';
import { UsersService } from './users.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, DataTablesModule, HttpModule ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ],
  providers: [UsersService]
})
export class AppModule { }
