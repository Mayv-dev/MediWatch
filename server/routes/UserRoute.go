package routes

import (
	"mediwatch/server/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoute(router *gin.Engine) {
	router.GET("/users", controllers.GetAllUsers)
	router.POST("/user", controllers.CreateUser)
}
