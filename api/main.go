package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type Item struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}

var db *sql.DB
var err error

func main() {
    // establish database connection
		dbinfo := "host=localhost port=5432 user=dmguser password=pwd dbname=dmg sslmode=disable"
    db, err = sql.Open("postgres", dbinfo)
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    // create router using Gorilla Mux
    router := mux.NewRouter()

    // define API endpoints
    router.HandleFunc("/items", getItems).Methods("GET")
    router.HandleFunc("/items/{id}", getItem).Methods("GET")
    router.HandleFunc("/items", createItem).Methods("POST")
    router.HandleFunc("/items/{id}", updateItem).Methods("PUT")
    router.HandleFunc("/items/{id}", deleteItem).Methods("DELETE")

    // start server
    log.Println("Running...")
    log.Fatal(http.ListenAndServe(":8000", router))
}

// get all items
func getItems(w http.ResponseWriter, r *http.Request) {
    var items []Item
    rows, err := db.Query("SELECT id, name FROM items")
    if err != nil {
        log.Fatal(err)
    }
    defer rows.Close()

    for rows.Next() {
        var item Item
        err := rows.Scan(&item.ID, &item.Name)
        if err != nil {
            log.Fatal(err)
        }
        items = append(items, item)
    }

    json.NewEncoder(w).Encode(items)
}

// get single item
func getItem(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id := params["id"]

    var item Item
    err := db.QueryRow("SELECT id, name FROM items WHERE id = $1", id).Scan(&item.ID, &item.Name)
    if err != nil {
        log.Fatal(err)
    }

    json.NewEncoder(w).Encode(item)
}

// create item
func createItem(w http.ResponseWriter, r *http.Request) {
    var item Item
    json.NewDecoder(r.Body).Decode(&item)

    _, err := db.Exec("INSERT INTO items (name) VALUES ($1)", item.Name)
    if err != nil {
        log.Fatal(err)
    }

    json.NewEncoder(w).Encode(item)
}

// update item
func updateItem(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id := params["id"]

    var item Item
    json.NewDecoder(r.Body).Decode(&item)

    _, err := db.Exec("UPDATE items SET name = $1 WHERE id = $2", item.Name, id)
    if err != nil {
        log.Fatal(err)
    }

    json.NewEncoder(w).Encode(item)
}

// delete item
func deleteItem(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id := params["id"]

    _, err := db.Exec("DELETE FROM items WHERE id = $1", id)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Fprintf(w, "Item %s deleted successfully", id)
}
