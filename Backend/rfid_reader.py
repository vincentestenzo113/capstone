import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522

reader = SimpleMFRC522()

def read_rfid():
    try:
        print("Place your RFID card near the reader")
        rfid, text = reader.read()
        print(f"RFID detected: {rfid}")
        return rfid
    except Exception as e:
        print(f"Error reading RFID: {e}")
        return None
    finally:
        GPIO.cleanup()

def handle_enter(rfid):
    # Simulate logic to handle RFID entry (can be enhanced for real database or logic)
    print(f"Vehicle with RFID {rfid} entering")
    return {"rfid": rfid}

def handle_exit(rfid):
    # Simulate logic to handle RFID exit
    print(f"Vehicle with RFID {rfid} exiting")
    return {"rfid": rfid}
