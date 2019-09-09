// Strongly typed http fetcher
// T is the returned type by the request
// Returned type is not guaranteed of course, but allows to keep track of the supposed returned types from side effects
import {Supplier} from '../models/Supplier';

export const http = <T>(request: RequestInfo): Promise<T> =>
    new Promise<T>((resolve, reject) => {
      fetch(request)
          .then(response => response.json())
          .then(body => resolve(body))
          .catch(reject);
    });


export const fetchSuppliers = () =>
    http<{[k: string]: Supplier}>('data/suppliers.json')
        .then(res => Object.values(res));

