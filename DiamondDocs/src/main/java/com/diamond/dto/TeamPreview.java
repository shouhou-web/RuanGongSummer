package com.diamond.dto;

import com.diamond.pojo.Team;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/*
* 团队类的简略信息
* 用于在团队空间中预览团队列表
*/
@Data
@NoArgsConstructor
public class TeamPreview {
    String teamID;
    String teamName;

    public TeamPreview(Team team){
        this.teamID = team.getTeamID();
        this.teamName = team.getTeamName();
    }

    public static List<TeamPreview> getPreviewList(List<Team> teamList){
        List<TeamPreview> list = new ArrayList<>();
        for (Team team : teamList)
            list.add(new TeamPreview(team));
        return list;
    }
}
