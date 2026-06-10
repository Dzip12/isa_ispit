package com.example.isa.services;

import com.example.isa.models.UserModel;
import com.example.isa.models.UserPageModel;
import com.example.isa.models.UserProductsModel;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface IUserService{
    List<UserModel> findAll();
    UserPageModel findPagedList(PageRequest pageRequest);
    UserModel create(UserModel model);
    UserModel update(UserModel model);
    void delete(Integer id);
    List<UserProductsModel> findUserProductsAll();
}
