import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloadMyProductsComponent } from './reload-my-products.component';

describe('ReloadMyProductsComponent', () => {
  let component: ReloadMyProductsComponent;
  let fixture: ComponentFixture<ReloadMyProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReloadMyProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReloadMyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
