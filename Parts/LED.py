import RPi.GPIO as GPIO

class LED:
    pin = -1


    def __init__(self, pin):
        self.pin = pin
        GPIO.setwarnings(False)
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(pin, GPIO.OUT)


    def on(self):
        if(self.pin == -1):
            return
        
        GPIO.output(self.pin, GPIO.HIGH)


    def off(self):
        if(self.pin == -1):
            return
        
        GPIO.output(self.pin, GPIO.LOW)
