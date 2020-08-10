package com.diamond.service;

import com.diamond.mapper.DocUserMapper;
import com.diamond.pojo.DocUser;
import com.diamond.utils.DiyUUID;
import com.diamond.utils.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

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

    public int resetPwd(String emailAddress, String password, String password2)
    {
        if(!Validation.checkEmailFormat(emailAddress))
            return 1;
        else if(!password.equals(password2))
            return 2;
        else if(!Validation.checkPasswordFormat(password))
            return 3;
        else if(docUserMapper.getDocUserByEmailAddress(emailAddress)==null)
            return 4;

        String userID = docUserMapper.getDocUserByEmailAddress(emailAddress).getUserID();
        Map<String, Object> map = new HashMap<>();
        map.put("userID", userID);
        map.put("userPassword", password);
        docUserMapper.updateDocUserPassword(map);
        return 0;
    }
}
