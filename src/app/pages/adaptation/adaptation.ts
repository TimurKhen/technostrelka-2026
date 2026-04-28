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
  selectedDays: string[] = ['all'];

  allTasks: CheckboxItem[] = tasksData;
  completedIds: number[] = [];

  get filteredCheckboxes() {
    const tasks = this.selectedDays.includes('all')
      ? this.allTasks
      : this.allTasks.filter(item => this.selectedDays.includes(item.day.toString()));

    return tasks.map(task => ({
      ...task,
      checked: this.completedIds.includes(task.id)
    }));
  }

  get days() {
    return [...new Set(this.allTasks.map(item => item.day.toString()))].sort((a, b) => +a - +b);
  }

  toggleFilter(day: string) {
    if (day === 'all') {
      this.selectedDays = ['all'];
      return;
    }

    let next = this.selectedDays.filter(d => d !== 'all');

    if (next.includes(day)) {
      next = next.filter(d => d !== day);
    } else {
      next.push(day);
    }

    this.selectedDays = next.length === 0 ? ['all'] : next;
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
