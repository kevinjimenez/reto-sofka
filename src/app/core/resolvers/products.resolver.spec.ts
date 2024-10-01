import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { productsResolver } from './products.resolver';

describe('productsResolver', () => {
  let productsServiceSpy: jest.Mocked<ProductsService>;

  const executeResolver: ResolveFn<Observable<unknown>> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => productsResolver(...resolverParameters));

  beforeEach(() => {
    const productsServiceMock = {
      getAll: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [{ provide: ProductsService, useValue: productsServiceMock }]
    });

    // Inyectamos el servicio con la tipificación de jest.Mocked
    productsServiceSpy = TestBed.inject(ProductsService) as jest.Mocked<ProductsService>;
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('should return an Observable from the service', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' }
    ];
    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = {} as RouterStateSnapshot;

    // Hacemos que el spy devuelva un observable con productos simulados
    productsServiceSpy.getAll.mockReturnValue(of(mockProducts));

    const result = executeResolver(mockRoute, mockState);

    // Verificamos si es un Observable y luego nos suscribimos
    if (result instanceof Observable) {
      const resolvedData = await result.toPromise(); // Usamos toPromise para manejarlo con async/await
      expect(resolvedData).toEqual(mockProducts);
    } else {
      fail('Expected an Observable to be returned from the resolver');
    }

    expect(productsServiceSpy.getAll).toHaveBeenCalled();
  });
});
