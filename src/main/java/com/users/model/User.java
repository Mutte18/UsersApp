package com.users.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private Integer age;

    public User(UserRestModel userRestModel) {
        this.name = userRestModel.getName();
        this.email = userRestModel.getEmail();
        this.age = userRestModel.getAge();
    }
}
