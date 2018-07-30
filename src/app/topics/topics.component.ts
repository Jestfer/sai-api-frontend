import { Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { TopicsService } from '../../services/topics.service';
import { Subscription } from 'rxjs';
import { TopicDialogComponent } from '../topic-dialog/topic-dialog.component';

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
    // Nos lo cargamos porque está suscrito a un BehaviorSubject, que siempre está
    // activo...

    // NORMA: Observables normalmente no los destruimos
    //        pero sí los Subjects... xk son multicasting y se quedan abiertos
    this.obs$ = topicsService.getTopics()
      .subscribe((topicsData: Response) => {
        this.topics = topicsData;
      });
  }

  ngOnDestroy(): void {
    this.obs$.unsubscribe();
  }

  openCourseDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';

    this.dialog.open(CourseDialogComponent, dialogConfig);
  }

  openTopicDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';

    this.dialog.open(TopicDialogComponent, dialogConfig);
  }
}
