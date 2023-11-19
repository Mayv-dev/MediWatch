package routes

import (
	"mediwatch/server/controllers"

	"github.com/gin-gonic/gin"
)

func CarerRoute(router *gin.Engine) {
	router.POST("/carer", controllers.CreateCarer)
}