import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseUpdateDialogComponent } from './course-update-dialog.component';

xdescribe('CourseUpdateDialogComponent', () => {
  let component: CourseUpdateDialogComponent;
  let fixture: ComponentFixture<CourseUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
