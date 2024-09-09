# FuskDev

Fuskdev short for full stack development. A template for developing api and web containerized using sprint boot framework, GraphQL and react ui library.

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

The system is containerized in four parts: Database, USERSERV, GATEWAY and Web. Turnoff userserv-1, gateway-1 and web-1 in docker desktop container dashboard.

![dockercontainer](docs/dockercontainer.png?raw=true "Docker container")

### GATEWAY

- GATEWAY is [GraphQL](https://graphql.org/) based implemented in spring boot.
- Follow how to install [Java](https://www.java.com/en/download/) and [Gradle](https://gradle.org/install/) in your system.
- It's ideal to develop spring boot using intellij. Follow how to install [here](https://www.jetbrains.com/idea/download/).
- After successfull installation open the folder <strong>userserv</strong> in intellij and wait to finish sync process.
- Configure VM options in build process to use <strong>application-dev.properties</strong> containing USERSERV connection service.

  ```
  -Dspring.profiles.active=dev
  ```

  ![dev](docs/gatewaydevconfig.png?raw=true "Dev config")

- Alternatively you can use gradle command to run the API in terminal regardless which editor you use. In project root folder execute

  ```bash
  cd gateway/gradle
  ./gradlew bootRun --args='--spring.profiles.active=dev'
  ```

- GATEWAY depends its datasource from USERSERV and a necessary to be running.
- Test GATEWAY in browser by entering [localhost:8081/graphiql?path=/graphql](http://localhost:8081/graphiql?path=/graphql)

  ![api](docs/graphqltest.png?raw=true "API Test")

### USERSERV

- USERSERV is [REST](https://spring.io/guides/tutorials/rest) based implemented in spring boot.
- Follow how to install [Java](https://www.java.com/en/download/) and [Gradle](https://gradle.org/install/) in your system.
- It's ideal to develop spring boot using intellij. Follow how to install [here](https://www.jetbrains.com/idea/download/).
- After successfull installation open the folder <strong>userserv</strong> in intellij and wait to finish sync process.
- Configure VM options in build process to use <strong>application-dev.properties</strong> containing database connection service.

  ```
  -Dspring.profiles.active=dev
  ```

  ![dev](docs/userservdevconfig.png?raw=true "Dev config")

- Alternatively you can use gradle command to run the API in terminal regardless which editor you use. In project root folder execute

  ```bash
  cd userserv/gradle
  ./gradlew bootRun --args='--spring.profiles.active=dev'
  ```

- Test USERSERV in browser by entering [localhost:8080/api/user](http://localhost:8080/api/user)

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
