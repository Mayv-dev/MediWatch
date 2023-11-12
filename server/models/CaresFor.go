package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type CaresFor struct {
	Id               primitive.ObjectID `json:"id,omitempty"`
	AllNotifications bool               `json:"allnotifications,omitempty"`
	User             User               `json:"user,omitempty"`
}
