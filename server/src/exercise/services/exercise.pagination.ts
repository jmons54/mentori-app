import { FilterOperator, PaginateConfig } from 'nestjs-paginate';
import { ExerciseEntity } from '../entities/exercise.entity';

export const exercisePagination: PaginateConfig<ExerciseEntity> = {
  sortableColumns: ['id', 'type', 'difficulty', 'category.name'],
  defaultSortBy: [['id', 'ASC']],
  select: ['id', 'type', 'difficulty', 'category.name', 'isActive'],
  filterableColumns: {
    'category.id': [FilterOperator.EQ],
  },
  relations: ['category'],
};
