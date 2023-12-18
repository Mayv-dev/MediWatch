package configs

import (
	"errors"

	pubnub "github.com/pubnub/go/v7"
	"github.com/pubnub/go/v7/crypto"
)

func ConnectPubnub() (*pubnub.PubNub, error) {
	config := pubnub.NewConfigWithUserId("MediwatchServer")
	config.PublishKey = GetPublishKey()
	config.SubscribeKey = GetSubscribeKey()
	config.Secure = true

	cm, err := crypto.NewAesCbcCryptoModule(GetPNCipherKey(), true)
	if err != nil {
		return pubnub.NewPubNub(config), errors.New("pubnub init")
	}

	config.CryptoModule = cm

	return pubnub.NewPubNub(config), nil
}
