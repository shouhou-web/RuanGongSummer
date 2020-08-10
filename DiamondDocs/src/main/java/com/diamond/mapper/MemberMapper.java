package com.diamond.mapper;

import com.diamond.pojo.Member;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Mapper
@Repository
public interface MemberMapper {

    /*
    添加一个成员
     */
    int addMember(@Param("member") Member member);

    /*
    返回和userID对应用户同组的总人数
     */
    int getCollaboratorNum(@Param("userID") String userID);

    /*
    修改用户身份
    用map进行传参，key分别为userID和userIdentity
     */
    int updateDocUserIdentity(@Param("map") Map<String, Object> map);
}
