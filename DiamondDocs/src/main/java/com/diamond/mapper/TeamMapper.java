package com.diamond.mapper;

import com.diamond.pojo.Team;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Mapper
@Repository
public interface TeamMapper {

    /*
    增加一个团队，创建新团队需要
    返回结果为插入条数，结果为0时插入失败
     */
    int createTeam(@Param("team") Team team);

    /*
    更新团队信息，只能修改团队名字
    使用map传参，key分别为teamID和teamName
     */
    int updateTeam(@Param("map") Map<String, Object> map);

    /*
    删除一个团队，解散团队用
     */
    int deleteTeam(@Param("teamID") String teamID);
}
