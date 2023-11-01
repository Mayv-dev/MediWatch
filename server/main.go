package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/", getHello)

	router.Run("localhost:4000")
}

func getHello(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"data": "Hello",
	})
}
