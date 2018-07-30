import { Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CourseDialogComponent } from '.././course-dialog/course-dialog.component';
import { TopicsService } from '../../services/topics.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnDestroy {
  title: String = 'Courses by Topic';
  topics: any = [];
  private obs$: Subscription = null;
  imgUrl: String = 'https://source.unsplash.com/800x600/?';

  constructor(private dialog: MatDialog, private topicsService: TopicsService) {
    this.obs$ = topicsService.getTopics()
      .subscribe((topicsData: Response) => {
        this.topics = topicsData;
      });
  }

  ngOnDestroy(): void {
    this.obs$.unsubscribe();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';

    this.dialog.open(CourseDialogComponent, dialogConfig);
  }
}
