package routes

import (
	"mediwatch/server/controllers"

	"github.com/gin-gonic/gin"
)

func UserEventRoute(router *gin.Engine) {
	router.GET("/user/:id/events", controllers.GetAllUserEvents)
}
