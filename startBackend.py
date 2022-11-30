import multiprocessing
import os
import sys

def startBackendApplicationAndDatabases():
  try:
    os.chdir("server");
    os.system("npm run docker:dev");
  except KeyboardInterrupt:
    print("Stopping Backend and Databases...")
    sys.exit(0)


if __name__ == '__main__':
    p1 = multiprocessing.Process(name='p1', target=startBackendApplicationAndDatabases)
    p1.start()



