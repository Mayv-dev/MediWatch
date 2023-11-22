package main

import (
	"mediwatch/server/configs"
	"mediwatch/server/pn"
	"mediwatch/server/routes"
	"sync"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var wg = &sync.WaitGroup{}

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

	pbnb := configs.ConnectPubnub()

	wg.Add(1)
	go pn.Listen(pbnb, wg)

	router.Run("localhost:4000")

	wg.Wait()
}
