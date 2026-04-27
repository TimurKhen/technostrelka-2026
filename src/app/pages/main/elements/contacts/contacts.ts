import { Component } from '@angular/core';
import { Block } from "../../../../components/block/block";

interface fioAndTelegram {
  fio: string,
  telegram: string
}

@Component({
  selector: 'app-contacts',
  imports: [Block],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
})
export class Contacts {
  contacts: fioAndTelegram[] = [
    {
      'fio': 'Иванова Александра',
      'telegram': 'user'
    },
    {
      'fio': 'Смирнов Михаил',
      'telegram': 'user'
    },
    {
      'fio': 'Кузнецова Ирина',
      'telegram': 'user'
    }
  ]
}
