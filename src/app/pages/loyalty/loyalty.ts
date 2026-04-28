import { Component, computed, signal } from '@angular/core'
import loyalties from '../../../../public/loyalties.json'

interface LoyaltyInterface {
  name: string,
  text: string,
  phone: string | null,
  telegram: {
    text: string,
    link: string
  } | null,
  link: string | null,
  ard: string[] | null
}

@Component({
  selector: 'app-loyalty',
  imports: [],
  templateUrl: './loyalty.html',
  styleUrl: './loyalty.scss',
})
export class Loyalty {
  allLoyalty: LoyaltyInterface[] = loyalties

  // Храним массив выбранных категорий
  selectedCategories = signal<string[]>(['Все'])

  categories = computed(() => {
    const cats = new Set<string>()
    this.allLoyalty.forEach(item => {
      item.ard?.forEach(cat => cats.add(cat))
    })
    return ['Все', ...Array.from(cats).sort()]
  })

  filteredGroups = computed(() => {
    const activeFilters = this.selectedCategories()
    const groups: { [key: string]: LoyaltyInterface[] } = {}

    this.allLoyalty.forEach(item => {
      const itemCats = item.ard || ['Прочее']

      itemCats.forEach(cat => {
        if (activeFilters.includes('Все') || activeFilters.includes(cat)) {
          if (!groups[cat]) groups[cat] = []
          if (!groups[cat].includes(item)) groups[cat].push(item)
        }
      })
    })

    return Object.entries(groups)
  })

  toggleFilter(category: string) {
    this.selectedCategories.update(current => {
      if (category === 'Все') return ['Все']

      let next = current.filter(c => c !== 'Все')

      if (next.includes(category)) {
        next = next.filter(c => c !== category)
      } else {
        next.push(category)
      }

      return next.length === 0 ? ['Все'] : next
   })
  }
}
