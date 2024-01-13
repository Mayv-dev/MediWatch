package pn

import (
	"context"
	"fmt"
	"mediwatch/server/controllers"
	"mediwatch/server/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func UpdateSchedule() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var user models.User

	err := userCollection.FindOne(ctx, bson.M{"id": controllers.LoggedInUser}).Decode(&user)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	schedule := user.Schedule
	times := "{"

	for _, s := range schedule {
		times += s.DateTime.Time().String()
	}

	msg := "Message:{Type:Schedule, Times:{" + times + "}"

	AddMessageToQueue(msg)
}
