package com.diamond.mapper;

import com.diamond.pojo.Team;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface TeamMapper {

    /*
    增加一个团队，创建新团队需要
    返回结果为插入条数，结果为0时插入失败
     */
    int createTeam(@Param("team")Team team);

    /*
    更新团队信息，只能修改团队名字，在考虑是否要采用map传参
     */
    int updateTeam(@Param("team")Team team);

    /*
    删除一个团队，解散团队用
     */
    int deleteTeam(@Param("teamID")String teamID);
}
