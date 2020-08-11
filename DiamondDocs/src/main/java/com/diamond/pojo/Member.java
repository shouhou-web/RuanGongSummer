package com.diamond.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class Member {
    private String userID;
    private int userIdentity;
    private String teamID;
    private Date lastVisitTime;
}
