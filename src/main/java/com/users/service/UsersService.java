package com.users.service;

import com.users.model.User;

import java.util.List;
import java.util.Optional;

public interface UsersService {
    List<User> getUsers();
    Optional<User> getUserById(Long id);
    User saveUser(User user);
    User updateUser(User user, Long id);
    void deleteUser(Long id);
}
