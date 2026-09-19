# 1844refrsh

A Vercel-ready personal profile/about-me page with a black/red theme, animated entry screen, aliases, links, profile views, custom PFP, and music player.

## Deploy

1. Upload this folder to a GitHub repository.
2. Import the repository into Vercel.
3. Framework: Next.js.
4. Build command: `next build`.
5. No environment variables are required.

## Change your PFP

Replace:

`public/assets/pfp.png`

with your image. Keep the filename `pfp.png`.

## Add music

Put an MP3 at:

`public/assets/music.mp3`

Then edit `app/page.jsx`:

```js
music: {
  title: "Your Song",
  artist: "Your Artist",
  file: "/assets/music.mp3",
}
```

You can use another filename if you change `file`.

## Change aliases

Edit the `aliases` array in `app/page.jsx`.

## Change links

Edit the `links` array in `app/page.jsx`.

## About text

Edit the ABOUT section in `app/page.jsx`.

## Important

The included view counter is a simple browser-side counter, so it counts views per browser/device rather than being a global server counter. A real global view counter would need a database or analytics endpoint.
