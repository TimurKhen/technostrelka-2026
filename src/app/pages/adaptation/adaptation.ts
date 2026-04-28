import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import tasksData from '../../../../public/tasks.json';

interface CheckboxItem {
  id: number
  task: string
  day: number
  helper: string
  checked?: boolean
}

@Component({
  selector: 'app-adaptation',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonToggleModule],
  templateUrl: './adaptation.html',
  styleUrl: './adaptation.scss',
})
export class Adaptation implements OnInit {
  selectedDay: string = 'all'

  allTasks: CheckboxItem[] = tasksData

  completedIds: number[] = []

  get filteredCheckboxes() {
    const tasks = this.selectedDay === 'all'
      ? this.allTasks
      : this.allTasks.filter(item => item.day.toString() === this.selectedDay)

    return tasks.map(task => ({
      ...task,
      checked: this.completedIds.includes(task.id)
    }))
  }

  get days() {
    return [...new Set(this.allTasks.map(item => item.day.toString()))].sort()
  }

  ngOnInit() {
    const saved = localStorage.getItem('completed-task-ids')
    if (saved) {
      this.completedIds = JSON.parse(saved)
    }
  }

  toggleTask(id: number) {
    if (this.completedIds.includes(id)) {
      this.completedIds = this.completedIds.filter(itemId => itemId !== id)
    } else {
      this.completedIds.push(id)
    }
    this.saveProgress()
  }

  saveProgress() {
    localStorage.setItem('completed-task-ids', JSON.stringify(this.completedIds))
  }
}
