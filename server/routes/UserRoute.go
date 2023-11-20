package routes

import (
	"mediwatch/server/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoute(router *gin.Engine) {
	router.GET("/user/:id", controllers.GetUser)
	router.GET("/users", controllers.GetAllUsers)
	router.POST("/user", controllers.CreateUser)
	router.PUT("/user/:id", controllers.UpdateUser)
	router.DELETE("/user/:id", controllers.DeleteUser)
	router.POST("/user/register", controllers.RegisterUser)
	router.POST("/user/login", controllers.LoginUser)
}
