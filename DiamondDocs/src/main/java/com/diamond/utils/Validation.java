package com.diamond.utils;

public class Validation {

    public static boolean checkEmailFormat(String str){
        return str.matches("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$");
    }

    public static boolean checkPasswordFormat(String str){
        return str.matches("^(?!\\d*$|[a-z]*$|[A-Z]*$|\\W*$)[!-~]{6,18}$");
    }
}
