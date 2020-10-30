package com.users.repository;

import com.users.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsersRepository extends JpaRepository<User, Long> {
}
