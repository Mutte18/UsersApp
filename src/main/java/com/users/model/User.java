package com.users.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class User {

    private @Id
    @GeneratedValue
    Long id;

    private String name;

    private String email;

    private Integer age;

    public User() {}

    public User(String name, String email, Integer age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public boolean equals(Object object) {

        if (this == object)
            return true;
        if (!(object instanceof User))
            return false;
        User user = (User) object;
        return Objects.equals(this.id, user.id) && Objects.equals(this.name, user.name)
                && Objects.equals(this.age, user.age) && Objects.equals(this.email, user.email);
    }
}
