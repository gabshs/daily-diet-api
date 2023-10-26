import { Meal } from '@prisma/client'

export function findBestMealSequenceOnDiet(meals: Meal[]): number {
  let currentSequence: Meal[] = []
  let bestSequence: Meal[] = []

  for (const meal of meals) {
    if (meal.is_on_diet) {
      currentSequence.push(meal)
      if (currentSequence.length > bestSequence.length) {
        bestSequence = [...currentSequence]
      }
    } else {
      currentSequence = []
    }
  }

  return bestSequence.length
}
