package dev.fuskdev.gateway;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON;

@Component
public class UserService {
    @Value("${userservice.uri}")
    private String baseURI;

    public List<User> getUsers(){
        var restClient = RestClient.create();
        return restClient.get().uri(String.format("%s/user",baseURI))
                .accept(APPLICATION_JSON)
                .retrieve().body((Class<List<User>>)(Object)List.class);
    }

    public User getUserById(String id){
        var restClient = RestClient.create();
        return restClient.get().uri(String.format("%s/user/%s",baseURI,id))
                .accept(APPLICATION_JSON)
                .retrieve().body(User.class);
    }

    public void deleteUserById(String id){
        var restClient = RestClient.create();
        restClient.delete().uri(String.format("%s/user/%s",baseURI,id)).retrieve()
                .toBodilessEntity();
    }

    public void deleteUsersById(List<String> ids){
        var restClient = RestClient.create();
        ids.forEach((id)->{
            restClient.delete().uri(String.format("%s/user/%s",baseURI,id)).retrieve()
                    .toBodilessEntity();
        });

    }

    public User addUser(String firstName, String lastName, String birthDate, String gender){
        var restClient = RestClient.create();
        var birthDateObject = LocalDateTime.parse(birthDate);
        var user = new User(0, firstName, lastName, birthDateObject, Gender.valueOf(gender));
        return restClient.post().uri(String.format("%s/user",baseURI)).contentType(APPLICATION_JSON).body(user).retrieve().body(User.class);
    }

    public void updateUserById(String id, String firstName, String lastName, String birthDate, String gender){
        var restClient = RestClient.create();
        var birthDateObject = LocalDateTime.parse(birthDate);
        var user = new User(0, firstName, lastName, birthDateObject, Gender.valueOf(gender));
        restClient.put().uri(String.format("%s/user/%s",baseURI,id)).contentType(APPLICATION_JSON).body(user).retrieve()
                .toBodilessEntity();
    }

}
