import { Meal, Prisma } from '@prisma/client'

export interface MealsRepository {
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  update(data: Meal): Promise<Meal>
  delete(mealId: string): Promise<void>
  findOneByUser(id: string, userId: string): Promise<Meal | null>
  findManyByUser(userId: string, page: number): Promise<Meal[]>
}
