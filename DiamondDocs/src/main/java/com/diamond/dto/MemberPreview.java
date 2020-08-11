package com.diamond.dto;

import lombok.Data;

/*
* 成员类的简略信息
* 用于在获取成员列表时预览成员信息
*/

@Data
public class MemberPreview {
    String userName;
    int userIdentity;
}
