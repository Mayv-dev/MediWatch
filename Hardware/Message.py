import datetime

class Message:
    datetime: str
    compartment: int
    sensor: str
    isOpen: bool
    isEmpty: bool

    def __init__(self, compartment, sensor, isOpen: bool = False, isEmpty: bool = False) -> None:
        self.__get_time()
        self.compartment = compartment
        self.sensor = sensor
        self.isOpen = isOpen
        self.isEmpty = isEmpty
        

    def __get_time(self):
        self.datetime = datetime.datetime.now(tz=datetime.timezone.utc).replace(microsecond=0).isoformat()

    
    def to_json(self) ->str:
        string: str = '{"datetime":"'
        string += self.datetime
        string += '","compartment":'
        string += str(self.compartment)
        string += ',"sensor":"'
        string += self.sensor
        string += '","isopen":'
        string += str(self.isOpen).lower()
        string += ',"isempty":'
        string += str(self.isEmpty).lower()
        string += '}'

        return string