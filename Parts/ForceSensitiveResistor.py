import RPi.GPIO as GPIO

class ForceSensitiveResistor:
    pin = -1
    
    def __init__(self, pin):
        self.pin = pin
        
    
    def is_on(self):
        return GPIO.input(self.pin)