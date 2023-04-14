To run this app:
run the db
```bash
cd api
docker build -t db .
docker run -ti --name db  -p 5432:5432  db
```

to run the api
```bash
cd api
go run main.go
```

to run the web app
```bash
cd web-app
vue serve
```

then visit `localhost:8081`

I wanted to use selenium to test by a browser. But time was limited.
Go could be better structured and could be unit tested. Also error handling could be implemented better in app and api. In a real life solution I would concider testing at the time of implementing the methods or even better write some test before implementing them.
