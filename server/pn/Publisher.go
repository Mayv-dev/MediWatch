package pn

import (
	"container/list"
	"mediwatch/server/configs"
	"sync"

	pubnub "github.com/pubnub/go/v7"
)

var messageQueue = list.New().Init()

func Publish(pbnb *pubnub.PubNub, wg *sync.WaitGroup) {
	defer wg.Done()
	channel := configs.GetChannel()

	for {
		if messageQueue.Len() > 0 {
			pbnb.Publish().Channel(channel).Message(messageQueue.Front().Value).Execute()
			messageQueue.Remove(messageQueue.Front())
		}
	}
}

func AddMessageToQueue(msg string) {
	message := map[string]interface{}{
		"msg": msg,
	}
	messageQueue.PushBack(message)
}
