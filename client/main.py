import RPi.GPIO as GPIO
>>> GPIO.setmode(GPIO.BCM)
>>> GPIO.setup(23,GPIO.IN,pull_up_down=GPIO.PUD_DOWN)
>>> print GPIO.input(23)
0
>>> print GPIO.input(23)
import schedule
import time

from client import *

def get_sensor_value():
    # dump your sensor pull logic
    return 45

def automatic_sensor_check():
    if get_sensor_value() < read_config()["sensor_type"]["automatic"]["threshold"] :
        data = create_data(sensor_id=read_config()["sensor_type"]["automatic"]["sensor_id"],
                           product_id=read_config()["product_id"],
                           client_id=read_config()["client_id"],
                           sensor_type="automatic")
        send_data(data=data)

schedule.every(30).seconds.do(automatic_sensor_check)

while True:
    schedule.run_pending()
    time.sleep(1)
