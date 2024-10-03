import { TestBed } from '@angular/core/testing';
import { ImagePipe } from '../../../src/app/shared/pipes';

describe('ImagePipe', () => {
	let pipe: ImagePipe;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ImagePipe]
		});
		pipe = TestBed.inject(ImagePipe);
	});

	it('should create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('should return an empty string if filename is not provided', () => {
		expect(pipe.transform()).toBe('');
	});

	it('should return filename when containing http', () => {
		const filename = 'http://example.com/image.png';
		expect(pipe.transform(filename)).toBe(filename);
	});

	it('should return assets folder when not containing http and folder', () => {
		const filename = 'image.png';
		expect(pipe.transform(filename)).toBe(`assets/${filename}`);
	});

	it('should return folder when not containing http and existing folder', () => {
		const filename = 'image.png';
		const folder = 'images';
		const path = `assets/${folder}/${filename}`;
		expect(pipe.transform(filename, folder)).toBe(path);
	});
});
