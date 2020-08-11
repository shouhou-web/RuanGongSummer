package com.diamond.utils;

import java.util.UUID;

public class DiyUUID {

    public static String generateUserID(){
        return UUID.randomUUID().toString()
                .replace("-","")
                .substring(0,8).toUpperCase();
    }

    public static String generateTeamID(){
        return UUID.randomUUID().toString()
                .replace("-","")
                .substring(0,5).toUpperCase();
    }

    public static String generateDocID(){
        return UUID.randomUUID().toString()
                .replace("-","")
                .substring(0,10).toUpperCase();
    }

}
