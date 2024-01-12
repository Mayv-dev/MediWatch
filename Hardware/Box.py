from Parts.MicroSwitch import MicroSwitch
from PubNubConnection import PubNubConnection
import time
from Message import Message

class Box:
    switch1: MicroSwitch
    pubnub: PubNubConnection

    def __init__(self) -> None:
        self.switch1 = MicroSwitch(40, 38)
        self.pubnub = PubNubConnection()

    def run(self):
        while(True):
            if(self.switch1.is_open()):
                self.pubnub.publish(
                    (Message(0, 'switch', True).to_json())
                )
            time.sleep(5)