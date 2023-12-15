from datetime import datetime, date, timedelta
from dateutil.relativedelta import relativedelta, MO

class ScheduleList:
    times: dict[int, int]
    

    def __init__(self) -> None:
        self.times = {}


    def clear_medication(self) -> None:
        self.times.clear()

    
    def add_medication(self, time: datetime, box: int):
        delta = self.__datetime_to_seconds(time)
        self.times[delta] = box
        print(delta)

    
    def is_medication_due(self) -> bool:
        now = self.__datetime_to_seconds(datetime.now())
        nearest = min(self.times, key = lambda x:(abs(x - now)))
        
        #If nearest medication is in the future
        if nearest > now:
            return False
        
        #Up to hour and 1/2 to take medication
        maxGap = 90 * 60
        if now - nearest > maxGap:
            return False

        return True

    
    @staticmethod
    def __datetime_to_seconds(time: datetime):
        return ((time.weekday() * 24 + time.hour) * 60 + time.minute) * 60 + time.second



