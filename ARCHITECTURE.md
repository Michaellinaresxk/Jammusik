# Jammusik — Documentación de Arquitectura

> App React Native para gestión de canciones, categorías y playlists con backend Firebase.

---

## Tabla de Contenidos

1. [Stack Tecnológico](#stack)
2. [Estructura de Directorios](#estructura)
3. [Arquitectura: Clean Architecture](#arquitectura)
4. [Flujo de Datos](#flujo)
5. [Navegación](#navegacion)
6. [Backend Firebase](#firebase)
7. [Capa de Dominio](#dominio)
8. [Capa de Infraestructura](#infraestructura)
9. [Casos de Uso (Primary)](#primary)
10. [Servicios y DI](#servicios)
11. [Contextos React](#contextos)
12. [Pantallas (Views/Pages)](#pantallas)
13. [Componentes UI](#componentes)
14. [Custom Hooks](#hooks)
15. [Estado Global (Zustand)](#zustand)
16. [Formularios y Validación](#formularios)
17. [Tema y Estilos](#tema)
18. [Variables de Entorno](#env)
19. [Bugs Resueltos](#bugs)

---

## 1. Stack Tecnológico {#stack}

| Tecnología | Versión | Uso |
|---|---|---|
| React Native | 0.76.1 | Framework principal |
| React | 18.3.1 | UI |
| TypeScript | 5.0.4 | Tipado |
| Firebase | 11.0.1 | Auth + Firestore |
| React Navigation | 6.x | Navegación |
| Zustand | 5.0.1 | Estado global UI |
| Formik + Yup | 2.4.6 / 1.4.0 | Formularios y validación |
| React Native Reanimated | 3.16.1 | Animaciones |
| Axios | 1.7.9 | HTTP (Last.fm API) |
| Hermes | — | Motor JS (habilitado) |
| New Architecture (Fabric) | — | Renderer nativo (habilitado) |

---

## 2. Estructura de Directorios {#estructura}

```
Jammusik/
├── src/
│   ├── UI/                     # Presentación (pantallas, componentes, tema)
│   │   ├── pages/              # Pantallas por feature
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── home/
│   │   │   ├── categories/
│   │   │   ├── playlists/
│   │   │   ├── songs/
│   │   │   ├── profile/
│   │   │   ├── feedback/
│   │   │   ├── aboutUs/
│   │   │   ├── faqs/
│   │   │   └── deleteAccount/
│   │   ├── components/
│   │   │   └── shared/         # Componentes reutilizables
│   │   │       ├── cards/
│   │   │       ├── forms/
│   │   │       ├── modals/
│   │   │       └── onboarding/
│   │   ├── routes/             # Navegación (AppNavigator, TabNavigator)
│   │   └── theme/              # Colores, estilos globales, ToastConfig
│   ├── primary/                # Casos de uso (lógica de negocio)
│   │   ├── category/useCases/
│   │   ├── song/useCases/
│   │   ├── playlist/useCases/
│   │   ├── user/useCases/
│   │   └── songDetails/
│   ├── domain/                 # Entidades e interfaces de repositorio
│   │   ├── Category.ts + CategoryRepository.ts
│   │   ├── Song.ts + SongRepository.ts
│   │   ├── Playlist.ts + PlaylistRepository.ts
│   │   ├── User.ts + UserRepository.ts
│   │   └── SongDetails.ts + SongDetailsRepository.ts
│   ├── infra/                  # Implementaciones Firebase
│   │   ├── category/           # CategoryCaller, CategoryResource, ApiCategory
│   │   ├── song/               # SongCaller, SongResource, ApiSong
│   │   ├── playlist/           # PlaylistCaller, PlaylistResource
│   │   ├── user/               # UserCaller, UserResource, ApiUser
│   │   └── songDetails/        # SongDetailsCaller, SongDetailsResource
│   ├── services/               # Inyección de dependencias
│   │   ├── userService.ts
│   │   ├── categoryService.ts
│   │   ├── songService.ts
│   │   ├── playlistService.ts
│   │   └── songDetailsService.ts
│   ├── context/                # Proveedores React Context
│   │   ├── UserServiceContext.tsx
│   │   ├── CategoryServiceContext.tsx
│   │   ├── SongServiceContext.tsx
│   │   ├── PlaylistServiceContext.tsx
│   │   └── SongDetailsServiceContext.tsx
│   ├── hooks/                  # Custom hooks
│   ├── types/                  # Interfaces y tipos TypeScript
│   ├── views/                  # DTOs (Data Transfer Objects)
│   └── assets/                 # Imágenes, URLs CDN
├── ios/                        # Proyecto nativo iOS
│   ├── Fonts/Ionicons.ttf
│   ├── Podfile / Podfile.lock
│   └── Jammusik.xcworkspace    # ← abrir ESTE en Xcode
├── android/                    # Proyecto nativo Android
├── App.tsx                     # Entry point React
├── index.js                    # Entry point React Native
├── babel.config.js
├── metro.config.js
└── package.json
```

---

## 3. Arquitectura: Clean Architecture {#arquitectura}

La app implementa Clean Architecture con 4 capas. Las dependencias **solo apuntan hacia adentro**.

```
┌──────────────────────────────────────────────────────┐
│  UI / Presentación  (src/UI/)                        │
│  Pantallas, Componentes, Navegación, Tema             │
│         ↓ usa hooks/contextos                        │
├──────────────────────────────────────────────────────┤
│  Primary / Use Cases  (src/primary/)                 │
│  Lógica de negocio. Orquesta repositorios.            │
│         ↓ depende de interfaces de dominio           │
├──────────────────────────────────────────────────────┤
│  Domain  (src/domain/)                               │
│  Entidades puras + Interfaces de repositorio          │
│         ↑ implementado por                           │
├──────────────────────────────────────────────────────┤
│  Infrastructure  (src/infra/)                        │
│  Firebase Firestore/Auth. Implementa repositorios.   │
└──────────────────────────────────────────────────────┘
```

**Regla clave:** El dominio no sabe nada de Firebase. Los casos de uso no saben nada de React.

### DTOs (Views)
`src/views/` contiene clases de transferencia de datos que convierten entidades de dominio en objetos simples para la UI:

```
Domain Entity → UseCase → View (DTO) → React Component
Category      →   Get   → CategoryView → CategoryCard
```

---

## 4. Flujo de Datos Completo {#flujo}

### Ejemplo: Crear una categoría

```
CategoriesScreen
  └─ llama a: categoryService.createCategory(userId, title)
       └─ CategoryResource.createCategory()           [src/infra/category/]
            └─ CategoryCaller.createCategory()        [Firestore add()]
                 └─ retorna ApiCategory
            └─ Category.fromProperties(apiData)       [src/domain/]
            └─ CategoryView.fromDomain(category)      [src/views/]
  └─ recibe: CategoryView { id, title }
```

### Ejemplo: Login

```
LoginScreen
  └─ handleLogin(email, password)
       └─ userService.loginUser(email, password)
            └─ UserResource.loginUser()
                 └─ UserCaller.loginUser()            [Firebase signInWithEmailAndPassword]
                      └─ retorna ApiUser
                 └─ User.fromProperties(apiUser)
  └─ Firebase onAuthStateChanged dispara
  └─ useAuthStatus() detecta isLoggedIn = true
  └─ AppNavigator renderiza MainTabs automáticamente
```

---

## 5. Navegación {#navegacion}

### Estructura

```
AppNavigator (Stack)
├── [No autenticado]
│   ├── LoginScreen
│   └── RegisterScreen
└── [Autenticado — detectado por useAuthStatus()]
    ├── MainTabs (TabNavigator)
    │   ├── HomeScreen        (tab: Home)
    │   ├── CategoriesScreen  (tab: Categories)
    │   ├── PlaylistScreen    (tab: Playlists)
    │   └── SettingsScreen    (tab: Settings)
    ├── ProfileScreen
    ├── FeedbackScreen
    ├── AboutUsScreen
    ├── FaqsScreen
    ├── DeleteAccountScreen
    ├── CategorySelectedScreen   ← params: { id, title }
    ├── PlaylistSelectedScreen   ← params: { id, title }
    └── SongSelectedScreen       ← params: { title, artist }
```

### Archivos clave

| Archivo | Ubicación |
|---|---|
| AppNavigator | `src/UI/routes/AppNavigator.tsx` |
| TabNavigator | `src/UI/routes/TabNavigator.tsx` |
| Tipos de rutas | `RootStackParamsList` en AppNavigator.tsx |

### Cómo navegar

```typescript
// Navegar sin parámetros
navigation.navigate('ProfileScreen');

// Navegar con parámetros
navigation.navigate('CategorySelectedScreen', { id: 'abc', title: 'Rock' });

// Acceder a parámetros en la pantalla destino
const route = useRoute<RouteProp<RootStackParamsList, 'CategorySelectedScreen'>>();
const { id, title } = route.params;
```

### Auth Guard
La autenticación está manejada en `AppNavigator.tsx` mediante `useAuthStatus()`. No hay un guard explícito — el navigator renderiza condicionalmente según `isLoggedIn`.

---

## 6. Backend Firebase {#firebase}

### Configuración
`src/infra/firebase/firebaseConfig.ts`

```typescript
// Exports disponibles:
import { db, auth, storage } from './firebaseConfig';
```

### Colecciones Firestore

| Colección | Documento | Campos |
|---|---|---|
| `users` | userId | id, email, name |
| `categories` | auto-id | id, title, userId |
| `songs` | auto-id | id, title, artist, categoryId, userId, isDone, playlistIds[], addedAt |
| `playlists` | auto-id | id, title, userId, createdAt |
| `playlist_songs` | auto-id | playlistId, songId (relación) |
| `songDetails` | auto-id | userId, songId, key, chordList, notes, lyricLink, tabLink |
| `songKeys` | auto-id | id, key, order |

### Queries principales

```
// Canciones de una categoría
songs WHERE categoryId == X AND userId == Y

// Canciones de una playlist
songs WHERE playlistIds array-contains playlistId

// Detalles de una canción
songDetails WHERE userId == X AND songId == Y

// Categoría especial "Library" → devuelve todas las canciones del usuario
songs WHERE userId == X
```

### Índices requeridos (Firestore)
- `songs`: (userId ASC, categoryId ASC)
- `songs`: (userId ASC, playlistIds ARRAY)
- `songDetails`: (userId ASC, songId ASC)
- `categories`: (userId ASC)
- `playlists`: (userId ASC)

---

## 7. Capa de Dominio {#dominio}

`src/domain/` — Entidades puras, sin dependencias externas.

### Entidades

#### Category
```typescript
// src/domain/Category.ts
class Category {
  constructor(id: string, title: string, userId: string)
  static fromProperties(props: CategoryProperties): Category
  get properties(): CategoryProperties
}
```

#### Song
```typescript
// src/domain/Song.ts
class Song {
  constructor(id, categoryId, title, artist, isDone, originalSongId?)
  static fromProperties(props: SongProperties): Song
}
```

#### Playlist
```typescript
// src/domain/Playlist.ts
class Playlist {
  constructor(id: string, title: string)
  static fromProperties(props: PlaylistProperties): Playlist
}
```

#### User
```typescript
// src/domain/User.ts
class User {                        // constructor privado
  static fromProperties(props: UserProperties): User
  // props: { id, name, email }
}
```

#### SongDetails
```typescript
// src/domain/SongDetails.ts
class SongDetails {
  constructor(userId, songId, key?, chordList?, notes?, lyricLink?, tabLink?)
  static fromProperties(props: SongDetailsProperties): SongDetails
}
```

### Interfaces de Repositorio
Cada entidad tiene una interfaz en `src/domain/`:
- `CategoryRepository.ts`
- `SongRepository.ts`
- `PlaylistRepository.ts`
- `UserReporistory.ts` ← (typo en nombre de archivo, no renombrar sin actualizar imports)
- `SongDetailsRepository.ts`

---

## 8. Capa de Infraestructura {#infraestructura}

`src/infra/` — Implementa las interfaces de dominio usando Firebase.

### Patrón por feature

```
src/infra/{feature}/
├── Api{Feature}.ts        // Tipo plano de Firebase (sin métodos)
├── {Feature}Caller.ts     // Llamadas directas a Firestore/Auth
└── {Feature}Resource.ts   // Implementa la interfaz de repositorio
                           // Transforma ApiType → Domain Entity
```

### CategoryCaller — Métodos disponibles

```typescript
createCategory(title: string): Promise<ApiCategory>
getCategories(userId: string): Promise<ApiCategory[]>
getSongListByCategory(userId: string, categoryId: string): Promise<ApiSong[]>
  // ↑ Si categoryId === 'library', retorna todas las canciones del usuario
getAllSongsByUserId(userId: string): Promise<ApiSong[]>
updateCategory(categoryId: string, newTitle: string): Promise<ApiCategory>
deleteCategory(userId: string, categoryId: string): Promise<void>
```

### SongCaller — Métodos disponibles

```typescript
createSong(categoryId, title, artist, isDone): Promise<ApiSong>
getSongs(playlistId?: string): Promise<ApiSong[]>
updateSong(userId, songId, { title?, artist?, categoryId? }): Promise<ApiSong>
deleteSong(userId, songId): Promise<void>
```

### PlaylistCaller — Métodos disponibles

```typescript
createPlaylist(title: string): Promise<ApiPlaylist>
getPlaylists(userId: string): Promise<ApiPlaylist[]>
updatePlaylist(playlistId, newTitle): Promise<ApiPlaylist>
addSongToPlaylist(playlistId, songData): Promise<void>
getPlaylistSongs(playlistId: string): Promise<ApiSong[]>
removeSongFromPlaylist(userId, playlistId, songId): Promise<void>
deletePlaylist(playlistId: string): Promise<void>   // batch: borra playlist + playlist_songs
```

### SongDetailsCaller — Métodos disponibles

```typescript
setCurrentInfo(userId, songId, key?, chordList?, notes?, lyricLink?, tabLink?): Promise<ApiSongDetails>
getCurrentSongInfo(userId, songId): Promise<ApiSongDetails>
getSongKeys(): Promise<{ id, key, order }[]>
```

---

## 9. Casos de Uso (Primary) {#primary}

`src/primary/` — Orquestan repositorios. Un método por caso de uso.

### Interfaz base
```typescript
// src/primary/UseCase.ts
interface UseCase<T, R> {
  execute(request: T): Promise<R>;
}
```

### Category Use Cases
| Clase | Archivo | execute() signature |
|---|---|---|
| GetCategoriesUseCase | `category/useCases/` | (userId) → CategoryView[] |
| CreateCategoryUseCase | `category/useCases/` | (userId, title) → CategoryView |
| UpdateCategoryUseCase | `category/useCases/` | (categoryId, title) → CategoryView |
| DeleteCategoryUseCase | `category/useCases/` | (userId, categoryId) → void |
| GetSongListByCategoryUseCase | `category/useCases/` | (categoryId, userId) → SongView[] |
| GetAllSongsUseCase | `category/useCases/` | (userId) → SongView[] |

### Song Use Cases
| Clase | Archivo | execute() signature |
|---|---|---|
| CreateSongUseCase | `song/useCases/` | (categoryId, title, artist, isDone) → SongView |
| GetSongListUseCase | `song/useCases/` | (playlistId?) → SongView[] |
| UpdateSongUseCase | `song/useCases/` | (userId, songId, updates) → SongView |
| DeleteSongUseCase | `song/useCases/` | (userId, songId) → void |

### Playlist Use Cases
| Clase | Archivo | execute() signature |
|---|---|---|
| GetPlaylistUseCase | `playlist/useCases/` | (userId) → PlaylistView[] |
| CreatePlaylistUseCase | `playlist/useCases/` | (title) → PlaylistView |
| UpdatePlaylistUseCase | `playlist/useCases/` | (playlistId, title) → PlaylistView |
| DeletePlaylistUseCase | `playlist/useCases/` | (playlistId) → void |
| AddSongToPlaylistUseCase | `playlist/useCases/` | (playlistId, songData) → void |
| GetPlaylistSongsUseCase | `playlist/useCases/` | (playlistId) → SongView[] |
| RemoveSongFromPlaylistUseCase | `playlist/useCases/` | (userId, playlistId, songId) → void |

### User Use Cases
| Clase | Archivo | execute() signature |
|---|---|---|
| LoginUserUseCase | `user/useCases/` | (email, password) → User |
| CreateUserUseCase | `user/useCases/` | (email, password, userName) → UserView |
| LogoutUserUseCase | `user/useCases/` | () → void |
| GetCurrentUserUseCase | `user/useCases/` | (userId) → UserView |
| DeleteUserUseCase | `user/useCases/` | (userId) → void |

### SongDetails Use Cases
| Clase | Archivo | execute() signature |
|---|---|---|
| GetSongDetailsUseCase | `songDetails/` | (userId, songId) → SongDetailsView |
| SetSongDetailsUseCase | `songDetails/` | (userId, songId, key?, chordList?, notes?, lyricLink?, tabLink?) → SongDetailsView |
| GetSongKeysUseCase | `songDetails/` | () → { id, key, order }[] |

---

## 10. Servicios e Inyección de Dependencias {#servicios}

`src/services/` — Compone la cadena: Caller → Resource → Service.

```typescript
// Ejemplo: src/services/categoryService.ts
const categoryCaller = new CategoryCaller();
const categoryResource = new CategoryResource(categoryCaller);
export const categoryService = new CategoryService(categoryResource);
//     ↑ este objeto se inyecta en el context provider en App.tsx
```

### Cómo se inyectan en App.tsx

```typescript
// App.tsx
<ProviderComposer
  contexts={[
    <UserServiceProvider userService={userService} />,
    <CategoryServiceProvider categoryService={categoryService} />,
    <SongServiceProvider songService={songService} />,
    <PlaylistServiceProvider playlistService={playlistService} />,
    <SongDetailsServiceProvider songDetailsService={songDetailsService} />,
  ]}>
  <AppNavigator />
</ProviderComposer>
```

### Cómo consumir un servicio en un componente

```typescript
import { useCategoryService } from '../context/CategoryServiceContext';

const MyComponent = () => {
  const categoryService = useCategoryService();
  // categoryService.getCategories(userId)
  // categoryService.createCategory(userId, title)
  // etc.
};
```

---

## 11. Contextos React {#contextos}

`src/context/` — Un contexto por servicio.

| Hook | Contexto | Proveedor |
|---|---|---|
| `useUserService()` | UserServiceContext | UserServiceProvider |
| `useCategoryService()` | CategoryServiceContext | CategoryServiceProvider |
| `useSongService()` | SongServiceContext | SongServiceProvider |
| `usePlaylistService()` | PlaylistServiceContext | PlaylistServiceProvider |
| `useSongDetailsService()` | SongDetailsServiceContext | SongDetailsServiceProvider |

Todos siguen el mismo patrón. Si se usan fuera del provider lanzan un error descriptivo.

---

## 12. Pantallas (Pages) {#pantallas}

`src/UI/pages/`

| Pantalla | Ruta | Descripción |
|---|---|---|
| LoginScreen | `login/LoginScreen.tsx` | Login email/password |
| RegisterScreen | `register/RegisterScreen.tsx` | Registro nuevo usuario |
| HomeScreen | `home/HomeScreen.tsx` | Vista principal con categorías y playlists |
| CategoriesScreen | `categories/CategoriesScreen.tsx` | CRUD de categorías |
| CategorySelectedScreen | `categories/CategorySelectedScreen.tsx` | Canciones de una categoría |
| PlaylistScreen | `playlists/PlaylistScreen.tsx` | CRUD de playlists |
| PlaylistSelectedScreen | `playlists/PlaylistSelectedScreen.tsx` | Canciones de una playlist |
| SongSelectedScreen | `songs/SongSelectedScreen.tsx` | Detalle de canción |
| TrackDetailsScreen | `songs/TrackDetailsScreen.tsx` | Detalles (chords, key, links) |
| SettingsScreen | `settings/SettingsScreen.tsx` | Menú de configuración |
| ProfileScreen | `profile/ProfileScreen.tsx` | Editar perfil |
| FeedbackScreen | `feedback/FeedbackScreen.tsx` | Enviar feedback (Resend API) |
| AboutUsScreen | `aboutUs/AboutUsScreen.tsx` | Info de la app |
| FaqsScreen | `faqs/FaqsScreen.tsx` | Preguntas frecuentes |
| DeleteAccountScreen | `deleteAccount/DeleteAccountScreen.tsx` | Eliminar cuenta |

---

## 13. Componentes UI Compartidos {#componentes}

`src/UI/components/shared/`

### Básicos
| Componente | Descripción |
|---|---|
| `BrandLogo` | Logo de la app |
| `PrimaryButton` | Botón CTA principal |
| `PrimaryIcon` | Wrapper de ícono Ionicons |
| `GlobalHeader` | Header de pantalla |
| `GoBackButton` | Botón retroceso con ícono |
| `FloatingActionButton` | FAB para acciones principales |
| `SpinnerLoader` | Indicador de carga |
| `SongCounter` | Contador de canciones |
| `UserAvatar` | Avatar de usuario |
| `Separator` | Línea divisoria |
| `CustomDropdown` | Selector desplegable |
| `RadioButton` | Botón radio |
| `SliderQuotes` | Carrusel de citas |
| `HamburgerMenu` | Menú hamburguesa |
| `MenuItem` | Item de menú |

### Cards
| Componente | Props clave |
|---|---|
| `CategoryCard` | `id, title, onPress` |
| `CategoryCardLight` | versión compacta |
| `SongCard` | `title, artist, isDone, onPress` |
| `PlaylistCard` | `id, title, onPress` |
| `TopTrackCard` | Para tracks de Last.fm |

### Modales
| Componente | Uso |
|---|---|
| `SongOptionsModal` | Opciones de una canción (editar, eliminar, añadir a playlist) |
| `PlaylistSelectorModal` | Seleccionar playlist para añadir canción |
| `SongSelectorModal` | Seleccionar canción para añadir a playlist |

### Onboarding
| Componente | Uso |
|---|---|
| `Welcome` | Pantalla de bienvenida primer login |
| `OnboardingTooltip` | Tooltips de tutorial (3 pasos) |

---

## 14. Custom Hooks {#hooks}

`src/hooks/`

| Hook | Descripción | Retorna |
|---|---|---|
| `useAuthStatus` | Monitorea Firebase Auth state | `{ isLoggedIn, userName, uid }` |
| `useLogout` | Cierra sesión y navega a Login | `{ logoutUser }` |
| `useOnboarding` | Detecta primer login (onboarding) | `{ showWelcome, showTooltip, tooltipStep, ... }` |
| `usePullRefreshing` | Pull-to-refresh genérico | `{ refreshing, onRefresh }` |
| `useToggleIsDone` | Toggle isDone en canción | `{ toggleIsDone }` |
| `useUpdateCategory` | CRUD categorías con estado | `{ updateCategory, deleteCategory, ... }` |
| `useUpdatePlaylist` | CRUD playlists con estado | `{ updatePlaylist, deletePlaylist, ... }` |
| `useGetCategoryTitle` | Obtiene título de categoría por ID | `{ categoryTitle }` |
| `useAccordion` | Controla acordeón animado | `{ isOpen, toggleAccordion, animatedHeight }` |
| `useAnimationKeyboard` | Animación con teclado | `{ animatedValue }` |
| `useEmailResend` | Envío de feedback via Resend API | `{ sendEmail, isSending }` |
| `useResetAllSongs` | Reset isDone en todas las canciones | `{ resetAllSongs }` |
| `useTopTracks` | Obtiene top tracks de Last.fm | `{ tracks, isLoading }` |
| `useTrackDetails` | Detalles de track via Last.fm API | `{ trackDetails, isLoading }` |

---

## 15. Estado Global (Zustand) {#zustand}

`src/UI/store/` — Estado de UI exclusivamente.

```typescript
// useSongState.ts
interface SongState {
  songs: SongView[];
  setSongs: (songs: SongView[]) => void;
  // ...
}
```

Zustand se usa solo para estado de UI de canciones. El estado de autenticación está en Firebase (`onAuthStateChanged`). El resto del estado es local en cada pantalla via `useState`.

---

## 16. Formularios y Validación {#formularios}

`src/UI/components/shared/forms/`

Todos usan **Formik + Yup**.

| Formulario | Schema de validación |
|---|---|
| `FormLogin` | `validation_login_yup.ts` — email, password |
| `FormRegister` | `validation_register_yup.ts` — email, password, userName |
| `FormCreateSong` | `validation_create_song.ts` — title, artist, categoryId |
| `FormCreateCategory` | `validation_create_category.ts` — title |
| `FormCreatePlaylist` | `validation_create_playlist.ts` — title |
| `FormProfile` | `validation_profile_form.ts` — name, email |
| `FormSongDetails` | sin schema Yup — key, chords, notes, lyricLink, tabLink |

---

## 17. Tema y Estilos {#tema}

`src/UI/theme/Theme.jsx`

### Colores globales

```typescript
export const globalColors = {
  primary:   '#18998B',  // teal — color principal de la marca
  secondary: '#070c0d',  // casi negro — fondos
  terceary:  '#838282',  // gris — textos secundarios
  light:     '#FFFFFF',
  dark:      '#000000',
  warning:   '...',
  danger:    '...',      // rojo — errores
  info:      '...',      // azul — información
};
```

### Estilos globales disponibles

```typescript
import { globalColors, globalStyles, formStyles, ThemeDark } from '../theme/Theme';

// globalStyles.container     — contenedor base flex:1
// globalStyles.overlay       — overlay oscuro semi-transparente
// globalStyles.button        — estilos base de botón
// formStyles.input           — input de formulario
// formStyles.label           — label de formulario
```

### Toast notifications

```typescript
import Toast from 'react-native-toast-message';

Toast.show({ type: 'success', text1: 'Éxito', text2: 'Categoría creada' });
Toast.show({ type: 'error',   text1: 'Error', text2: 'Algo salió mal' });
Toast.show({ type: 'info',    text1: 'Info',  text2: 'Información' });
```

Config en: `src/UI/theme/ToastConfig.tsx` — montado en `App.tsx` como `<Toast config={ToastConfig} />`.

---

## 18. Variables de Entorno {#env}

`.env` — Cargadas via `react-native-dotenv` con alias `@env`.

```typescript
import { APIKEY, PROJECT_ID, RESEND_API_KEY } from '@env';
```

Tipos declarados en `src/types/env.d.ts`.

**Variables disponibles:**

| Variable | Uso |
|---|---|
| `APIKEY` | Firebase API Key |
| `AUTH_DOMAIN` | Firebase Auth Domain |
| `PROJECT_ID` | Firebase Project ID |
| `STORAGE_BUCKET` | Firebase Storage |
| `MESSAGING_SENDER_ID` | Firebase Messaging |
| `APP_ID` | Firebase App ID |
| `MEASUREMENT_ID` | Firebase Analytics |
| `RESEND_API_KEY` | Resend email service |
| `SEND_FEEDBACK_TO` | Email destino del feedback |

> **Importante:** El `.env` está commiteado al repo. Si el proyecto se hace público, rotar todas las API keys.

---

## 19. Bugs Resueltos {#bugs}

### Resueltos en esta sesión

| # | Archivo | Bug | Fix |
|---|---|---|---|
| 1 | `ios/Jammusik.xcodeproj/project.pbxproj` | `ENABLE_USER_SCRIPT_SANDBOXING = YES` bloqueaba Node.js durante build | Cambiado a `NO` en Debug y Release |
| 2 | `LoginScreen.tsx` | `navigation.navigate('HomeScreen')` — ruta inexistente | Eliminado (auth state maneja la redirección automáticamente) |
| 3 | `RegisterScreen.tsx` | `navigation.navigate('HomeScreen')` — ruta inexistente | Eliminado |
| 4 | `RegisterScreen.tsx` | `setIsLoading(false)` duplicado en catch block | Eliminada la línea duplicada |
| 5 | `ToastConfig.tsx` | `info` usaba `ErrorToast` y `error` usaba `InfoToast` (intercambiados) | Corregido: info → InfoToast, error → ErrorToast |
| 6 | `ToastConfig.tsx` | Faltaba `import React` — error TS en JSX | Añadido `import React` |
| 7 | `PlaylistServiceContext.tsx` | Error message decía "useCategoryService" (copy-paste) | Corregido a "usePlaylistService" |
| 8 | `SongServiceContext.tsx` | Error message decía "useCategoryService" (copy-paste) | Corregido a "useSongService" |
| 9 | `SongDetailsServiceContext.tsx` | Error message decía "useCategoryService" (copy-paste) | Corregido a "useSongDetailsService" |

### Bugs conocidos (pendientes)

| # | Archivo | Bug | Severidad |
|---|---|---|---|
| 1 | `domain/UserReporistory.ts` | Typo en nombre de archivo (Reporistory) | Baja — funcional |
| 2 | `SongDetailsRepository.ts` | Params de interfaz (location, skills, instrument) no coinciden con implementación (notes, lyricLink, tabLink) | Media |
| 3 | `infra/user/UserCaller.ts` | `deleteAccount` busca usuario por userId pero docs están por auto-ID | Alta |
| 4 | `primary/playlist/CreatePlaylistUseCase.ts` | Falta parámetro userId | Media |

---

## Cómo correr el proyecto

```bash
# Instalar dependencias
npm install

# iOS — instalar pods (necesario tras cambios en package.json o infra nativa)
cd ios && pod install && cd ..

# Correr en dispositivo físico iOS
npx react-native run-ios

# Correr en simulador específico
npm run ios:simulator

# Iniciar Metro bundler por separado
npx react-native start

# Android
npx react-native run-android
```

### Si el build de iOS falla

```bash
# 1. Limpiar build
rm -rf ios/build

# 2. Limpiar DerivedData
rm -rf ~/Library/Developer/Xcode/DerivedData/Jammusik-*

# 3. Re-instalar pods
cd ios && pod install && cd ..

# 4. Build desde cero
npx react-native run-ios
```
