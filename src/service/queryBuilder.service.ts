import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class QueryBuilderService {
  async buildQuery<T>(
    repository: Repository<T>,
    alias: string,
    conditions: Record<string, any>,
    relations: string[],
    selectColumns: Record<string, any>,
  ): Promise<T[]> {
    let queryBuilder: SelectQueryBuilder<T> =
      repository.createQueryBuilder(alias);

    if (relations && relations.length > 0) {
      relations.forEach((relation) => {
        queryBuilder = queryBuilder.leftJoinAndSelect(
          `${alias}.${relation}`,
          relation,
        );
      });
    }

    if (conditions) {
      for (const key in conditions) {
        if (conditions.hasOwnProperty(key)) {
          const value = conditions[key];
          queryBuilder = queryBuilder.andWhere(`${key} = :${key}`, {
            [key]: value,
          });
        }
      }
    }

    if (selectColumns) {
      for (const relation in selectColumns) {
        if (selectColumns.hasOwnProperty(relation)) {
          const columns = selectColumns[relation];
          for (const column in columns) {
            if (columns.hasOwnProperty(column) && columns[column]) {
              queryBuilder = queryBuilder.addSelect(`${relation}.${column}`);
            }
          }
        }
      }
    }

    const result = await queryBuilder.getMany();

    if (result.length === 0) {
      throw new NotFoundException('No records found');
    }

    return result;
  }
}
