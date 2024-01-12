package pn

import (
	"context"
	"fmt"
	"mediwatch/server/controllers"
	"mediwatch/server/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const HOUR_IN_NANOSECONDS = 3600000000000

func CheckUpdate() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var user models.User

	err := userCollection.FindOne(ctx, bson.M{"id": controllers.LoggedInUser}).Decode(&user)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	schedule := user.Schedule[0]
	events := user.Events

	if len(events) < 2 {
		return
	}

	lastEvent := events[len(events)-1]
	secondLastEvent := events[len(events)-2]

	if !lastEvent.IsOpen && secondLastEvent.IsOpen {
		if lastEvent.Compartment != schedule.Compartment {
			//TODO wrong compartment
			return
		}

		time := lastEvent.DateTime.Time()
		scheduleTime := schedule.DateTime.Time()

		//Taken outside hour before or hour after schedule
		if !(time.After(scheduleTime) && scheduleTime.Sub(time) < HOUR_IN_NANOSECONDS) || !(time.Before(scheduleTime) && time.Sub(scheduleTime) < HOUR_IN_NANOSECONDS) {
			//TODO wrong time
			return
		}

		//Delete schedule item

		update := bson.M{"id": schedule.Id}

		_, err := userCollection.UpdateOne(ctx, bson.M{"id": user.Id}, bson.M{"$pull": bson.M{"schedule": update}})
		if err != nil {
			fmt.Println(err.Error())
			return
		}

		//Update History
		update = bson.M{
			"id":          primitive.NewObjectID(),
			"datetime":    lastEvent.DateTime,
			"taken":       true,
			"medications": schedule.Medications,
		}

		_, err = userCollection.UpdateOne(ctx, bson.M{"id": user.Id}, bson.M{"$push": bson.M{"history": update}})
		if err != nil {
			fmt.Println(err.Error())
			return
		}
	}
}
