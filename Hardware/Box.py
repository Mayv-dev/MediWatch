from Parts.MicroSwitch import MicroSwitch
from PubNubConnection import PubNubConnection
import time

class Box:
    switch1: MicroSwitch
    pubnub: PubNubConnection

    def __init__(self) -> None:
        self.switch1 = MicroSwitch(40, 38)
        self.pubnub = PubNubConnection()

    def run(self):
        while(True):
            if(self.switch1.is_open()):
                print(self.pubnub.publish("Box 1 is open"))
            time.sleep(5)