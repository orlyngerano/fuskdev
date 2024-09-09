package dev.fuskdev.userserv.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.text.MessageFormat;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Repository
public class UserRepository {

    private static final Logger logger = LoggerFactory.getLogger(UserRepository.class);

    JdbcClient jdbcClient;

    UserRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    List<User> findAll() {
        return this.jdbcClient.sql("select * from \"User\"").query(User.class).list();
    }

    Optional<User> findById(Integer id) {
        return this.jdbcClient.sql("select * from \"User\" where id= :id").param("id", id).query(User.class).optional();
    }

    User create(User user) {
        var keyHolder = new GeneratedKeyHolder();

        var updated = this.jdbcClient
                .sql("insert into \"User\"(firstName,lastName,birthDate,gender) values(?,?,?,?) returning id").params(
                        List.of(user.firstName(), user.lastName(), user.birthDate(), user.gender().toString()))
                .update(keyHolder);

        var newUser = new User(Objects.requireNonNull(keyHolder.getKey()).intValue(),user.firstName(), user.lastName(), user.birthDate(), user.gender());

        Assert.state(updated == 1, MessageFormat.format("Failed to create {0}", user.firstName()));

        return newUser;
    }

    void update(User user, Integer id) {
        var updated = this.jdbcClient
                .sql("update \"User\" set firstName=?,lastName=?,birthDate=?,gender=? where id=?")
                .params(List.of(user.firstName(), user.lastName(), user.birthDate(), user.gender().toString(),
                        id))
                .update();

        Assert.state(updated == 1, MessageFormat.format("Failed to update {0}", user.firstName()));

    }

    void deleteById(Integer id) {
        var updated = this.jdbcClient.sql("delete from \"User\" where id=:id").param("id", id).update();

        Assert.state(updated == 1, MessageFormat.format("Failed to delete {0}", id));
    }

}
