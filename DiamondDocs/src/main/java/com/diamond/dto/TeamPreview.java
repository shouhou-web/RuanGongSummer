package com.diamond.dto;

import lombok.Data;

/*
* 团队类的简略信息
* 用于在团队空间中预览团队列表
*/
@Data
public class TeamPreview {
    String teamID;
    String teamName;
}
