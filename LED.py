import RPi.GPIO as GPIO

class LED:
    pin = -1


    def __init__(self, pin):
        self.pin = pin


    def on(self):
        if(self.pin == -1):
            return
        
        GPIO.output(self.pin, GPIO.HIGH)


    def off(self):
        if(self.pin == -1):
            return
        
        GPIO.output(self.pin, GPIO.LOW)
