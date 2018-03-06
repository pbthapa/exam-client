import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionSetComponent } from './edit-question-set.component';

describe('EditQuestionSetComponent', () => {
  let component: EditQuestionSetComponent;
  let fixture: ComponentFixture<EditQuestionSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuestionSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuestionSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
