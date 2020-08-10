package com.diamond.mapper;

import com.diamond.pojo.DocUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface DocUserMapper {

    /*
    增加一个新用户，注册需要
    返回结果为插入条数，结果为0时插入失败
     */
    int addDocUser(@Param("docUser") DocUser docUser);

    /*
    根据UserName获取用户所有信息*
    返回一个DocUser
     */
    List<DocUser> getDocUserByUserName(@Param("userName") String userName);

    /*
    根据邮箱地址获取用户所有信息*
    返回一个DocUser
     */
    DocUser getDocUserByEmailAddress(@Param("emailAddress") String emailAddress);

    /*
    根据ID获取用户所有信息
    返回一个DocUser
     */
    DocUser getUserByID(@Param("userID") String userID);

    /*
    修改用户信息
    返回结果为更新行数，结果为0时更新失败
    只更新UserName,UserPassword,ImagePath,EmailAddress四个参数，而且会将四个参数对应的值全部置为传入参数中对应属性的值
    对修改单属性不方便，需要先获取原DocUser对象并将其中不修改的属性值输入到传入参数的对应属性中
     */
    int updateDocUser(@Param("docUser") DocUser docUser);

}
