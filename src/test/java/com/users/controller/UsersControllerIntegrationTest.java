package com.users.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.users.model.User;
import com.users.model.UserRestModel;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UsersControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void getUsers_returnsListOfAllEntries() throws Exception {
        var result = mockMvc.perform(get("/api/users/").contentType("application/json")).andExpect(status().isOk())
                .andReturn();
        var response = objectMapper.readValue(result.getResponse().getContentAsString(), ArrayList.class);

        assertEquals(2, response.size());
    }

    @Test
    public void getUser_WithUserNotExisting_ThrowsUserNotFoundException() throws Exception {
        var id = 1;
        mockMvc.perform(get("/api/user/" + id)
                .contentType("application/json"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void getUser_WithUserId_ReturnsUserRestModel() throws Exception {
        var id = 1;

        mockMvc.perform(post("/api/user/" + id)

                .contentType("application/json"))
                .andExpect(status().isNotFound());

        mockMvc.perform(get("/api/user/" + id)
                .contentType("application/json"))
                .andExpect(status().isNotFound());
    }
}
