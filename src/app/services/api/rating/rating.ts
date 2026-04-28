import { inject, Injectable } from '@angular/core';
import { masterURL } from '../masterURL';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../ui/alert/alert.service';
import { catchError, throwError } from 'rxjs';
import { ReviewInterface } from '../../../interfaces/review/review';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private http = inject(HttpClient)
  private alert = inject(AlertService)
  private rateUrl = masterURL + '/'

  rate(inforamtion: {
    username: string,
    email: string,
    comment: string,
    mark: number
  }) {

    this.http.post(
      this.rateUrl,
      JSON.stringify(
        inforamtion
      )
    ).pipe(
      catchError((err) => {
        this.alert.show(
          'Ошибка создания отзыва',
          err.message,
          true
        )

        return throwError(err)
      })
    )
  }

  getReviews() {
    return this.http.get<ReviewInterface[]>(this.rateUrl)
  }
}
