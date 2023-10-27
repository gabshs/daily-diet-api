import { Meal, Prisma } from '@prisma/client'
import { MealsRepository, UserMealsMetrics } from '../meals-repository'
import { singleton } from 'tsyringe'
import { prisma } from '@/lib/prisma'
import { findBestMealSequenceOnDiet } from '@/utils/find-best-meal-sequence-on-diet'

@singleton()
export class PrismaMealsRepository implements MealsRepository {
  async create(data: Prisma.MealUncheckedCreateInput): Promise<Meal> {
    const meal = await prisma.meal.create({ data })

    return meal
  }

  async update(data: Meal): Promise<Meal> {
    const meal = await prisma.meal.update({ where: { id: data.id }, data })

    return meal
  }

  async delete(data: Meal): Promise<Meal> {
    await prisma.meal.delete({ where: { id: data.id } })

    return data
  }

  async findOneByUser(id: string, userId: string): Promise<Meal | null> {
    const meal = await prisma.meal.findUnique({
      where: { id, user_id: userId },
    })

    return meal
  }

  async findManyByUser(userId: string, page: number): Promise<Meal[]> {
    const meals = await prisma.meal.findMany({
      where: { user_id: userId },
      take: 20,
      skip: (page - 1) * 20,
    })

    return meals
  }

  async getMetricsByUser(userId: string): Promise<UserMealsMetrics> {
    const meals = await prisma.meal.findMany({
      where: { user_id: userId },
    })

    return {
      totalOfMeals: meals.length,
      mealsOnDiet: meals.filter((meal) => meal.is_on_diet).length,
      mealsOutDiet: meals.filter((meal) => !meal.is_on_diet).length,
      bestSequenceOnDiet: findBestMealSequenceOnDiet(meals),
    }
  }
}
