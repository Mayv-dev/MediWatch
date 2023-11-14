package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Schedule struct {
	Id          primitive.ObjectID `json:"id,omitempty"`
	DateTime    primitive.DateTime `json:"datetime,omitempty"`
	Compartment Compartment        `json:"compartment,omitempty"`
	Medications []Medication       `json:"medications,omitempty"`
}
