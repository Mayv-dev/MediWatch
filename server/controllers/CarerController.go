package controllers

import (
	"context"
	"mediwatch/server/configs"
	"mediwatch/server/models"
	"mediwatch/server/views"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var carerCollection *mongo.Collection = configs.GetCollection(configs.DB, "Carers")

func CreateCarer(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var carer models.Carer

	if err := c.BindJSON(&carer); err != nil {
		c.JSON(http.StatusBadRequest, views.UserView{Status: http.StatusBadRequest, Message: "Error", Data: err.Error()})
		return
	}

	if err := validate.Struct(&carer); err != nil {
		c.JSON(http.StatusBadRequest, views.UserView{Status: http.StatusBadRequest, Message: "Error", Data: err.Error()})
		return
	}

	newCarer := models.Carer{
		Id:       primitive.NewObjectID(),
		Email:    carer.Email,
		Password: carer.Password,
	}

	result, err := carerCollection.InsertOne(ctx, newCarer)
	if err != nil {
		c.JSON(http.StatusInternalServerError, views.UserView{Status: http.StatusInternalServerError, Message: "Error", Data: err.Error()})
		return
	}

	c.JSON(http.StatusCreated, views.UserView{Status: http.StatusCreated, Message: "success", Data: result})
}

func GetCarer(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	id := c.Param("id")
	objId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, views.UserView{Status: http.StatusBadRequest, Message: "Error", Data: err.Error()})
		return
	}

	var carer models.Carer

	err = carerCollection.FindOne(ctx, bson.M{"id": objId}).Decode(&carer)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, views.UserView{Status: http.StatusNotFound, Message: "Not Found", Data: err.Error()})
			return
		}

		c.JSON(http.StatusInternalServerError, views.UserView{Status: http.StatusInternalServerError, Message: "Error", Data: err.Error()})
		return
	}

	c.JSON(http.StatusOK, views.UserView{Status: http.StatusOK, Message: "Success", Data: carer})
}

func GetAllCarers(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var carers []models.Carer

	results, err := carerCollection.Find(ctx, bson.M{})

	if err != nil {
		c.JSON(http.StatusInternalServerError, views.UserView{Status: http.StatusInternalServerError, Message: "Error", Data: err.Error()})
		return
	}

	defer results.Close(ctx)

	for results.Next(ctx) {
		var carer models.Carer

		if err = results.Decode(&carer); err != nil {
			c.JSON(http.StatusInternalServerError, views.UserView{Status: http.StatusInternalServerError, Message: "Error", Data: err.Error()})
			return
		}

		carers = append(carers, carer)
	}

	c.JSON(http.StatusOK, views.UserView{Status: http.StatusOK, Message: "Success", Data: carers})
}

func UpdateCarer(c *gin.Context) {
	id := c.Param("id")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var carer models.Carer

	objId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, views.UserView{Status: http.StatusBadRequest, Message: "Error", Data: err.Error()})
		return
	}

	if err = c.BindJSON(&carer); err != nil {
		c.JSON(http.StatusBadRequest, views.UserView{Status: http.StatusBadRequest, Message: "Error", Data: err.Error()})
		return
	}

	if err := validate.Struct(&carer); err != nil {
		c.JSON(http.StatusBadRequest, views.UserView{Status: http.StatusBadRequest, Message: "Error", Data: err.Error()})
		return
	}

	update := bson.M{"email": carer.Email, "password": carer.Password}

	result, err := carerCollection.UpdateOne(ctx, bson.M{"id": objId}, bson.M{"$set": update})
	if err != nil {
		c.JSON(http.StatusInternalServerError, views.UserView{Status: http.StatusInternalServerError, Message: "Error", Data: err.Error()})
		return
	}

	var updatedCarer models.Carer

	if result.MatchedCount == 1 {
		err := carerCollection.FindOne(ctx, bson.M{"id": objId}).Decode(&updatedCarer)

		if err != nil {
			c.JSON(http.StatusInternalServerError, views.UserView{Status: http.StatusInternalServerError, Message: "Error", Data: err.Error()})
			return
		}
	}

	c.JSON(http.StatusOK, views.UserView{Status: http.StatusOK, Message: "Updated", Data: updatedCarer})
}

func DeleteCarer(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	id := c.Param("id")
	objId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, views.UserView{Status: http.StatusBadRequest, Message: "Error", Data: err.Error()})
		return
	}

	result, err := carerCollection.DeleteOne(ctx, bson.M{"id": objId})
	if err != nil {
		c.JSON(http.StatusInternalServerError, views.UserView{Status: http.StatusInternalServerError, Message: "Error", Data: err.Error()})
		return
	}

	if result.DeletedCount < 1 {
		c.JSON(http.StatusNotFound, views.UserView{Status: http.StatusNotFound, Message: "Not Found", Data: "Matching id not found"})
		return
	}

	c.JSON(http.StatusOK, views.UserView{Status: http.StatusOK, Message: "Deleted", Data: "Carer deleted"})
}
