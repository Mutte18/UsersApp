package com.users.service;

import com.users.model.User;
import com.users.model.UserRestModel;

import java.util.List;
import java.util.Optional;

public interface UsersService {
    List<UserRestModel> getUsers();

    Optional<UserRestModel> getUserById(Long id);

    UserRestModel createUser(UserRestModel user);

    UserRestModel updateUser(UserRestModel user, Long id);

    void deleteUser(Long id);
}
