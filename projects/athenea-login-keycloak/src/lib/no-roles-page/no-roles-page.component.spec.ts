import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRolesPageComponent } from './no-roles-page.component';

describe('NoRolesPageComponent', () => {
  let component: NoRolesPageComponent;
  let fixture: ComponentFixture<NoRolesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoRolesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoRolesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
