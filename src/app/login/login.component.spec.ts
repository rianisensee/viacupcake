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

  it('should mask the password input by default', () => {
    const compiled = fixture.nativeElement;
    const passwordInput = compiled.querySelector('input[type="password"]');
    expect(passwordInput).toBeTruthy();
  });

  it('should briefly show the last character of the password', (done) => {
    component.password = '12345';
    const inputElement = fixture.nativeElement.querySelector('input[type="password"]');

    const event = new Event('input');
    inputElement.value = '12345';
    inputElement.dispatchEvent(event);

    component.onPasswordInput(event);
    fixture.detectChanges();

    expect(component.maskedPassword).toBe('****5');
    expect(fixture.nativeElement.querySelector('input').value).toBe('****5');

    setTimeout(() => {
      fixture.detectChanges();
      expect(component.maskedPassword).toBe('*****');
      expect(fixture.nativeElement.querySelector('input').value).toBe('*****');
      done();
    }, 500);
  });

  it('should have a "Forgot password" link', () => {
    const compiled = fixture.nativeElement;
    const forgotPasswordLink = compiled.querySelector('.forgot-password-link');
    expect(forgotPasswordLink).toBeTruthy();
    expect(forgotPasswordLink.textContent).toContain('Esqueci minha senha');
  });
});
