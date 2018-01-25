# puppeteer-example

gets critical css

```
yarn test
.external {
  color: red;
  font-family: "Roboto", sans-serif;
  animation: swing 1s ease;
  animation-iteration-count: 1;
}
```

## Issues with Chrome CSS coverage

### Doesn't show `@font-face`

should show

```css
@font-face {
  font-family: "Roboto";
  ...
}
```

because of

```css
.external {
  font-family: "Roboto", sans-serif;
}
```

### Doesn't show `@keyframes`

should show

```css
@keyframes swing {
  ...
}
```

because of

```css
.external {
  animation: swing 1s ease;
}
```

### Doesn't show `:hover`

should show

```css
.external:hover {
  color: green;
}
```

because of

```css
.external {
  ...
}
```

## Related

- https://bugs.chromium.org/p/chromium/issues/detail?id=765088
- https://bugs.chromium.org/p/chromium/issues/detail?id=744202&q=css%20Coverage%20&colspec=ID%20Pri%20M%20Stars%20ReleaseBlock%20Component%20Status%20Owner%20Summary%20OS%20Modified
- https://bugs.chromium.org/p/chromium/issues/detail?id=734470&q=css%20Coverage%20&colspec=ID%20Pri%20M%20Stars%20ReleaseBlock%20Component%20Status%20Owner%20Summary%20OS%20Modified
- https://bugs.chromium.org/p/chromium/issues/detail?id=717195&q=css%20Coverage%20&colspec=ID%20Pri%20M%20Stars%20ReleaseBlock%20Component%20Status%20Owner%20Summary%20OS%20Modified
