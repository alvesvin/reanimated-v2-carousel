# Reanimated V2 Carousel
This is an animated carousel using React Reanimated V2 ~copied from~ inspired by [Catalin Miron](https://youtu.be/yV-2HRzNX9o).

## How to use
If you will to test it yourself, you'll need to get your API keys on [The Movie Database](https://themoviedb.org) as this project uses its API to fetch data.

The needed `.env` look like this:

```properties
TMDB_TOKEN=<your_v4_bearer_token>
TMDB_API_URL=https://api.themoviedb.org/3
TMDB_IMAGES_URL=https://image.tmdb.org/t/p/original
```

## Final result
With this project we were aiming at 60fps fluid animation. Unfortunatelly, the FlatList cannot contain too much data as something above 10 itens will cause performance issues.

Even though, the result looks awesome! [Check it hhere!](https://user-images.githubusercontent.com/55713933/110219886-ad29d880-7ea0-11eb-90b4-576ae375c177.mp4)


