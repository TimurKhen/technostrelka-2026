import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

interface CheckboxItem {
  id: string;
  text: string;
  checked: boolean;
  day: string,
}

@Component({
  selector: 'app-adaptation',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonToggleModule],
  templateUrl: './adaptation.html',
  styleUrl: './adaptation.scss',
})
export class Adaptation implements OnInit {
  selectedDay: string = 'all';

  checkboxes: CheckboxItem[] = [
    { id: '1', text: 'Установить среду разработки...', checked: false, day: '0' },
    { id: '2', text: 'Получить доступ в Jira', checked: false, day: '1' },
    { id: '3', text: 'Познакомиться с командой', checked: false, day: '2' }
  ];

  get filteredCheckboxes() {
    if (this.selectedDay === 'all') {
      return this.checkboxes;
    }
    return this.checkboxes.filter(item => item.day === this.selectedDay);
  }

  get days() {
    return [...new Set(this.checkboxes.map(item => item.day))].sort();
  }

  ngOnInit() {
    const saved = localStorage.getItem('newcomer-checklist');
    if (saved) {
      this.checkboxes = JSON.parse(saved);
    }
  }

  saveProgress() {
    localStorage.setItem('newcomer-checklist', JSON.stringify(this.checkboxes));
  }
}
