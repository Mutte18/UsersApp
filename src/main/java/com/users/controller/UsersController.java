package com.users.controller;

import com.users.exception.UserNotFoundException;
import com.users.model.User;
import com.users.model.UserRestModel;
import com.users.service.UsersService;
import io.swagger.annotations.Api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/api/")
@Api(value = "Users REST Endpoint", tags = "Users Info")

public class UsersController {
    private final Logger log = LoggerFactory.getLogger(UsersController.class);
    private UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserRestModel>> getUsers() {

        return ResponseEntity.ok().body(usersService.getUsers());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            Optional<UserRestModel> user = usersService.getUserById(id);
            return ResponseEntity.ok().body(user);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/user")
    public ResponseEntity<UserRestModel> createUser(@RequestBody UserRestModel user) throws URISyntaxException {
        log.info("Request to create user: {}", user);
        UserRestModel result = usersService.createUser(user);
        return ResponseEntity.created(new URI("/api/user/" + result.getId())).body(result);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<UserRestModel> updateUser(@RequestBody UserRestModel user, @PathVariable Long id) {
        try {
            log.info("Request to update user: {}", user);
            UserRestModel result = usersService.updateUser(user, id);
            return ResponseEntity.ok().body(result);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            log.info("Request to delete user: {}", id);
            usersService.deleteUser(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
