package com.fms.controller;

import java.util.List;

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
import com.fms.security.JwtTokenUtil;
import com.fms.service.JwtUserDetailsService;
import com.fms.service.StudentService;
import com.fms.service.UserService;

@RestController
public class StudentController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Autowired 
	private JwtUserDetailsService jwtUserDetailsService;
	
	@Autowired
	private StudentService stuservice;
	
	@PostMapping(value="/api/savestudent")
	public  ResponseEntity<?> savestudent(@RequestBody StudentInfo studentinfo,HttpServletRequest request)
	{
		 final String requestTokenHeader = request.getHeader("Authorization");
		 User daouser=jwtUserDetailsService.getdaouserfromtoken(requestTokenHeader);
		 
		 CrossMessage result=stuservice.savestudent(studentinfo);
		return new ResponseEntity<>(result,HttpStatus.ACCEPTED);
	}
	@GetMapping(value="/api/getStudent/{pageno}")
	public  List<StudentInfo> getstudent(@PathVariable int pageno,HttpServletRequest request)
	{
		 final String requestTokenHeader = request.getHeader("Authorization");
		 User daouser=jwtUserDetailsService.getdaouserfromtoken(requestTokenHeader);
		  return stuservice.getStudent(daouser.getCompanyId(),pageno);
	}
	@GetMapping(value="/api/getStudentbyId/{id}")
	public  StudentInfo getstudentwithid(@PathVariable int id,HttpServletRequest request)
	{
		 final String requestTokenHeader = request.getHeader("Authorization");
		 User daouser=jwtUserDetailsService.getdaouserfromtoken(requestTokenHeader);
		  return stuservice.getstudentbyId(id, daouser.getCompanyId());
	}
	
	@GetMapping(value="/api/getStudent/{pageno}/{search}")
	public  List<StudentInfo> getstudentsearch(@PathVariable int pageno,@PathVariable String search,HttpServletRequest request)
	{
		 final String requestTokenHeader = request.getHeader("Authorization");
		 User daouser=jwtUserDetailsService.getdaouserfromtoken(requestTokenHeader);
		  return stuservice.getStudentwithsearch(daouser.getCompanyId(), pageno, search);	
	}
	
	@GetMapping(value="/api/updatestudent")
	public  CrossMessage updatestudent()
	{
		stuservice.search();
		  return null;
	}
	
	
	
	

}
