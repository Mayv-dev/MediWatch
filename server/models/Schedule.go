package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Schedule struct {
	Id          primitive.ObjectID   `json:"id,omitempty"`
	DateTime    primitive.DateTime   `json:"datetime,omitempty"`
	Compartment primitive.ObjectID   `json:"compartment,omitempty"`
	Medications []primitive.ObjectID `json:"medications,omitempty"`
}
