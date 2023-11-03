package main

import (
	"mediwatch/server/configs"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	configs.ConnectDB()

	router.Run("localhost:4000")
}
