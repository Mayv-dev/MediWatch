package pn

import (
	"fmt"
	"mediwatch/server/configs"
	"sync"

	pubnub "github.com/pubnub/go/v7"
)

func Listen(pbnb *pubnub.PubNub, wg *sync.WaitGroup) {
	defer wg.Done()
	listener := pubnub.NewListener()
	pbnb.AddListener(listener)
	pbnb.Subscribe().Channels([]string{configs.GetChannel()}).Execute()

	for {
		select {
		case status := <-listener.Status:
			switch status.Category {
			case pubnub.PNDisconnectedCategory:
				fmt.Println("Disconnected")

			case pubnub.PNConnectedCategory:
				fmt.Print("Connected to ")
				fmt.Println(pbnb.GetSubscribedChannels())

			case pubnub.PNReconnectedCategory:
				fmt.Println("Reconnected")

			case pubnub.PNAccessDeniedCategory:
				fmt.Println("Denied")
			}
		case message := <-listener.Message:
			HandleMessage(message)
		}
	}
}
