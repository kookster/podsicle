import { Component, OnInit, OnChanges, SimpleChange, Input } from '@angular/core';
import { PodcastService } from './podcast.service';
import { Episode } from './episode';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-podcast',
  providers: [PodcastService],
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.css']
})
export class PodcastComponent implements OnInit, OnChanges {
  @Input()
  feedUrl: string;

  episodes: Observable<Episode[]>;

  constructor(private podcastService: PodcastService) { }

  ngOnInit() {
    // this.getEpisodes();
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes['feedUrl'] && changes['feedUrl'].currentValue) {
      this.feedUrl = changes['feedUrl'].currentValue;
      this.getEpisodes();
    }
  }

  private getEpisodes(): void {
    this.episodes = this.podcastService.getEpisodes(this.feedUrl);
  }
}
