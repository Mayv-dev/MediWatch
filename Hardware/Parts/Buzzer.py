import RPi.GPIO as GPIO
import time

class Buzzer:
    pin = -1
    
    def __init__(self, pin):
        self.pin = pin
        GPIO.setwarnings(False)
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(pin, GPIO.OUT)
        
        
    def buzz(self, numberOfBuzzes, pauseInSeconds, lengthOfBuzz=None):
        if(lengthOfBuzz == None):
            lengthOfBuzz = pauseInSeconds
        
        for i in range(0, numberOfBuzzes):
            GPIO.output(self.pin, True)
            time.sleep(lengthOfBuzz)
            GPIO.output(self.pin,True)
            time.sleep(pauseInSeconds)
            