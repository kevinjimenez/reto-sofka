import { TestBed } from '@angular/core/testing';
import { ImagePipe } from './image.pipe';

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
		expect(pipe.transform(undefined)).toBe('');
	});

	it('should return the URL if filename contains "http"', () => {
		const url = 'http://example.com/image.png';
		expect(pipe.transform(url)).toBe(url);
	});

	it('should return a path with the filename in the assets folder if folder is not provided', () => {
		const filename = 'image.png';
		expect(pipe.transform(filename)).toBe(`assets/${filename}`);
	});

	it('should return a path with the filename in the specified folder', () => {
		const filename = 'image.png';
		const folder = 'images';
		expect(pipe.transform(filename, folder)).toBe(`assets/${folder}/${filename}`);
	});
});
