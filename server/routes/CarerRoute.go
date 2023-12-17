package routes

import (
	"mediwatch/server/controllers"

	"github.com/gin-gonic/gin"
)

func CarerRoute(router *gin.Engine) {
	router.POST("/carer", controllers.CreateCarer)
	router.GET("/carer/:id", controllers.GetCarer)
	router.GET("/carers", controllers.GetAllCarers)
	router.PUT("/carer/:id", controllers.UpdateCarer)
	router.DELETE("/carer/:id", controllers.DeleteCarer)
	router.POST("/carer/register", controllers.RegisterCarer)
	router.POST("/carer/login", controllers.LoginCarer)
}
