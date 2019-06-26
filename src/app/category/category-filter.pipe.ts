import { PipeTransform, Pipe } from '@angular/core';
import { pipe } from 'rxjs';
import { Category } from '../shared/category.model';
@Pipe({
    name: 'categoryFilter'
})

export class CategoryFilterPipe implements PipeTransform{
    transform(category: Category[], searchTerm: string):Category[] {
        if (!category || ! searchTerm){
            return category;
        }
        return category.filter( category => 
            category.CategoryName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }

}