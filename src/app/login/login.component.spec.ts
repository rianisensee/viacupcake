import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, LoginComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
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

  it('should have a "Forgot password" link', () => {
    const compiled = fixture.nativeElement;
    const forgotPasswordLink = compiled.querySelector('.forgot-password-link');
    expect(forgotPasswordLink).toBeTruthy();
    expect(forgotPasswordLink.textContent).toContain('Esqueci minha senha');
  });
});