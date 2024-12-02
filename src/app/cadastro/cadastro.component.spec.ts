import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroComponent } from './cadastro.component';
import { FormsModule } from '@angular/forms';

describe('CadastroComponent', () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CadastroComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a password input field', () => {
    const compiled = fixture.nativeElement;
    const passwordInput = compiled.querySelector('input[type="password"]');
    expect(passwordInput).toBeTruthy();
  });

  it('should have a confirm password input field', () => {
    const compiled = fixture.nativeElement;
    const confirmPasswordInput = compiled.querySelector('input[type="password"][name="confirmPassword"]');
    expect(confirmPasswordInput).toBeTruthy();
  });
});