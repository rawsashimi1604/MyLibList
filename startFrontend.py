import multiprocessing
import os
import sys

def startFrontendApplication():
  try:
    os.chdir("client");
    os.system("docker build -t docker_nextjs:developement .");
    os.system("docker stop client");
    os.system("docker rm client");
    os.system("docker run --publish 3000:3000 --name client docker_nextjs:developement");
  except KeyboardInterrupt:
    print("Stopping Frontend Application")
    sys.exit(0)


if __name__ == '__main__':
    p1 = multiprocessing.Process(name='p1', target=startFrontendApplication)
    p1.start()



