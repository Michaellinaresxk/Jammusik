import { SongDetailsResource } from "../infra/songDetails/SongDetailsResource";
import { SongDetailsCaller } from "../infra/songDetails/SongDetailsCaller";
import { SongDetailsService } from "../primary/songDetails/index";

const songDetailsCaller = new SongDetailsCaller();
const songDetailsResource = new SongDetailsResource(songDetailsCaller);
const songDetailsService = new SongDetailsService(songDetailsResource);

export { songDetailsService };
