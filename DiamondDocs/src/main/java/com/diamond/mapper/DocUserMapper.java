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
    使用map传参，key分别为userID和userName
     */
    int updateDocUserName(@Param("map") Map<String, Object> map);

    /*
    修改用户信息
    返回结果为更新行数，结果为0时更新失败
    使用map传参，key分别为userID和userPassword
     */
    int updateDocUserPassword(@Param("map") Map<String, Object> map);

    /*
    修改用户信息
    返回结果为更新行数，结果为0时更新失败
    使用map传参，key分别为userID和mobile
     */
    int updateDocUserMobile(@Param("map") Map<String, Object> map);

    /*
    修改用户信息
    返回结果为更新行数，结果为0时更新失败
    使用map传参，key分别为userID和emailAddress
     */
    int updateDocUserEmailAddress(@Param("map") Map<String, Object> map);

    /*
    修改用户信息
    返回结果为更新行数，结果为0时更新失败
    使用map传参，key分别为userID和imagePath
     */
    int updateDocUserImagePath(@Param("map") Map<String, Object> map);

}
