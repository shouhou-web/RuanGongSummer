package com.diamond.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class Doc
{
    private String docID;
    private String docContent;
    private String docTitle;
    private String teamID;
    private String creatorID;
    private Date createTime;
    private int editState;
    private int isOpen;
    private int isDeleted;

}
