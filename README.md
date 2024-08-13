# FuskDev

Fuskdev short for full stack development. A template for developing api and web containerized using Spring Boot framework and React ui library.

## How to run

### Installing Build Tools

Follow Docker Desktop installation [Guide](https://www.docker.com/products/docker-desktop/)

### Starts the application

```bash
% docker compose up
```

Open browser and enter [localhost](http://localhost) in url bar. You will find the icon shown in default page that will lead to user management.

![dashboard](docs/alpha1.png?raw=true "Dashboard")

![userlist](docs/alpha2.png?raw=true "User List")

![usercreate](docs/alpha3.png?raw=true "User Create")

## Start Developing

The system is containerized in three parts: Database, API and Web. Turnoff API and Web in docker desktop container dashboard.

![dockercontainer](docs/dockercontainer.png?raw=true "Docker container")

### API

- Follow how to install [Java](https://www.java.com/en/download/) and [Gradle](https://gradle.org/install/) in your system.
- It's ideal to develop Spring Boot using intellij. Follow how to install [here](https://www.jetbrains.com/idea/download/).
- After successfull installation open the folder <strong>userserv</strong> in intellij and wait to finish sync process.
- Configure VM options in build process to use <strong>application-dev.properties</strong> containing database connection service.

  ```
  -Dspring.profiles.active=dev
  ```

  ![dev](docs/devconfig.png?raw=true "Dev config")

- Alternatively you can use gradle command to run the API in terminal regardless which editor you use. In project root folder execute

  ```bash
  cd userserv/gradle
  ./gradlew bootRun --args='--spring.profiles.active=dev'
  ```

- Test API in browser by entering [localhost:8080/api/user](http://localhost:8080/api/user)

  ![api](docs/apitest.png?raw=true "API Test")

### Web

- Follow how to install [node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

- Open folder web in your favorite editor.

- Execute npm command to run web application in project root folder

  ```bash
  cd web
  npm run start
  ```

- Test Web by entering [localhost:3000](http://localhost:3000)

  ![web](docs/alphadev1.png?raw=true "Web")
