package main

import (
	"mediwatch/server/configs"
	"mediwatch/server/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:3000"}

	router.Use(cors.New(corsConfig))

	configs.ConnectDB()

	routes.UserRoute(router)
	routes.CarerRoute(router)
	routes.UserHistoryRoute(router)
	routes.UserScheduleRouter(router)
	routes.UserMedicationRouter(router)

	router.Run("localhost:4000")
}
