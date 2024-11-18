import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipieEditorComponent } from './recipie-editor.component';

describe('RecipieEditorComponent', () => {
  let component: RecipieEditorComponent;
  let fixture: ComponentFixture<RecipieEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipieEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipieEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
