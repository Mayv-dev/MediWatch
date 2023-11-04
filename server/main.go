package main

import (
	"mediwatch/server/configs"
	"mediwatch/server/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	configs.ConnectDB()

	routes.UserRoute(router)

	router.Run("localhost:4000")
}
