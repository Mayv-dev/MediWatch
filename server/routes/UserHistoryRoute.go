package routes

import (
	"mediwatch/server/controllers"

	"github.com/gin-gonic/gin"
)

func UserHistoryRoute(router *gin.Engine) {
	router.GET("user/:id/history", controllers.GetAllUserHistory)
	router.PUT("user/:id/history", controllers.CreateUserHistory)
	router.DELETE("user/:id/history/:hId", controllers.DeleteUserHistory)
}
