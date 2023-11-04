import RPi.GPIO as GPIO

class MicroSwitch:
    openPin = -1
    closedPin = -1


    def __init__(self, openPin, closedPin):
        self.openPin = openPin
        self.closedPin = closedPin


    def is_open(self) -> bool:
        if self.openPin == -1:
            return

        return GPIO.input(self.openPin)
    

    def is_closed(self) -> bool:
        if self.closedPin == -1:
            return
        
        return GPIO.input(self.closedPin)
    