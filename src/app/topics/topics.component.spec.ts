import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsComponent } from './topics.component';
import { of } from 'rxjs/internal/observable/of';
import { TopicsService } from '../../services/topics.service';
import { TopicDialogComponent } from '../topic-dialog/topic-dialog.component';

const topicsServiceStub = {
  get() {
    const topics = [{ name: 'Chess', description: 'Chessable' }];
    return of(topics);
  }
};

fdescribe('TopicsComponent', () => {
  let component: TopicsComponent;
  let fixture: ComponentFixture<TopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicsComponent, TopicDialogComponent ],
      providers: [
        { provide: TopicsService, useValue: topicsServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the topic from the topicsService', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.topic').length).toEqual(1);
  });
});
