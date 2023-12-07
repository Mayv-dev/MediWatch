package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Pillbox struct {
	Id                 primitive.ObjectID `json:"id,omitempty"`
	NumberCompartments int                `json:"numbercompartments,omitempty"`
}
