import RPi.GPIO as GPIO
import schedule
import time

from client import *


def get_sensor_value():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(23, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
    return GPIO.input(23)

def automatic_sensor_check():
    print "sensor value is "+str(get_sensor_value())
    if get_sensor_value() == read_config()["sensor_type"]["automatic"]["alert_thresold"]:
        data = create_data(sensor_id=read_config()["sensor_type"]["automatic"]["sensor_id"],
                           product_id=read_config()["product_id"],
                           client_id=read_config()["client_id"],
                           sensor_type="automatic")
        print "sending .. sensor value " + str(get_sensor_value())
        send_data(data=data)

def get_button_value():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(16, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
    return GPIO.input(16)

def manual_button_check():
    print "button value is "+str(get_button_value())
    if get_button_value() == read_config()["sensor_type"]["manual"]["alert_thresold"]:
        data = create_data(sensor_id=read_config()["sensor_type"]["manual"]["sensor_id"],
                           product_id=read_config()["product_id"],
                           client_id=read_config()["client_id"],
                           sensor_type="manual")
        print "sending .. button value " + str(get_sensor_value())
        send_data(data=data)

schedule.every(30).seconds.do(automatic_sensor_check)
schedule.every(1).seconds.do(manual_button_check)

while True:
    schedule.run_pending()
    time.sleep(0.5)
