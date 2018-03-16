import RPi.GPIO as GPIO
import schedule
import time

from client import *

def get_button_value():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(16, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
    return GPIO.input(16)

def manual_button_check():
    print "button value is "+str(get_button_value())

schedule.every(1).seconds.do(manual_button_check)

while True:
    schedule.run_pending()
    time.sleep(0.5)
