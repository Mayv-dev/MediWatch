import RPi.GPIO as GPIO

class ForceSensitiveResistor:
    pin = -1
    
    def __init__(self, pin) -> None:
        self.pin = pin
        GPIO.setwarnings(False)
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(pin, GPIO.IN)
        
    
    def is_on(self) -> bool:
        if(self.pin == -1):
            return
        
        return GPIO.input(self.pin)