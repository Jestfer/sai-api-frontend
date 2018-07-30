import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { TopicsService } from '../../services/topics.service';

@Component({
  selector: 'app-topic-dialog',
  templateUrl: './topic-dialog.component.html',
  styleUrls: ['./topic-dialog.component.css']
})

export class TopicDialogComponent implements OnInit {
  form: FormGroup;
  topics: any = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TopicDialogComponent>,
    private topic: TopicsService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl(),
      description: new FormControl()
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
    this.topic.addTopic(this.form.value)
      .subscribe(newTopic => this.topics.push(newTopic));
  }

  close() {
    this.dialogRef.close();
  }
}
