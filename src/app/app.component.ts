import { Component } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ListService } from './services/list.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'the-crypt2';

  url: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

  list: any[] = [];

  filteredList: any[] =[];

  ngOnInit() {
    fetch(this.url)
      .then(res => res.json())
      .then(data => this.list = data)
      .then(() => this.update())
  }

  filterList($event: string) {
    this.filteredList = this.list.filter(coin => coin.id.includes($event));
    this.data.updateList(this.filteredList);
  }

  constructor(private data: ListService) { }

  update() {
    this.data.updateList(this.list)
  }
}
