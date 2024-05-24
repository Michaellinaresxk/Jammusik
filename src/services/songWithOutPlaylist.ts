import { SongWithOutPlaylistResource } from "../infra/songWithOutPlaylist/SongWithOutPlaylistResource";
import { SongWithOutPlaylistCaller } from "../infra/songWithOutPlaylist/SongWithOutPlaylistCaller";
import { SongWithOutPlaylistService } from "../primary/songWithOutPlaylist/index";

const songWithOutPlaylistCaller = new SongWithOutPlaylistCaller();
const songWithOutPlaylistResource = new SongWithOutPlaylistResource(
  songWithOutPlaylistCaller,
);
const songWithOutPlaylistService = new SongWithOutPlaylistService(
  songWithOutPlaylistResource,
);

export { songWithOutPlaylistService };
