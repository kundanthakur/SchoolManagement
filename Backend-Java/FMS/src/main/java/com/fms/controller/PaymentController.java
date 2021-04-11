package com.fms.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fms.entity.PaymentConfig;
import com.fms.entity.StudentInfo;
import com.fms.entity.User;
import com.fms.helper.CrossMessage;
import com.fms.security.JwtTokenUtil;
import com.fms.service.JwtUserDetailsService;
import com.fms.service.PaymentConfigService;

@RestController
public class PaymentController {

	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Autowired 
	private JwtUserDetailsService jwtUserDetailsService;
	
	@Autowired
	PaymentConfigService paymentConfigService;
	
	@GetMapping(value="/api/deletepaymentConfiguration/{temp}")
	public  ResponseEntity<?> deletepaymentConfiguration(@PathVariable String temp,HttpServletRequest request)
	{
		CrossMessage result=new CrossMessage();
		result.status=300;
		try
		{
			
			 final String requestTokenHeader = request.getHeader("Authorization");
			 User daouser=jwtUserDetailsService.getdaouserfromtoken(requestTokenHeader);
			 if( daouser.getUserrole()==1)
			 {
				 result=paymentConfigService.deletepaymentConfiguration(temp, daouser.getCompanyId());
			 }
			 else
			 {
				 result.message="Authentication Failed";
			 }
		}catch (Exception e) {
			 result.message="Authentication Failed";
			 e.printStackTrace();
		}
		 
		return new ResponseEntity<>(result,HttpStatus.ACCEPTED);
	}
	
	
	@PostMapping(value="/api/savepaymentConfiguration")
	public  ResponseEntity<?> savepaymentConfiguration(@RequestBody PaymentConfig paymentconfig,HttpServletRequest request)
	{
		CrossMessage result=new CrossMessage();
		result.status=300;
		try
		{
			
			 final String requestTokenHeader = request.getHeader("Authorization");
			 User daouser=jwtUserDetailsService.getdaouserfromtoken(requestTokenHeader);
			 if( daouser.getUserrole()==1)
			 {
				 paymentconfig.setCompanyId(daouser.getCompanyId());
				 result=paymentConfigService.savepaymentConfig(paymentconfig, daouser.getCompanyId());
			 }
			 else
			 {
				 result.message="Authentication Failed";
			 }
		}catch (Exception e) {
			 result.message="Authentication Failed";
			 e.printStackTrace();
		}
		 
		return new ResponseEntity<>(result,HttpStatus.ACCEPTED);
	}
	@GetMapping(value="/api/getpaymentConfiguration")
	public  ResponseEntity<?> getpaymentConfiguration(HttpServletRequest request)
	{
	
		List result=new ArrayList<PaymentConfig>();
		try
		{
			
			 final String requestTokenHeader = request.getHeader("Authorization");
			 User daouser=jwtUserDetailsService.getdaouserfromtoken(requestTokenHeader);
			 if( daouser.getUserrole()==1)
			 {
				 result=paymentConfigService.getPaymentConfig(daouser.getCompanyId());
			 }
		}catch (Exception e) {
			
			 e.printStackTrace();
		}
		return new ResponseEntity<>(result,HttpStatus.ACCEPTED);
	}
}
