package com.users.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@NoArgsConstructor
@Data
public class UserRestModel {
    private Long id;

    @NotNull
    @Size(min = 2)
    private String name;
    @NotNull
    @Size(min = 5)
    private String email;

    @Size(min = 1, max = 100)
    @NotNull
    private Integer age;

    public UserRestModel(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.age = user.getAge();
    }
}
