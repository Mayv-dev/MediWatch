package controllers

import (
	"context"
	"mediwatch/server/configs"
	"mediwatch/server/models"
	"mediwatch/server/views"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
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