package routes

import (
	"mediwatch/server/controllers"

	"github.com/gin-gonic/gin"
)

func UserMedicationRouter(router *gin.Engine) {
	router.GET("/user/:id/medication", controllers.GetAllUserMedication)
	router.PUT("/user/:id/medication", controllers.CreateUserMedication)
	router.DELETE("/user/:id/medication/:mId", controllers.DeleteUserMedication)
}
