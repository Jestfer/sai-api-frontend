import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { TopicsService } from '../services/topics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Courses by Topic';

  constructor(private dialog: MatDialog, private topicsService: TopicsService) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true; // Dialog not closed when clicking outside
    dialogConfig.autoFocus = true; // Autofocus on first form field of Dialog
    dialogConfig.width = '50%';

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log('Dialog output:', data)
    );
  }
}
