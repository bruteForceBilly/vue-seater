# vue-seater 🪑

This is a start of a seat overview app can give visitors or venues overview of their reserved tickets and seats. 

In the lib directory you can find modules that is the base of the design for the app.

In a nuthsell, an api response is flatten and fed to seatMapper, which builds a Map of Seat object as keys, and coordinate tuplets as values (vertices / vertexes). 

The idea was to use this map object to bind pointer position
to a grid rendered in WebGL by Pixi.js

Pixi lets you do caching of tilesprites as bitmaps, which as I hoped
was a really fast way to render really large grids (of tiles). But making the 
Map object reactive with computed props was heachache for me. Vue 3 new reactive shall allow for it, but I just need to spend some more time to
get into the nitty gritty of it. 

There was a lot of new technology thrown in her to the mix for
me, in hindsight I think I will keep it more simple for next time.

Thank you for checking it out!

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

