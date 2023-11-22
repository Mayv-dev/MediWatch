package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	Id          primitive.ObjectID `json:"id,omitempty"`
	Email       string             `json:"email,omitempty" validate:"required"`
	Password    string             `json:"password,omitempty"`
	Pillbox     Pillbox            `json:"pillbox,omitempty"`
	Medications []Medication       `json:"medications,omitempty"`
	Schedule    []Schedule         `json:"schedule,omitempty"`
	History     []History          `json:"history,omitempty"`
}
