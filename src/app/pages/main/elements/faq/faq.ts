import { Component, signal } from '@angular/core';
import { Block } from "../../../../components/block/block";

interface faq {
  question: string,
  answer: string
}

const coworkingSpaceLink = 'https://sberfriend.sberbank.ru/sberfriend/#/application/A51020482C6E4BFDE05323C6440AA466/RU%2F52%2F416?typeObject=CONFRM_V2&tabValue=list'
const sportHallLink = 'https://sberfriend.sberbank.ru/sberfriend/#/application/A51020482C6E4BFDE05323C6440AA466/RU%2F52%2F416?typeObject=SERVICE&tabValue=list&timeZone=&city=%D0%B3+%D0%9D%D0%B8%D0%B6%D0%BD%D0%B8%D0%B9+%D0%9D%D0%BE%D0%B2%D0%B3%D0%BE%D1%80%D0%BE%D0%B4&categories=000001'
const eventBotLink = 'https://t.me/HubEventMatch_bot'

@Component({
  selector: 'app-faq',
  imports: [Block],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq {
  faqs: faq[] = [
    {
      "question": "Как посетить спортзал?",
      "answer": `Спортзал работает с 07:00 до 21:00, групповые занятия с 12:00 до 12:50 (запись на групповые занятия по ссылке: <a target="_blank" href=${sportHallLink}>Запись в спортзал</a>).`
    },
    {
      "question": "Когда обед?",
      "answer": "Время обеда гибкое, на него выделяется 50 мин (не входит в рабочее время)."
    },
    {
      "question": "Как забронировать переговорную или коворкинг?",
      "answer": `Сервис бронирования переговорных/коворкинга по ссылке: <a target="_blank" href=${coworkingSpaceLink}>Забронировать.</a>`
    },
    {
      "question": "Что такое период адаптации?",
      "answer": "Адаптация нового сотрудника — это комплексный процесс, который включает не только знакомство с рабочими задачами, но и интеграцию в коллектив, усвоение корпоративных ценностей и стандартов поведения. Эффективная адаптация способствует снижению стресса у новичка, ускоряет его включение в рабочие процессы и повышает лояльность к компании. Период адаптации — 1 неделя. Новичков в нашей команде встречает и сопровождает специалист по адаптации, Иванова Александра, @user."
    },
    {
      "question": "Как записаться на мероприятия?",
      "answer": `Зарегистрируйся в боте в ТГ и получай индивидуальную подборку. Бот предлагает мероприятия специально под ваши интересы: <a target="_blank" href=${eventBotLink}>@HubEventMatch_bot.</a>`
    },
    {
      "question": "Как составить график работы?",
      "answer": "График работы обсуждается лично с вашим руководителем."
    },
    {
      "question": "Как воспользоваться программой лояльности?",
      "answer": "Программа лояльности включает в себя специальные предложения от партнеров, осуществляющих продажу товаров и услуг населению. В рамках партнерства они предоставляют скидки и бонусы сотрудникам Центра исследований и разработки Сбера в Нижнем Новгороде. Выбрать интересующий вариант и обратиться за услугой можно, сообщив промокод или кодовое слово."
    },
    {
      "question": "Где взять канцтовары?",
      "answer": "Стойка с канцтоварами находится в общем зале (у кухни)."
    },
    {
      "question": "Как распечатать документ?",
      "answer": "Все офисные принтеры поддерживают цветную и ч/б печать. Авторизуйтесь через рабочую почту — и устройство готово к работе."
    }
  ]

  openIndex = signal<number | null>(null);

  toggle(index: number): void {
    this.openIndex.set(this.openIndex() === index ? null : index);
  }

  isOpen(index: number): boolean {
    return this.openIndex() === index;
  }
}
