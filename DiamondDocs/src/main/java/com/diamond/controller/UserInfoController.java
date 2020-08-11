package com.diamond.controller;

import com.diamond.pojo.DocUser;
import com.diamond.service.UserInfoService;
import com.diamond.utils.MailClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*",maxAge = 3600)
public class UserInfoController {

    @Autowired
    private MailClient mailClient;
    @Autowired
    private UserInfoService userInfoService;

    @RequestMapping("/emailVerification")
    public int emailVerification(@RequestParam("emailAddress") String emailAddress){
        try {
            int verificationCode = mailClient.generateVerificationCode();
            mailClient.sendEmailVerificationCode(emailAddress, verificationCode);
            return verificationCode;
        }
        catch (Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("/signUp")
    public int signUp(@RequestParam("name") String name, @RequestParam("emailAddress") String emailAddress,
                      @RequestParam("password") String password, @RequestParam("password2") String password2){
        try {
            return userInfoService.signUp(name,emailAddress,password,password2);
        }
        catch (Exception e){
            e.printStackTrace();
            return 5;
        }
    }

    @RequestMapping("/login")
    public DocUser login(@RequestParam("name") String name, @RequestParam("password") String password){
        try {
            return userInfoService.login(name,password);
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping("/resetPwd")
    public int resetPwd(@RequestParam("emailAddress") String emailAddress, @RequestParam("password") String password,
                        @RequestParam("password2") String password2) {
        try {
            return userInfoService.resetPwd(emailAddress, password, password2);
        }
        catch (Exception e){
            e.printStackTrace();
            return 5;
        }
    }

    @RequestMapping("/setUserName")
    public int setUserName(@RequestParam("userID") String userID, @RequestParam("userName") String userName)
    {
        try
        {
            return userInfoService.setUserName(userID, userName);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return 1;
        }
    }

    @RequestMapping("/setUserPassword")
    public int setUserPassword(@RequestParam("userID") String userID, @RequestParam("userPassword") String userPassword)
    {
        try
        {
            return userInfoService.setUserPassword(userID, userPassword);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return 1;
        }
    }

    @RequestMapping("/setEmailAddress")
    public int setEmailAddress(@RequestParam("userID") String userID, @RequestParam("emailAddress") String emailAddress)
    {
        try
        {
            return userInfoService.setEmailAddress(userID, emailAddress);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return 1;
        }
    }

    @RequestMapping("/setImagePath")
    public int setImagePath(@RequestParam("userID") String userID, @RequestParam("imagePath") String imagePath)
    {
        try
        {
            return userInfoService.setImagePath(userID, imagePath);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return 1;
        }
    }

    @RequestMapping("/setMobile")
    public int setMobile(@RequestParam("userID") String userID, @RequestParam("mobile") String mobile)
    {
        try
        {
            return userInfoService.setMobile(userID, mobile);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return 1;
        }
    }

}
