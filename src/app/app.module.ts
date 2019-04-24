import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbartopComponent } from './components/navbartop/navbartop.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbartopComponent,
    DashboardComponent,
    TaskDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    StorageServiceModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatDialogModule, 
    MatFormFieldModule
  ],
  entryComponents: [
    TaskDetailsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
