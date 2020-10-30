package com.users.controller;

import com.users.model.User;
import com.users.service.UsersService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/users/")
@Api(value = "Users REST Endpoint", tags = "Users Info")

public class UsersController {
    private UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping
    public List<User> getUsers() {
        return usersService.getUsers();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return usersService.getUserById(id);
    }

    @PostMapping
    public User storeUser(@RequestBody User newUser) {
        return usersService.saveUser(newUser);
    }

    @PutMapping
    public User updateUser(@RequestBody User user, @PathVariable Long id) {
        return usersService.updateUser(user, id);
    }

    @DeleteMapping("/{id}")
    void deleteUser(@PathVariable Long id) {
        usersService.deleteUser(id);
    }
}
