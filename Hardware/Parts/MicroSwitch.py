import RPi.GPIO as GPIO

class MicroSwitch:
    openPin = -1
    closedPin = -1


    def __init__(self, openPin, closedPin) -> None:
        self.openPin = openPin
        self.closedPin = closedPin
        GPIO.setwarnings(False)
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(openPin, GPIO.IN)
        GPIO.setup(closedPin, GPIO.IN)


    def is_open(self) -> bool:
        if self.openPin == -1:
            return

        return GPIO.input(self.openPin)
    

    def is_closed(self) -> bool:
        if self.closedPin == -1:
            return
        
        return GPIO.input(self.closedPin)
    