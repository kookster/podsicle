import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: String = 'Podsicle';
  podcastUrl: String = 'http://feeds.99percentinvisible.org/99percentinvisible';

  retrievePodcast(podcastUrl: String ) {
    this.podcastUrl = podcastUrl;
  }
}
