import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroComponent } from './cadastro.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

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

  it('should mask the password except for the last character while typing', () => {
    const input = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;
    
    input.value = 'test123';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    expect(component.maskedPassword).toBe('******3');
    expect(input.value).toBe('******3');
  });

  it('should fully mask the password after 750ms', (done) => {
    const input = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;
    
    input.value = 'test123';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    setTimeout(() => {
      fixture.detectChanges();
      expect(component.maskedPassword).toBe('*******');
      expect(input.value).toBe('*******');
      done();
    }, 750);
  });
});
