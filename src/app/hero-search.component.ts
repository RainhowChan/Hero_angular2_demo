import {Component, OnInit} from '@angular/core';
import {HeroSearchService} from './hero-search.service';
import {Observable} from 'rxjs/Observable';
import {Hero} from './hero';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroSearchService: HeroSearchService,
              private router: Router) {
  }


  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300) // 等待300毫秒
      .distinctUntilChanged() // 当此次与上次有变化的时候才继续执行
      .switchMap(term => term
        ? this.heroSearchService.search(term)
        : Observable.of<Hero[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }

}
