package pn

import (
	"context"
	"encoding/json"
	"fmt"
	"mediwatch/server/configs"
	"mediwatch/server/controllers"
	"mediwatch/server/models"
	"time"

	pubnub "github.com/pubnub/go/v7"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var userCollection *mongo.Collection = configs.GetCollection(configs.DB, "Users")

func HandleMessage(message *pubnub.PNMessage) {
	jsonStr := message.Message.(string)
	event := &models.Event{}
	err := json.Unmarshal([]byte(jsonStr), event)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var user models.User

	update := bson.M{
		"datetime":    event.DateTime,
		"compartment": event.Compartment,
		"sensor":      event.Sensor,
		"isopen":      event.IsOpen,
		"isempty":     event.IsEmpty,
	}

	result, err := userCollection.UpdateOne(ctx, bson.M{"id": controllers.LoggedInUser}, bson.M{"$push": bson.M{"events": update}})
	if err != nil {
		fmt.Println(err.Error())
	}

	if result.MatchedCount == 1 {
		err := userCollection.FindOne(ctx, bson.M{"id": controllers.LoggedInUser}).Decode(&user)

		if err != nil {
			fmt.Println(err.Error())
			return
		}
	}
}
