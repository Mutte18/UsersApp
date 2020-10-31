package com.users.service;

import com.users.model.User;
import com.users.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersServiceImpl implements UsersService {
    private UsersRepository usersRepository;

    @Autowired
    public UsersServiceImpl(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    public List<User> getUsers() {
        return usersRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return usersRepository.findById(id);
    }

    @Override
    public User createUser(User newUser) {
        return usersRepository.save(newUser);
    }

    @Override
    public User updateUser(User newUser, Long id) {
        return usersRepository.findById(id)
                .map(user -> {
                    user.setName(newUser.getName());
                    user.setAge(newUser.getAge());
                    user.setEmail(newUser.getEmail());
                    return usersRepository.save(user);
                })
                .orElseGet(() -> {
                    newUser.setId(id);
                    return usersRepository.save(newUser);
                });
    }

    @Override
    public void deleteUser(Long id) {
        usersRepository.deleteById(id);
    }
}
