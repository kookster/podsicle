import { Injectable } from '@angular/core';
import { Episode } from './episode';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PodcastService {

  constructor (private http: Http) {}

  getEpisodes(url: string): Observable<Episode[]> {
    console.log('getEpisodes', url);
    let feedUrl = decodeURIComponent(url);
    let proxyUrl = `/proxy?url=${feedUrl}`;
    let _episodes = this.http.get(proxyUrl).map((res: Response) => {
      console.log('getEpisodes http response', res.text());
      let episodes: Episode[] = [];

      let xml = res.text();

      let parser = new DOMParser();
      let doc = <XMLDocument> parser.parseFromString(xml, 'application/xml');

      let img: string;

      let _img = Array.from(doc.querySelectorAll('channel > *[href]')).filter(e => e.nodeName === 'itunes:image')[0];
      if (_img) {
        img = _img.getAttribute('href');
      }

      let artist = doc.querySelector('channel > title').innerHTML;

      let elements = doc.querySelectorAll('item');

      for (let i = 0; i < elements.length; ++i) {
        let item = <Element> elements[i];

        let title = function (html: string) {
          let txt = <HTMLTextAreaElement> document.createElement('textarea');
          txt.innerHTML = html;
          return txt.value;
        }(item.querySelector('title').innerHTML);

        let encUrl = item.querySelector('enclosure').getAttribute('url');

        let __img = Array.from(item.querySelectorAll('*[href]')).filter(e => e.nodeName === 'itunes:image')[0];
        if (__img) {
          img = __img.getAttribute('href');
        }

        let fbOrigEncUrl = item.querySelector('origEnclosureLink');
        if (fbOrigEncUrl) {
          encUrl = fbOrigEncUrl.innerHTML;
        }

        let guid = item.querySelector('guid').innerHTML;

        episodes.push(new Episode(encUrl, guid, title, artist, img));
      }
      return episodes;
    });
    return _episodes;
  }
}
