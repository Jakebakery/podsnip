package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"net/http"

	/*
		firebase "firebase.google.com/go"


		"google.golang.org/api/option"
	*/
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var collection *mongo.Collection

type Snippet struct {
 
	Url   			string             `json:"url,omitempty"`
	Caption 		string             `json:"caption,omitempty"`
	PodcastName 	string             `json:"podcastName,omitempty"`
	PodcastLink 	string             `json:"podcastLink,omitempty"`
  
}

func initializeDb() {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://podsnip:podsnip@cluster1.ogp4o.mongodb.net/podsnipdb?retryWrites=true&w=majority"))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	collection = client.Database("podsnipdb").Collection("snippets")

	fmt.Println(" Connected ")
}

func createSnippet(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With")
	var snippet Snippet
	err := json.NewDecoder(r.Body).Decode(&snippet)
	fmt.Println(r.Body)
	if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
	res, err := collection.InsertOne(context.Background(), snippet)
	if err != nil {
		fmt.Println(err)
		return
	}
	json.NewEncoder(w).Encode(res)
	w.WriteHeader(http.StatusOK)
}

func main() {
	initializeDb()
	router := mux.NewRouter()
	router.HandleFunc("/snippet", createSnippet).Methods("POST", "OPTIONS")
	http.Handle("/", router)
	log.Fatal(http.ListenAndServe(":8080", router))	
}
