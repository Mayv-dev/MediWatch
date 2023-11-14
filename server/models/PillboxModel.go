package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Pillbox struct {
	Id           primitive.ObjectID `json:"id,omitempty"`
	Compartments []Compartment      `json:"compartments,omitempty"`
}
