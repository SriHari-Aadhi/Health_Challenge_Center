import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntriesComponent } from './add-entries.component';

describe('AddEntriesComponent', () => {
  let component: AddEntriesComponent;
  let fixture: ComponentFixture<AddEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEntriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
