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

	//Dev
	corsConfig.AllowOrigins = []string{"http://localhost:3000"}

	//Prod
	//corsConfig.AllowAllOrigins = true

	router.Use(cors.New(corsConfig))

	configs.ConnectDB()

	routes.UserRoute(router)
	routes.CarerRoute(router)
	routes.UserHistoryRoute(router)
	routes.UserScheduleRouter(router)
	routes.UserMedicationRouter(router)
	routes.UserEventRoute(router)

	pbnb := configs.ConnectPubnub()

	wg.Add(1)
	go pn.Listen(pbnb, wg)

	//Dev
	router.Run("localhost:4000")

	//Prod
	//router.RunTLS(":8080", "/etc/letsencrypt/live/mediwatch.online/cert.pem", " /etc/letsencrypt/live/mediwatch.online/privkey.pem")

	wg.Wait()
}
