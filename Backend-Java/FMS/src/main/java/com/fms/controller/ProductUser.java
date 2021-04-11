package com.fms.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fms.entity.StudentInfo;
import com.fms.entity.User;
import com.fms.helper.CrossMessage;
import com.fms.helper.Result;
import com.fms.security.JwtTokenUtil;
import com.fms.service.JwtUserDetailsService;
import com.fms.service.StudentService;
import com.fms.service.UserService;


@RestController
public class ProductUser {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Autowired 
	private JwtUserDetailsService jwtUserDetailsService;
	
	@Autowired
	private StudentService stuservice;
	
	
	@GetMapping(value="/api/checkAuth")
	public ResponseEntity<?>checkAuth(HttpServletRequest request)
	{
		 final String requestTokenHeader = request.getHeader("Authorization");
		 User daouser=jwtUserDetailsService.getdaouserfromtoken(requestTokenHeader);
		 Result result=new Result();
		 if(daouser!=null)
		 {
			    result.setStatus(200);
				result.setUsername(daouser.getName());
				result.setMessage("you logged-in successfully.");
				result.setJwstoken(requestTokenHeader);
				return new ResponseEntity<>(result,HttpStatus.ACCEPTED);
		 }
		 else
		 {
			   result.setStatus(300);
				result.setUsername("");
				result.setMessage("your token is expire");
				result.setJwstoken("");
				return new ResponseEntity<>(result,HttpStatus.ACCEPTED);

		 }
			   
	}
	
	
	
	@GetMapping(value="/api/loginuser/{email}/{password}")
	public  ResponseEntity<?> loginuser(@PathVariable String email,@PathVariable String password)
	{
		Result result=userService.checklogin(email, password);
		return new ResponseEntity<>(result,HttpStatus.ACCEPTED);
	}
}
