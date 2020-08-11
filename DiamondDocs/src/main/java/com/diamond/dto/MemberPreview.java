package com.diamond.dto;

import com.diamond.pojo.DocUser;
import com.diamond.pojo.Member;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
* 成员类的简略信息
* 用于在获取成员列表时预览成员信息
*/

@Data
@NoArgsConstructor
public class MemberPreview {
    String userName;
    int userIdentity;
}
