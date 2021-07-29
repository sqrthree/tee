# tee

Linux tee command for web debug

## How to run

- `npm run dev`: Start a server in development with the fancy logging reporter.
- `npm start`: Start a server in production with the json logging reporter.

## Play with docker

```
docker build -t tee .
docker run -d --name tee-debug -p 3000:3000 tee
```

---

> [sqrtthree.com](https://sqrtthree.com/) &nbsp;&middot;&nbsp;
> GitHub [@sqrthree](https://github.com/sqrthree) &nbsp;&middot;&nbsp;
> Twitter [@sqrtthree](https://twitter.com/sqrtthree)
