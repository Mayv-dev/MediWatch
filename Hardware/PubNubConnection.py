import os
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub
from dotenv import load_dotenv

class PubNubConnection:
    pubnub: PubNub

    def __init__(self) -> None:
        load_dotenv()
        pnconfig = PNConfiguration()
        pnconfig.subscribe_key = os.getenv('SUBSCRIBE_KEY')
        pnconfig.publish_key = os.getenv('PUBLISH_KEY')
        pnconfig.user_id = "Testing"
        self.pubnub = PubNub(pnconfig)

    def publish(self, message: str) -> str:
        self.pubnub.publish() \
        .channel(os.getenv('PUBNUB_CHANNEL')) \
        .message(message). \
        pn_async(self.__publishCallback)


    def __publishCallback(self, result, status):
        if status.is_error():
            return "Error"
        
        return "Success"
