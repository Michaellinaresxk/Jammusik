import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default function useHeaderStyle() {
  const route = useRoute()

  const backgroundImages = {
    HomePage:
      'url(https://res.cloudinary.com/freelancer2222222222222222/image/upload/v1692639050/bg-home_lxvdjj.png)',
    PlaylistSelected:
      'url(https://res.cloudinary.com/freelancer2222222222222222/image/upload/v1692639050/bg-playlist_wf9jqm.png)',
    CategorySelected:
      'url(https://res.cloudinary.com/freelancer2222222222222222/image/upload/v1692639050/bg-playlist_wf9jqm.png)',
    PlaylistPage:
      'url(https://res.cloudinary.com/freelancer2222222222222222/image/upload/v1692639050/bg-song_u3hvkm.png)',
    SongSelected:
      'url(https://res.cloudinary.com/freelancer2222222222222222/image/upload/v1692639050/bg-song_u3hvkm.png)'
  }

  const headerStyle = computed(() => {
    const routeName = route.name || 'default'
    // @ts-ignore
    const backgroundImage = backgroundImages[routeName]

    return {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), ${backgroundImage}`,
      clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0% 100%)',
      height: '200px',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  })

  return { headerStyle }
}
