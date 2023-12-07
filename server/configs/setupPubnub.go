package configs

import pubnub "github.com/pubnub/go/v7"

func ConnectPubnub() *pubnub.PubNub {
	config := pubnub.NewConfigWithUserId("MediwatchServer")
	config.PublishKey = GetPublishKey()
	config.SubscribeKey = GetSubscribeKey()

	return pubnub.NewPubNub(config)
}
