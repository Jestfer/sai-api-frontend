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
    // Cuando llega el OK, con el subscribe que tenemos...
    // Ejecutemos el refresh del servicio...
      // Mandamos el post primero, pero cogemos los cambios cuando llegan
      // El getTopics que volvemos a llamar en el servicio se encarga...
      // TOdos están suscritos y se manejan los cambios
      .subscribe(() => this.topic.refresh());
  }

  close() {
    this.dialogRef.close();
  }
}
