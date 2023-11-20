import RPi.GPIO as GPIO
import time

class LED:
    pin = -1


    def __init__(self, pin) -> None:
        self.pin = pin
        GPIO.setwarnings(False)
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(pin, GPIO.OUT)


    def on(self) -> None:
        if(self.pin == -1):
            return
        
        GPIO.output(self.pin, GPIO.HIGH)


    def off(self) -> None:
        if(self.pin == -1):
            return
        
        GPIO.output(self.pin, GPIO.LOW)
        
    
    def flash(self, numberOfFlashes, delayInSeconds) -> None:
        if(self.pin == -1):
            return
        
        for i in range(0, numberOfFlashes):
            self.on()
            time.sleep(delayInSeconds)
            self.off()
            time.sleep(delayInSeconds)
            i = i+1
