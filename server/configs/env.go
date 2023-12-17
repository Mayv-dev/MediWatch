package configs

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func GetMongoURI() string {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file.")
	}

	return os.Getenv("MONGODB_URI")
}

func GetPublishKey() string {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file.")
	}

	return os.Getenv(("PUBNUB_PUB_KEY"))
}

func GetSubscribeKey() string {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file.")
	}

	return os.Getenv(("PUBNUB_SUB_KEY"))
}

func GetChannel() string {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file.")
	}

	return os.Getenv(("PUBNUB_CHANNEL"))
}
