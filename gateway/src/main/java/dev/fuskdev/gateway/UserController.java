package dev.fuskdev.gateway;

import org.springframework.core.env.Environment;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;


@Controller
public class UserController {
    @Autowired
    UserService userService;

    @QueryMapping
    public List<User> users() {
        return userService.getUsers();
    }

    @QueryMapping
    public User userById(@Argument String id) {
        return userService.getUserById(id);
    }

    @MutationMapping
    public List<User> deleteUserById(@Argument String id) {
        userService.deleteUserById(id);
        return userService.getUsers();
    }

    @MutationMapping
    public List<User> deleteUsersById(@Argument List<String> ids) {
        userService.deleteUsersById(ids);
        return userService.getUsers();
    }

    @MutationMapping
    public User addUser(@Argument String firstName, @Argument String lastName, @Argument String birthDate, @Argument String gender) {
        return  userService.addUser(firstName, lastName, birthDate, gender);
    }

    @MutationMapping
    public List<User> updateUserById(@Argument String id, @Argument String firstName, @Argument String lastName, @Argument String birthDate, @Argument String gender) {
        userService.updateUserById(id, firstName, lastName, birthDate, gender);
        return userService.getUsers();
    }


}
