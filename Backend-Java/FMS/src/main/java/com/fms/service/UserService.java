package com.fms.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.fms.entity.User;
import com.fms.helper.PasswordHelper;
import com.fms.helper.Result;
import com.fms.repo.UserRepo;
import com.fms.security.JwtTokenUtil;
@Service
public class UserService {

	@Autowired
	private UserRepo DAOUserRepo;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	public Result checklogin(String email,String password)
	{

		Result result=new Result();
		try
		{
			User user=DAOUserRepo.findByUsername(email);
			if(user.getUsername().equals(email) && password.equals(PasswordHelper.passwordDecode(user.getPassword())))
			{
				if(user.isVerified()==true)
				{
					final UserDetails userDetails =new org.springframework.security.core.userdetails.User(email, password,new ArrayList<>());
                    String token=jwtTokenUtil.generateToken(userDetails);
					result.setStatus(200);
					result.setUsername(user.getName());
					result.setMessage("you logged-in successfully.");
					result.setJwstoken(token);
             	}
				else
				{
					result.setStatus(300);
					result.setMessage("Please verify your account.");
				}
			}
			else
			{
				result.setStatus(400);
				result.setMessage("check your password.");

			}
		}
		catch (Exception e) {
			result.setStatus(400);
			result.setMessage("Please verify your account.");
		}

		return result;
		
	
	}
	public User checkDAOUser(String email)
	{
		
		try
		{
			User dAOUser=DAOUserRepo.findByUsername(email);
			return dAOUser;
		}
		catch (Exception e) {
		
			return null;
		}
		
	}
	
}
