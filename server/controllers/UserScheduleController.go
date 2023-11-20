package controllers

import (
	"context"
	"mediwatch/server/models"
	"mediwatch/server/views"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetAllUserSchedule(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	id := c.Param("id")
	objId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, views.UserView{Status: http.StatusBadRequest, Message: "Error", Data: err.Error()})
	}

	var user models.User

	err = userCollection.FindOne(ctx, bson.M{"id": objId}).Decode(&user)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, views.UserView{Status: http.StatusNotFound, Message: "Not Found", Data: err.Error()})
			return
		}

		c.JSON(http.StatusInternalServerError, views.UserView{Status: http.StatusInternalServerError, Message: "Error", Data: err.Error()})
		return
	}

	scheduleList := user.Schedule

	c.JSON(http.StatusOK, views.UserView{Status: http.StatusOK, Message: "success", Data: scheduleList})
}

func CreateUserSchedule(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	id := c.Param("id")
	objId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, views.UserView{Status: http.StatusBadRequest, Message: "Error ID", Data: err.Error()})
		return
	}

	var user models.User
	var schedule models.Schedule

	if err = c.BindJSON(&schedule); err != nil {
		c.JSON(http.StatusBadRequest, views.UserView{Status: http.StatusBadRequest, Message: "Error Bind", Data: err.Error()})
		return
	}

	if err := validate.Struct(&schedule); err != nil {
		c.JSON(http.StatusBadRequest, views.UserView{Status: http.StatusBadRequest, Message: "Error Valid", Data: err.Error()})
		return
	}

	update := bson.M{"id": primitive.NewObjectID(), "datetime": schedule.DateTime, "medications": schedule.Medications}

	result, err := userCollection.UpdateOne(ctx, bson.M{"id": objId}, bson.M{"$push": bson.M{"schedule": update}})
	if err != nil {
		c.JSON(http.StatusInternalServerError, views.UserView{Status: http.StatusInternalServerError, Message: "Error", Data: err.Error()})
		return
	}

	if result.MatchedCount == 1 {
		err := userCollection.FindOne(ctx, bson.M{"id": objId}).Decode(&user)

		if err != nil {
			c.JSON(http.StatusInternalServerError, views.UserView{Status: http.StatusInternalServerError, Message: "Error", Data: err.Error()})
			return
		}
	}

	scheduleList := user.Schedule

	c.JSON(http.StatusOK, views.UserView{Status: http.StatusOK, Message: "success", Data: scheduleList})
}
