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
