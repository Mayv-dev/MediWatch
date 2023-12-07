package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Event struct {
	DateTime    primitive.DateTime `json:"datetime,omitempty"`
	Compartment int                `json:"compartment,omitempty"`
	Sensor      string             `json:"sensor,omitempty"`
	IsOpen      bool               `json:"isopen,omitempty"`
	IsEmpty     bool               `json:"isempty,omitempty"`
}
