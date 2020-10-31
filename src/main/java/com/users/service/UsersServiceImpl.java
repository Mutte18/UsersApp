package com.users.service;

import com.users.exception.UserNotFoundException;
import com.users.model.User;
import com.users.model.UserRestModel;
import com.users.repository.UsersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsersServiceImpl implements UsersService {
    private UsersRepository usersRepository;
    private final ModelMapper modelMapper = new ModelMapper();


    @Autowired
    public UsersServiceImpl(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    public List<UserRestModel> getUsers() {
        List<User> result = usersRepository.findAll();
        return result.stream()
                .map(user -> modelMapper.map(user, UserRestModel.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<UserRestModel> getUserById(Long id) {
        Optional<User> result = usersRepository.findById(id);

        if (result.isEmpty()) {
            throw new UserNotFoundException("No user with id: " + id + " was found");
        }
        UserRestModel userRestModel = new UserRestModel(result.get());
        return Optional.of(userRestModel);
    }

    @Override
    public UserRestModel createUser(UserRestModel userRestModel) {
        User user = new User(userRestModel);
        usersRepository.save(user);

        userRestModel.setId(user.getId());
        return userRestModel;
    }

    @Override
    public UserRestModel updateUser(UserRestModel userRestModel, Long id) {

        Optional<User> user = usersRepository.findById(id);
        if (user.isEmpty()) {
            throw new UserNotFoundException("No user with id: " + id + " was found");
        }
        User updateUser = user.get();
        updateUser.setEmail(userRestModel.getEmail());
        updateUser.setAge(userRestModel.getAge());
        updateUser.setEmail(userRestModel.getEmail());
        usersRepository.save(updateUser);
        userRestModel.setId(user.get().getId());

        return userRestModel;
    }

    @Override
    public void deleteUser(Long id) {
        Optional<User> user = usersRepository.findById(id);
        if (user.isEmpty()) {
            throw new UserNotFoundException("No user with id: " + id + " was found");
        }
        usersRepository.deleteById(id);
    }
}
