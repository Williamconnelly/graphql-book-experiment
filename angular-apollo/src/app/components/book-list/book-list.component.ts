import { Component, OnInit } from '@angular/core';
import { Book, Author } from '../../types';
import { Apollo } from  'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public bookList: Observable<Book[]>;

  private getBooksQuery = gql`
    {
      books {
        name
        genre
      }
    }
  `

  constructor(private _apollo: Apollo) { }

  ngOnInit() {
    console.log('List Initialized')
    this.bookList = this._apollo.watchQuery<{books: Book[]}>({
      query: this.getBooksQuery
    }).valueChanges.pipe(
      map(res => {
        console.log('Server Response:', res);
        return res.data.books;
      })
    );
  }

}
