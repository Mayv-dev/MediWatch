import subprocess

def main():
    subprocess.run(["echo disabled | sudo tee /sys/bus/usb/devices/usb1/power/wakeuo"], shell=True, capture_output=True, text=True)
    subprocess.run(["echo suspend | sudo tee /sys/bus/usb/devices/usb1/power/level"], shell=True, capture_output=True, text=True)
    subprocess.run(["echo disabled | sudo tee /sys/bus/usb/devices/usb2/power/wakeup"], shell=True, capture_output=True, text=True)
    subprocess.run(["echo suspend | sudo tee /sys/bus/usb/devices/usb2/power/level"], shell=True, capture_output=True, text=True)
   
    subprocess.run(["sudo reboot"], shell=True, capture_output=True, text=True)


if __name__ == "__main__":
    main()
