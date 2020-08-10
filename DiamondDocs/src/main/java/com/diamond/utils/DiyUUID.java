package com.diamond.utils;

import java.util.UUID;

public class DiyUUID {

    public static String generateUserID(){
        return UUID.randomUUID().toString()
                .replace("-","")
                .substring(0,8).toUpperCase();
    }

}
