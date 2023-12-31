import { Meal, Prisma } from '@prisma/client'
import { MealsRepository, UserMealsMetrics } from '../meals-repository'
import { randomUUID } from 'crypto'
import { findBestMealSequenceOnDiet } from '@/utils/find-best-meal-sequence-on-diet'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  async create(data: Prisma.MealUncheckedCreateInput): Promise<Meal> {
    const meal: Meal = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      is_on_diet: data.is_on_diet,
      user_id: data.user_id,
      eaten_at: new Date(data.eaten_at),
      created_at: new Date(),
    }

    this.items.push(meal)

    return meal
  }

  async update(meal: Meal): Promise<Meal> {
    const mealIndex = this.items.findIndex((item) => item.id === meal.id)
    if (mealIndex >= 0) {
      this.items[mealIndex] = meal
    }
    return meal
  }

  async delete(meal: Meal): Promise<Meal> {
    this.items = this.items.filter((item) => item.id !== meal.id)

    return meal
  }

  async findOneByUser(id: string, userId: string): Promise<Meal | null> {
    const meal = this.items.find(
      (item) => item.id === id && userId === item.user_id,
    )

    if (!meal) return null

    return meal
  }

  async findManyByUser(userId: string, page: number): Promise<Meal[]> {
    const meals = this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)

    return meals
  }

  async getMetricsByUser(userId: string): Promise<UserMealsMetrics> {
    const meals = this.items.filter((item) => item.user_id === userId)
    const metrics: UserMealsMetrics = {
      totalOfMeals: meals.length,
      mealsOnDiet: meals.filter((meal) => meal.is_on_diet === true).length,
      mealsOutDiet: meals.filter((meal) => meal.is_on_diet !== true).length,
      bestSequenceOnDiet: findBestMealSequenceOnDiet(meals),
    }

    return metrics
  }
}
