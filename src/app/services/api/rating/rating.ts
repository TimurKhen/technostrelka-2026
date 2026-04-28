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
  private rateUrl = masterURL + '/review/'

  rate(inforamtion: {
    username: string,
    email: string,
    comment: string,
    mark: number
  }) {

    return this.http.post(
      this.rateUrl + 'create',
      JSON.stringify(
        inforamtion
      ),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(
      catchError((err) => {
        this.alert.show(
          'Ошибка создания отзыва',
          'Возможно, такой email уже использован',
          true
        )

        return throwError(err)
      })
    )
  }

  getReviews() {
    return this.http.get<{reviews: ReviewInterface[], average: number}>(this.rateUrl + 'get')
  }

  getRating() {
    return this.http.get<number>(this.rateUrl)
  }
}
