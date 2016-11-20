import { Episode} from './episode';

export class Podcast {
  constructor(
    public url: string
  ) {}

  public title: string;
  public imageUrl: string;
  public episodes: Episode[];
}
