import { Component, computed, signal } from '@angular/core'
import loyalties from '../../../../public/loyalties.json'
import { ViewportAnimationDirective } from '../../directives/viewport-animation'

interface LoyaltyInterface {
  name: string,
  text: string,
  phone: string | null,
  telegram: {
    text: string,
    link: string
  } | null,
  link: string | null,
  adr: string[] | null
}

@Component({
  selector: 'app-loyalty',
  imports: [ViewportAnimationDirective],
  templateUrl: './loyalty.html',
  styleUrl: './loyalty.scss',
})
export class Loyalty {
  private rawData: any = loyalties

  allLoyalty: LoyaltyInterface[] = Object.values(this.rawData).flat() as LoyaltyInterface[]

  selectedCategories = signal<string[]>(['Все'])

  categories = computed(() => {
    return ['Все', ...Object.keys(this.rawData).sort()]
  })

  filteredGroups = computed(() => {
    const activeFilters = this.selectedCategories()
    const groups: { [key: string]: LoyaltyInterface[] } = {}

    Object.keys(this.rawData).forEach(categoryName => {
      if (activeFilters.includes('Все') || activeFilters.includes(categoryName)) {
        groups[categoryName] = this.rawData[categoryName]
      }
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

  ucFirst(str: string) {
    if (!str) return str
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}

