package com.diamond.service;

import com.diamond.mapper.DocUserMapper;
import com.diamond.pojo.DocUser;
import com.diamond.utils.DiyUUID;
import com.diamond.utils.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInfoService {

    @Autowired
    private DocUserMapper docUserMapper;

    public int signUp(String name, String emailAddress, String password, String password2) throws Exception{
        if(!Validation.checkEmailFormat(emailAddress))
            return 1;
        else if(docUserMapper.getDocUserByEmailAddress(emailAddress)!=null)
            return 4;
        else if(!password.equals(password2))
            return 2;
        else if(!Validation.checkPasswordFormat(password))
            return 3;

        DocUser user = new DocUser();
        user.setUserID(DiyUUID.generateUserID());
        user.setEmailAddress(emailAddress);
        user.setUserName(name);
        user.setUserPassword(password);
        docUserMapper.addDocUser(user);
        return 0;
    }
}
