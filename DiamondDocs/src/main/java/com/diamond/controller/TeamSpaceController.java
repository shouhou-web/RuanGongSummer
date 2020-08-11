package com.diamond.controller;

import com.diamond.dto.DocPreview;
import com.diamond.dto.MemberPreview;
import com.diamond.dto.TeamPreview;
import com.diamond.service.TeamSpaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*",maxAge = 3600)
public class TeamSpaceController {

    @Autowired
    private TeamSpaceService teamSpaceService;

    @RequestMapping("/getMyTeam")
    public List<TeamPreview> getMyTeam(@RequestParam("userID") String userID){
        try {
            return teamSpaceService.getMyTeam(userID);
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping("/getTeamMembers")
    public List<MemberPreview> getTeamMembers(@RequestParam("teamID") String teamID){
        try {
            return teamSpaceService.getTeamMembers(teamID);
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping("/getTeamDocs")
    public List<DocPreview> getTeamDocs(@RequestParam("userID") String teamID){
        try {
            return teamSpaceService.getTeamDocs(teamID);
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
