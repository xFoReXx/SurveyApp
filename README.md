# AnkieteX

AnkieteX is a fun application that allows you to create surveys. Below are the instructions for installing and running the project.

## Installation Instructions

### 1. Requirements
- **Node.js** (version 18.x or higher)  
  You can download it from: [https://nodejs.org/](https://nodejs.org/).
  
- **Docker**  
  Follow the installation instructions here: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/).

### 2. Clone the repository and run the application

1. **Clone the repository**
    ```bash
    git clone https://gitlab.com/MateuszGarbina/ankietex.git
    ```

2. **Navigate to the project directory**
    ```bash
    cd ankietex
    ```

3. **Configure the `.env.local` file**  
   Create the `.env.local` file and add your "magic code."

4. **Launch Docker Desktop**  
   Make sure Docker is running on your machine.

5. **Run the application using Docker Compose**  
    ```bash
    docker-compose up --build
    ```

### 3. Access the application

Once the process is complete, the application will be available at:  
[localhost:3000](http://localhost:3000)

### 4. Stopping the application

To stop the application, simply run the following command:  
```bash
docker-compose down
