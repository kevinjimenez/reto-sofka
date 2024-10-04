import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BellRingingComponent } from '../../../../src/app/shared/components/icons/bell-ringing/bell-ringing.component';

describe('BellRingingComponent', () => {
	let component: BellRingingComponent;
	let fixture: ComponentFixture<BellRingingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [BellRingingComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(BellRingingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
