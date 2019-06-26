import { PipeTransform, Pipe } from '@angular/core';
import { pipe } from 'rxjs';
import { Product } from '../shared/product.model';
@Pipe({
    name: 'productFilter'
})

export class ProductFilterPipe implements PipeTransform{
    transform(product: Product[], searchTerm: string):Product[] {
        if (!product || ! searchTerm){
            return product;
        }
        return product.filter( product => 
            product.ProductName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }

}